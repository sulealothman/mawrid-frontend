import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/utils/utils'; 

const inputStyles = cva(
    "p-2 font-nunito placeholder:font-nunito outline-none duration-150 focus:drop-shadow dark:bg-neutral-900 dark:text-neutral-200",
    {
        variants: {
            variant: {
                default: "border rounded-lg dark:border-neutral-600",
                outlined: "border-2 border-blue-500 rounded-lg",
                filled: "bg-gray-100 border-none rounded-lg",
            },
            inputSize: {
                small: "text-sm py-1 px-2",
                medium: "text-base py-2 px-3",
                large: "text-lg py-3 px-4",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "medium",
        },
    }
);

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyles> {
    inputSize?: "small" | "medium" | "large";
    variant?: "default" | "outlined" | "filled";
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
