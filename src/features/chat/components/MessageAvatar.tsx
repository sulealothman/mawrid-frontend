import { UserAvatarIcon } from "@/features/shared/icons/CommonIcons";
import { StarIcon } from "../icons/ChatIcons";

interface Props {
  isUser: boolean;
}

export const MessageAvatar = ({ isUser }: Props) => {
  return (
    <div className={`shrink-0 w-8 h-8 ${isUser ? "ms-2 md:ms-4" : "ms-2 md:me-4"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-tertiary"
            : "bg-emerald-600 dark:bg-emerald-500"
        }`}
      >
        {isUser ? (
          <UserAvatarIcon viewBox='0 0 20 24' className="size-5 fill-secondary" />
        ) : (
          <StarIcon className="size-5 fill-light-400" viewBox='0 0 24 24' />
        )}
      </div>
    </div>
  );
};