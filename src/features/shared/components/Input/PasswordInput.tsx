import React, { useState } from 'react';
import Input from '@/features/shared/components/Input/Input';
import { EyeIcon, EyeCloseIcon } from '@/features/authenticate/icons/AuthIcon';

interface PasswordInputProps {
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    id = "password",
    name = "password",
    placeholder = "Enter your password",
    value,
    required = false,
    onChange,
    onFocus,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                variant='inputPassword'
                required={required}
                {...props}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute rtl:left-2 ltr:right-2 top-1/2 transform -translate-y-1/2"
            >
                {showPassword ? (
                    <EyeCloseIcon viewBox='0 0 24 24' className="size-6 stroke-tertiary" />

                ) : (
                    <EyeIcon viewBox='0 0 24 24' className="size-6 stroke-tertiary" />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;
