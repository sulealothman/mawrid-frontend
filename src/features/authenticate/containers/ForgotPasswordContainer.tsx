import { useState } from 'react';
import ForgotPasswordForm from '@/features/authenticate/components/ForgotPasswordForm';
import useAuth from '@/features/authenticate/hooks/useAuth';
import { isValidEmail } from "@/features/shared/utils/matches";
import useHandleError from '@/features/shared/hooks/useHandleError';
import SuccessSentMessage from '../components/SuccessSentMessage';


export default function ForgotPasswordFormContainer() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { forgotPassword, isLoading } = useAuth();
    const { isErrorRequest } = useHandleError();
    const [emailInvalid, setEmailInvalid] = useState(true);

    const onChangeEmail = (value: string) => {
        setEmail(value);
        if (!isValidEmail(value.trim())) {
            setEmailInvalid(true);
        } else {
            setEmailInvalid(false);
        }
    }
    const forgotPasswordHandler = async (email: string) => {
        if (isLoading) return;
        const response = await forgotPassword(email);
        if (!isErrorRequest(response)) setSuccess(true);
    }

    if (success) {
        return (
            <SuccessSentMessage />
        )
    }

    return (
        <ForgotPasswordForm
            isLoading={isLoading}
            email={email}
            onChangeEmail={onChangeEmail}
            emailInvalid={emailInvalid}
            forgotPasswordHandler={forgotPasswordHandler}
        />
    )
}
