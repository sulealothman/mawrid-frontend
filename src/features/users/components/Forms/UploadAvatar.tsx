import { formatFileSize } from '@/features/files/utils/utils';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import UploadImageInputForm from '@/features/shared/components/Input/UploadImageInputForm';
import { ALLOWED_IMAGE_TYPES } from '@/features/shared/constants/allowedImageTypes';
import { MAX_IMAGE_FILE_SIZE } from '@/features/shared/constants/maxFileSize';
import React from 'react'

interface UploadAvatarProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  uploadAvatar: (file: File) => void;
  removeAvatar: () => void;
}

export default function UploadAvatar({
  avatar,
  setAvatar,
  uploadAvatar,
  removeAvatar,
  file,
  setFile
}: UploadAvatarProps) {
  const { t } = useI18n();
  return (
    <div className='flex rounded-xl px-4 py-4 w-full bg-primary shadow-md border border-neutral-300/50 dark:border-neutral-700/50'>
      <UploadImageInputForm avatar={avatar} onChange={(e) => {
        const file = e.target.files?.[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFile(file);
            setAvatar(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      }} />



      <div className='flex flex-col justify-center ms-4'>
        <h2 className='font-semibold text-xl font-mixed text-primary pb-2'>{t('upload_avatar')}</h2>
        <div className="flex">
          <Button onClick={() => file && uploadAvatar(file)}>{t('upload')}</Button>
          <Button variant="danger" className='ml-2 w-fit' onClick={removeAvatar}>{t('remove')}</Button>

        </div>
        <span className='text-sm text-gray-500 mt-2 font-mixed'>
          {t('supported_formats', {
            allowedExtensions: ALLOWED_IMAGE_TYPES.join(', ')
            })} - {t('max_file_size', { maxSize: formatFileSize(MAX_IMAGE_FILE_SIZE) })}
        </span>
      </div>
    </div>
  )
}
