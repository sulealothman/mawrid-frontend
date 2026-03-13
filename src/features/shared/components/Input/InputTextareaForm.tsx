import { useState } from 'react'
import { useI18n } from '../../../localization/hooks/useI18n';
import TextareaAutosize from "react-textarea-autosize";

interface InputTextareaFormProps {
    label: string;
    testId: string;
    placeholder: string;
    value: string;
    rows?: number;
    setValue: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    validator?: (value: string, callback: (error: string | string[]) => void) => void;
    maxLength?: number;
    minRows?: number;
    maxRows?: number;
    className?: string;
}

export default function InputTextareaForm({
    label,
    testId,
    placeholder,
    value,
    minRows,
    maxRows,
    rows = 4,
    setValue,
    required = false,
    disabled = false,
    validator,
    maxLength,
    className
}: InputTextareaFormProps) {
    const { t } = useI18n();
    const [error, setError] = useState<string | string[]>('');
    return (
        <div className='flex flex-col gap-2 h-full'>
            <label htmlFor="name" className='font-mixed text-primary'>
                {t(label)}
            </label>
            <TextareaAutosize
                maxLength={maxLength}
                required={required}
                data-testid={testId}
                className={`input-textarea-form ${className ? className : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={validator ? () =>  validator(value, setError) : undefined}
                onFocus={() => error && setError('')}
                disabled={disabled}
                rows={rows}
                minRows={minRows}
                maxRows={maxRows}
            />
            <div className='text-red-500'>{error && error}</div>
        </div>
    )
}
