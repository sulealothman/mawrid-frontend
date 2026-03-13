import { useI18n } from "@/features/localization/hooks/useI18n";
import { isValidEmail, isValidName } from "@/features/shared/utils/matches";
import { isValidPhoneNumber } from 'libphonenumber-js/max';

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const useFormValidator = () => {
    const { t } = useI18n();

    const signupValidator = ({
        name,
        email,
        password,
        phoneNumber,
    }: SignUpFormData) => {
        const errors: string[] = [];
        if (!name || !email || !password || !phoneNumber) {
            if (!name) errors.push('input_name_required');
            if (!email) errors.push('input_email_required');
            if (!password) errors.push('input_password_required');
            if (!phoneNumber) errors.push('input_phone_number_required');
            return errors;
        }
        if (!isValidName(name)) errors.push('input_name_invalid');
        if (!isValidEmail(email)) errors.push('input_email_invalid');
        if (!isValidPhoneNumber(phoneNumber)) errors.push('invalid_phone_number');
        if (password.length < 6) errors.push('password_too_short');
        if (password.length > 128) errors.push('password_too_long');
        return errors;
    }

    const signinValidator = ({
        email,
        password,
    }: Omit<SignUpFormData, 'name' | 'phoneNumber'>) => {
        const errors: string[] = [];
        if (!email || !password) {
            if (!email) errors.push('input_email_required');
            if (!password) errors.push('input_password_required');
            return errors;
        }
        if (!isValidEmail(email)) errors.push('input_email_invalid');
        if (password.length < 6) errors.push('password_too_short');
        if (password.length > 128) errors.push('password_too_long');
        return errors;
    }

    const updateInformationValidator = ({
        name,
        email,
        phone,
    }: SubmitUpdateUserRequest) => {
        const errors: string[] = [];
        if (!isValidName(name!)) errors.push('input_name_invalid');
        if (!isValidEmail(email!)) errors.push('input_email_invalid');
        if (!isValidPhoneNumber(phone!)) errors.push('invalid_phone_number');
        return errors;
    }

    const updatePasswordValidator = ({
        currentPassword,
        newPassword,
        confirmNewPassword
    }: {
        currentPassword: string;
        newPassword: string;
        confirmNewPassword: string;
    }) => {
        const errors: string[] = [];
        if (currentPassword.length < 6) errors.push('current_password_too_short');
        if (currentPassword.length > 128) errors.push('current_password_too_long');
        if (newPassword.length < 6) errors.push('new_password_too_short');
        if (newPassword.length > 128) errors.push('new_password_too_long');
        if (newPassword !== confirmNewPassword) errors.push('passwords_do_not_match');
        return errors;
    }

    const emailValidator = (email: string) => {
        return isValidEmail(email);
    }

    const passwordComparison = (password: string, confirmPassword: string) => {
        const errors: string[] = [];
        if (password.length < 6) errors.push('new_password_too_short');
        if (password.length > 128) errors.push('new_password_too_long');
        if (password !== confirmPassword) errors.push('passwords_do_not_match');
        return errors;
    }

    const inputEmailValidator = (email: string, callback: (error: string | string) => void) => {
        if (!isValidEmail(email.trim())) {
            callback(t('email_invalid'));
        } else if (email.trim().length > 100) {
            callback(t('email_too_long'));
        }
    }

    const inputNameValidator = (name: string, callback: (error: string | string) => void) => {
                        if (!isValidName(name.trim()) && name.trim().length < 2) {
                            callback(t('input_too_short'));
                        } else if(!isValidName(name.trim()) && name.trim().length > 40) {
                            callback(t('input_too_long'));
                        } else if(!isValidName(name.trim())) {
                            callback(t('input_invalid'));
                        }
                    
    }

    return {
        signupValidator,
        signinValidator,
        updateInformationValidator,
        updatePasswordValidator,
        emailValidator,
        passwordComparison,
        inputEmailValidator,
        inputNameValidator
    }
}

export default useFormValidator;