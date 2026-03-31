import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/utils/utils';

const buttonStyles = cva(
    "p-2 font-mixed font-semibold cursor-pointer disabled:cursor-default outline-none duration-300",
    {
        variants: {
            variant: {
                default: "bg-midnight-950 disabled:bg-midnight-950/70 text-light-50 shadow-midnight-900",
                primary: "dark:bg-light-200 disabled:dark:bg-light-200/70 bg-midnight-950 disabled:bg-midnight-950/70 text-light-200 dark:text-midnight-950 shadow-sm shadow-light-400 dark:shadow-midnight-600",
                secondary: "bg-secondary text-secondary shadow-sm shadow-light-400 dark:shadow-midnight-600",
                tertiary: "bg-quaternary text-quaternary shadow-sm shadow-light-400 dark:shadow-midnight-300",
                accent: "bg-accent",
                danger: "bg-red-600 disabled:bg-red-600/70 text-white",
                noStyle: "",
            },
            size: {
                small: "text-sm py-1 px-2",
                medium: "text-base py-2 px-3",
                large: "text-lg py-3 px-4",
            },
            shape: {
                rounded: "rounded-lg",
                circle: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "medium",
            shape: "rounded",
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
    shape,
    isLoading,
    id,
    className,
    ...props
}) => {
    return (
        <button
            id={id}
            data-testid={`${id}-button`}
            className={cn(buttonStyles({ variant, size, shape }), className)}
            onClick={onClick}
            disabled={isLoading}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;