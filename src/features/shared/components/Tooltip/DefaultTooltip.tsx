import { Tooltip, PlacesType } from "react-tooltip";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/features/shared/utils/utils";

const Variants = cva("", {
  variants: {
    variant: {
      default:
        "font-mixed z-40 !rounded-md !shadow-lg !bg-white !text-primary font-semibold !text-xs",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface IDefaultTooltipProps extends VariantProps<typeof Variants> {
  id: string;
  place: PlacesType | undefined;
  messageKey: string;
  className?: string;
}

const DefaultTooltip = (props: IDefaultTooltipProps) => {
  const { id, place, className, messageKey, variant } = props;
  return (
    <>
      <Tooltip
        id={id}
        place={place}
        className={cn(Variants({ variant, className }))}
        content={messageKey}
      />
    </>
  );
};

export default DefaultTooltip;
