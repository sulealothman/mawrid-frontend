import React from 'react'
import PasswordInput from '@/features/shared/components/Input/PasswordInput';
import { useI18n } from '../../../localization/hooks/useI18n';

interface PasswordInputFormProps {
    label: string;
    testId: string;
    placeholder: string;
    password: string;
    setPassword: (password: string) => void;
    required?: boolean;
}

export default function PasswordInputForm({
    label = 'password',
    testId = 'password-input',
    placeholder = 'Enter your password...',
    password,
    setPassword,
    required = false
}: PasswordInputFormProps) {
    const { t } = useI18n();
    const [error, setError] = React.useState('');
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='label-form'>
                {t(label)}
            </label>
            <PasswordInput
                data-testid={testId}
                className="input-form input-password-form"
                placeholder={placeholder}
                value={password}
                required={required}
                onFocus={() => error && setError('')}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}
