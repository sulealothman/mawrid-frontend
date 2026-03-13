import { useState } from 'react'
import UserPasswordForm from './UserPasswordForm';
import useUserActions from '../../../users/hooks/useUserActions';



export default function UserPasswordFormContainer() {

  const {updatePassword} = useUserActions();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async () => {
    const success = await updatePassword({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmNewPassword,
    });

    if(success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }

  }

  return (
      <UserPasswordForm
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmNewPassword={confirmNewPassword}
        setConfirmNewPassword={setConfirmNewPassword}
        onSubmit={handleSubmit}
      />
  )
}
