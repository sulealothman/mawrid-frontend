import Image from "next/image";
import Button from '@/features/shared/components/Button/Button';
import CloseIcon from "@/assets/icons/close.svg";
import { ButtonHTMLAttributes } from "react";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dataCloseButtonTestId?: string;
}

export default function CloseButton({
  dataCloseButtonTestId,
  ...props
}: CloseButtonProps) {
  return (
    <Button
      {...props}
      data-testid={dataCloseButtonTestId}
      variant="noStyle"
    >
      <Image src={CloseIcon} alt="x icon" />
    </Button>
  );
}
