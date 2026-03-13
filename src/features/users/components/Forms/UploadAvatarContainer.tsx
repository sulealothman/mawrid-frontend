import React from 'react'
import UploadAvatar from './UploadAvatar';
import useUserActions from '@/features/users/hooks/useUserActions';

interface UploadAvatarContainerProps {
  currentAvatar: string;
}

export default function UploadAvatarContainer({ currentAvatar }: UploadAvatarContainerProps) {
  const [avatar, setAvatar] = React.useState(currentAvatar);
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const { uploadAvatar, removeAvatar } = useUserActions();

  const handleUpload = async (file: File) => {
    if(isUploading || !file) return;
    setIsUploading(true);
    const res = await uploadAvatar(file);
    if(res) setAvatar(res);
    setFile(null);
    setIsUploading(false);
  };

  const handleRemove = async () => {
    if(!avatar) return;
    const res = await removeAvatar();
    if(res) setAvatar('');
  }

  return (
    <UploadAvatar avatar={avatar} setAvatar={setAvatar} uploadAvatar={handleUpload} removeAvatar={handleRemove} file={file} setFile={setFile} />
  )
}
