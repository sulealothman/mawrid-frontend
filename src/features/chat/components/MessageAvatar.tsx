import { UserAvatarIcon } from "@/features/shared/icons/CommonIcons";

interface Props {
  isUser: boolean;
}

export const MessageAvatar = ({ isUser }: Props) => {
  return (
    <div className={`shrink-0 w-8 h-8 ${isUser ? "ms-2 md:ms-4" : "ms-2 md:me-4"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
          isUser
            ? "bg-neutral-600"
            : "bg-emerald-600 dark:bg-emerald-500"
        }`}
      >
        {isUser ? (
          <UserAvatarIcon viewBox='0 0 20 24' className="w-5 h-5 icon-fill-secondary" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        )}
      </div>
    </div>
  );
};