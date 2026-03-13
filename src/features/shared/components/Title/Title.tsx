import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/features/shared/utils/utils';

export const headingVariants = cva("font-mixed text-2xl dark:text-neutral-100 font-semibold", {
    variants: {
        size: {
            sm: "text-lg",
            md: "text-2xl",
            lg: "text-4xl",
        },
        color: {
            default: "text-gray-900 dark:text-neutral-100",
            primary: "text-blue-600 dark:text-neutral-100",
            secondary: "text-green-600 dark:text-neutral-100",
            success: "text-green-600 dark:text-neutral-100",
            warning: "text-yellow-600 dark:text-neutral-100",
            danger: "text-red-600 dark:text-neutral-100",
        },
        fontFamily: {
            nunito: "ltr:font-nunito rtl:font-noto-sans",
            roboto: "ltr:font-roboto rtl:font-noto-sans",
            noto: "font-noto-sans",
        },
        weight: {
            normal: "font-normal",
            semibold: "font-semibold",
            bold: "font-bold",
        },
    },
    defaultVariants: {
        size: "md",
        color: "default",
        weight: "bold",
        fontFamily: "nunito",
    },
});

interface TitleProps extends VariantProps<typeof headingVariants> {
    text?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    weight?: "normal" | "semibold" | "bold";
    fontFamily?: "nunito" | "roboto" | "noto";
}


const Title: React.FC<TitleProps> = ({
    text,
    className,
    color,
    weight,
    size,
    fontFamily,
    ...props
}) => {
    return (
        <h1
            className={cn(headingVariants({ size, color, weight, fontFamily }), className)}
            {...props}
        >
            {text && text}
        </h1>
    );
}

export default Title;
