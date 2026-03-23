import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/features/shared/utils/utils';

const badgeStyles = cva(
  'inline-block font-semibold',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-gray-200 text-gray-800',
        danger: 'bg-red-500/80 text-red-100',
      },
      size: {
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-2.5 py-1',
        bg: 'text-base px-3 py-1.5',
      },
      shape: {
        default: 'rounded-lg',
        numeric: 'rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'sm',
      shape: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeStyles> {
  text: string;
  className?: string;
}

export default function Badge({
  text,
  variant,
  size,
  shape,
  className,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeStyles({ variant, size, shape }), className)} {...props}>
      {text}
    </div>
  );
}