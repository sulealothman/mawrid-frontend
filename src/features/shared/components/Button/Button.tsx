import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/utils/utils';

const buttonStyles = cva(
    "p-2 font-mixed cursor-pointer disabled:cursor-default outline-none duration-150 focus:drop-shadow",
    {
        variants: {
            variant: {
                default: "bg-black disabled:bg-black/70 text-white rounded-lg",
                secondary: "bg-neutral-100 dark:bg-neutral-700 disabled:bg-white/70 text-black rounded-lg border border-neutral-400/50",
                
                danger: "bg-red-600 disabled:bg-red-600/70 text-white rounded-lg",
                outlined: "border-2 border-blue-500 rounded-lg",
                filled: "bg-gray-100 border-none rounded-lg",
                noStyle: "p-0 bg-transparent outline-none font-mixed",
            },
            size: {
                small: "text-sm py-1 px-2",
                medium: "text-base py-2 px-3",
                large: "text-lg py-3 px-4",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "medium",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
    isLoading?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant,
    size,
    isLoading,
    id,
    className,
    ...props
}) => {
    return (
        <button
            id={id}
            data-testid={`${id}-button`}
            className={cn(buttonStyles({ variant, size }), className)}
            onClick={onClick}
            disabled={isLoading}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;