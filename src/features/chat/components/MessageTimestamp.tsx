import { useI18n } from "@/features/localization/hooks/useI18n";
import { momentFromNow } from "@/features/shared/utils/utils";

interface Props {
  createdAt?: string;
  alignRight?: boolean;
}

export const MessageTimestamp = ({ createdAt, alignRight }: Props) => {
  const { lang } = useI18n();

  return (
    <div
      className={`font-mixed text-xs text-muted ${
        alignRight ? "text-right" : ""
      }`}
    >
      {momentFromNow(createdAt, lang)}
    </div>
  );
};