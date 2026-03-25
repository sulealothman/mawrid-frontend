import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/features/shared/utils/utils';

export const headingVariants = cva("font-mixed", {
    variants: {
        size: {
            sm: "text-lg",
            md: "text-2xl",
            lg: "text-4xl",
        },
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            success: "text-success",
            warning: "text-yellow-600",
            danger: "text-danger",
        },
        weight: {
            normal: "font-normal",
            semibold: "font-semibold",
            bold: "font-bold",
        },
    },
    defaultVariants: {
        size: "md",
        color: "primary",
        weight: "bold",
    },
});

interface TitleProps extends VariantProps<typeof headingVariants> {
    text?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "success" | "warning" | "danger";
    weight?: "normal" | "semibold" | "bold";
}


const Title: React.FC<TitleProps> = ({
    text,
    className,
    color,
    weight,
    size,
    ...props
}) => {
    return (
        <h1
            className={cn(headingVariants({ size, color, weight }), className)}
            {...props}
        >
            {text && text}
        </h1>
    );
}

export default Title;
