import  { useState } from 'react'
import { useI18n } from '../../../localization/hooks/useI18n';
import Input from './Input';

interface InputFormProps {
    type?: string;
    label: string;
    testId: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    validator?: (value: string, callback: (error: string | string[]) => void) => void;
}

export default function InputForm({
    type = 'text',
    label,
    testId,
    placeholder,
    value,
    setValue,
    required = false,
    disabled = false,
    validator
}: InputFormProps) {
    const { t } = useI18n();
    const [error, setError] = useState<string | string[]>('');
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor="name" className='font-mixed text-primary'>
                {t(label)}
            </label>
            <Input
                required={required}
                type={type}
                data-testid={testId}
                variant='inputForm'
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={validator ? () =>  validator(value, setError) : undefined}
                onFocus={() => error && setError('')}
                disabled={disabled}
            />
            <div className='text-danger text-xs'>{error && error}</div>
        </div>
    )
}
