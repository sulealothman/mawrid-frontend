import { useState } from 'react'
import { ResetPasswordForm } from '@/features/authenticate/components/ResetPasswordForm'
import useAuth from '@/features/authenticate/hooks/useAuth';
import useHandleError from '@/features/shared/hooks/useHandleError';
import useFormValidator from '@/features/authenticate/hooks/useFormValidator';
import SuccessResetPasswordMessage from '../components/SuccessResetPasswordMessage';


interface ResetPasswordFormContainerProps {
    token: string
    email: string
}

export default function ResetPasswordFormContainer({ token, email }: ResetPasswordFormContainerProps) {
    const { passwordComparison } = useFormValidator();
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfrimation, setNewPasswordConfirmation] = useState('');
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { resetPassword } = useAuth();
    const { hasErrorsResponse } = useHandleError();

    const onNewPasswordChange = (value: string) => {
        setNewPassword(value);
        if (errors.length) setErrors([]);
    }

    const onNewPasswordConfirmationChange = (value: string) => {
        setNewPasswordConfirmation(value);
        if (errors.length) setErrors([]);
    }


    const resetPasswordHandler = async (newPassword: string, newPasswordConfirmation: string) => {
        setErrors([]);
        const validate = passwordComparison(newPassword, newPasswordConfirmation);
        if(validate.length > 0) {
            setErrors(validate);
            return;
        }
        const response = await resetPassword(token, email, newPassword, newPasswordConfirmation);
        if(hasErrorsResponse(response)) {
            setErrors(response.errors!);
        }
        if (response === true) setSuccess(true);
    }



    if (success) {
        return (
            <SuccessResetPasswordMessage />
        )
    }


    return (
        <ResetPasswordForm
            newPassword={newPassword}
            setNewPassword={onNewPasswordChange}
            newPasswordConfrimation={newPasswordConfrimation}
            setNewPasswordConfirmation={onNewPasswordConfirmationChange}
            resetPasswordHandler={resetPasswordHandler}
            errors={errors}
        />
    )
}
