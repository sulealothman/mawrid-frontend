import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/utils/utils'; 

const inputStyles = cva(
    "p-2 font-noto-sans-arabic placeholder:font-noto-sans-arabic outline-none duration-150",
    {
        variants: {
            variant: {
                default: "border rounded-lg border-tertiary bg-secondary text-secondary",
                inputForm: "input-form",
                inputPassword: "input-form input-password-form",

            },
            inputSize: {
                small: "text-sm py-1 px-2",
                medium: "text-base py-2.5 px-3",
                large: "text-lg py-3 px-4",
                noSize: "",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "medium",
        },
    }
);

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyles> {
    inputSize?: "small" | "medium" | "large" | "noSize";
    variant?: "default" | "inputForm" | "inputPassword";
}

const Input: React.FC<CustomInputProps> = ({
    type = "text",
    id,
    name,
    className,
    placeholder = "",
    value,
    onChange,
    variant,
    inputSize,
    ...props
}) => {
    return (
        <input
            data-testid={`${id || type}-input`}
            type={type}
            id={id}
            name={name}
            className={cn(inputStyles({ variant, inputSize }), className)}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default Input;
