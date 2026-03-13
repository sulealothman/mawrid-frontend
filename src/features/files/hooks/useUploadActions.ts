import { useState } from "react";
import FileController from "../controller/FileController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAllowedMime, isAllowedSize } from "../utils/utils";
import { AxiosProgressEvent, isAxiosError } from "axios";
import pLimit from "p-limit";
import useCommonErrorAlertToast from "@/features/shared/hooks/useCommonErrorAlertToast";
import { MAX_FILE_SIZE } from "@/features/shared/constants/maxFileSize";
import { ALLOWED_FILE_TYPES } from "@/features/shared/constants/allowedFileTypes";

const useUploadActions = (kbId: string) => {
    const queryClient = useQueryClient();
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const { somethingWentWrongAlert } = useCommonErrorAlertToast();

    const ensureExtension = (fileName: string) => {
        const hasExtension = fileName.includes(".") && fileName.split(".").pop() !== "";
        return hasExtension ? fileName : `${fileName}.txt`;
    };

    const updateUploadProgress = (id: string, percent: number) => {
        setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, progress: percent } : u))
        );
    };

    const createProgressHandler =
        (id: string) => (e: AxiosProgressEvent) => {
            const percent = Math.round(
                (e.loaded * 100) / (e.total || 1)
            );
            updateUploadProgress(id, percent);
        };

    const cancelUpload = (id: string) => {
        const target = uploads.find((u) => u.id === id);
        if (!target) return;

        target.controller.abort();

        setUploads((prev) => prev.filter((u) => u.id !== id));
    };

    const onButtonClick = (
        inputRef: React.RefObject<HTMLInputElement>
    ) => inputRef.current?.click();

    const mutation = useMutation({
        mutationFn: async (currentUploads: UploadItem[]) => {
            const limit = pLimit(3);

            await Promise.all(
                currentUploads.map((upload) =>
                    limit(async () => {
                        try {
                            const finalName = ensureExtension(upload.file.name);

                            const body: Partial<UploadFileRequest> = {
                                knowledge_base_id: kbId,
                                file: upload.file,
                                file_name: finalName,
                            };
                            await FileController.upload(
                                kbId,
                                body,
                                upload.controller.signal,
                                createProgressHandler(upload.id)
                            );

                            setUploads((prev) =>
                                prev.filter((u) => u.id !== upload.id)
                            );
                        } catch (err: unknown) {
                            setUploads((prev) =>
                                prev.filter((u) => u.id !== upload.id)
                            );
                            if(isAxiosError(err) && err.name === "CanceledError") return;
                            somethingWentWrongAlert();
                        }
                    })
                )
            );

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["knowledgeBase", kbId],
            });
        },
    });

    const handleFileUpload = (
        fileList: FileList,
    ) => {

        const validFiles = Array.from(fileList).filter((file) => {
            if (!isAllowedMime(file.name, ALLOWED_FILE_TYPES)) return false;
            if (!isAllowedSize(file.size, MAX_FILE_SIZE)) return false;
            return true;
        });

        if (validFiles.length === 0) return;

        const mapped: UploadItem[] = validFiles.map((file) => ({
            id: crypto.randomUUID(),
            file,
            progress: 0,
            controller: new AbortController(),
        }));

        setUploads((prev) => [...prev, ...mapped]);

        mutation.mutate(mapped);
    };

    return {
        uploads,
        isUploading: mutation.isPending,
        cancelUpload,
        handleFileUpload,
        onButtonClick,
    };
};

export default useUploadActions;