import useCommonErrorAlertToast from "@/features/shared/hooks/useCommonErrorAlertToast";

const useHandleError = () => {
    const {
        badRequestAlert,
        unauthorizedAlert,
        notFoundPageAlert,
        tooManyRequestsAlert,
        somethingWentWrongAlert
    } = useCommonErrorAlertToast();


    const errorsHandle = async (response : ErrorRequestResponse | undefined) => {
        if(!response) {
            somethingWentWrongAlert();
            return {
                message: 'something_went_wrong',
                status: 500
            } as ErrorRequestResponse;
        }
        switch(response.status) {
            case 400:
                badRequestAlert();
                return response;
            case 401 | 403:
                unauthorizedAlert();
                return response;
            case 404:
                notFoundPageAlert();
                return response;
            case 422:
                return response;
            case 429:
                tooManyRequestsAlert();
                return response.status;
            case 500:
                somethingWentWrongAlert();
                return 500;
            default:
                somethingWentWrongAlert();
                return 500;
        }
    }

    const isErrorCode = (code: 500 | 429): code is 500 | 429 => {
        return typeof code === 'number' && (code === 500 || code === 429);
    }

    const isErrorResponse = (obj: ErrorRequestResponse): obj is ErrorRequestResponse => {
        return (typeof obj === "object"
            && obj !== null
            && typeof obj.message === "string"
            && typeof obj.status === "number");
    }

    const hasErrorsResponse = (obj: unknown): obj is ErrorRequestResponse => {
        return (typeof obj === "object"
            && obj !== null
            && "errors" in obj
            && Array.isArray(obj.errors));
    }

    const isErrorRequest = (obj: ErrorRequestResponse | 500 | 429): obj is ErrorRequestResponse | 500 | 429 => {
        return typeof obj === 'number' ? isErrorCode(obj) : isErrorResponse(obj);
    }

    return {
        errorsHandle,
        isErrorCode,
        isErrorResponse,
        hasErrorsResponse,
        isErrorRequest,
    }
}



export default useHandleError