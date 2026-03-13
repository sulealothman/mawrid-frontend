import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/features/shared/utils/utils';

export const headingVariants = cva("rtl:font-noto-sans ltr:font-nunito text-sm dark:text-neutral-100 font-normal", {
    variants: {
        size: {
            sm: "text-sm",
            md: "text-md",
            base: "text-base",
            lg: "text-lg",
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
        size: "base",
        color: "default",
        weight: "normal",
        fontFamily: "nunito",
    },
});

interface SubTitleProps extends VariantProps<typeof headingVariants> {
    text?: string;
    className?: string;
    size?: "sm" | "md" | "base" | "lg";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    weight?: "normal" | "semibold" | "bold";
    fontFamily?: "nunito" | "roboto" | "noto";
}


const SubTitle: React.FC<SubTitleProps> = ({
    text,
    className,
    color,
    weight,
    size,
    fontFamily,
    ...props
}) => {
    return (
        <div
            className={cn(headingVariants({ size, color, weight, fontFamily }), className)}
            {...props}
        >
            {text && text}
        </div>
    );
}

export default SubTitle;
