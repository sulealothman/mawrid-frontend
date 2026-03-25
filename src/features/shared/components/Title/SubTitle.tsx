import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/features/shared/utils/utils';

export const headingVariants = cva("font-mixed font-normal", {
    variants: {
        size: {
            sm: "text-sm",
            md: "text-md",
            base: "text-base",
            lg: "text-lg",
        },
        color: {
            primary: "text-primary",
            secondary: "text-secondary",
            tertiary: "text-tertiary",
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
        size: "base",
        color: "tertiary",
        weight: "normal",
    },
});

interface SubTitleProps extends VariantProps<typeof headingVariants> {
    text?: string;
    className?: string;
    size?: "sm" | "md" | "base" | "lg";
    color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger";
    weight?: "normal" | "semibold" | "bold";
}


const SubTitle: React.FC<SubTitleProps> = ({
    text,
    className,
    color,
    weight,
    size,
    ...props
}) => {
    return (
        <div
            className={cn(headingVariants({ size, color, weight }), className)}
            {...props}
        >
            {text && text}
        </div>
    );
}

export default SubTitle;
