"use client";

import dynamic from "next/dynamic";
import { UserStore } from "../../store/User";
import useAuth from "@/features/authenticate/hooks/useAuth";
import useUserActions from "@/features/users/hooks/useUserActions";
import { LanguageSelector } from "@/features/localization/components/LanguageSelector";
import { useI18n } from "@/features/localization/hooks/useI18n";

import {
    Dropdown,
} from "@/features/shared/components/Dropdown/Dropdown";
import {
    SettingsIcon,
    LanguageIcon,
} from "@/features/shared/icons/CommonIcons";

import { LogoutIcon } from "@/features/authenticate/icons/AuthIcon";
import PaintIcon from "@/features/sidebar/icons/PaintIcon";
import useRedirect from "@/features/shared/hooks/useRedirect";
import UserAvatar from "./UserAvatar";

const ToggleTheme = dynamic(
    () => import("@/features/theme/components/SwitchTheme"),
    { ssr: false }
);

interface UserDropdownProps {
    isCollapse?: boolean;
}

export default function UserDropdown({ isCollapse = false }: UserDropdownProps) {
    const { t, isRTL, setLanguage } = useI18n();
    const { redirectToProfile } = useRedirect();

    const user = UserStore((state) => state);

    const { logout } = useAuth();
    const { updatePreferences } = useUserActions();

    const handleLanguageChange = (lang: string) => {
        if (user?.preferences?.language === lang) return;
        updatePreferences({ language: lang });
        setLanguage(lang);
    };

    const handleThemeChange = (isDark: boolean) => {
        updatePreferences({ dark_mode: isDark });
    };

    return (
        <Dropdown>
            <Dropdown.Button className="cursor-pointer">
                <UserAvatar avatar={user?.avatar} name={user?.name} hideName={isCollapse} />
            </Dropdown.Button>
            <Dropdown.Menu placement="top-right" className="w-60">
                <Dropdown.Item onClick={redirectToProfile}>
                    <SettingsIcon
                        className="size-4 icon-stroke"
                        viewBox="0 0 24 24"
                    />
                    <span>{t("settings")}</span>
                </Dropdown.Item>
                <div className="flex items-center gap-2 px-2 py-2 text-sm text-primary cursor-default">
                    <PaintIcon className="size-4 icon-text" />

                    <div className="flex flex-1 justify-between items-center font-mixed">
                        <span>{t("system_appearance")}</span>

                        <ToggleTheme callback={handleThemeChange} />
                    </div>
                </div>
                <Dropdown
                    className="w-full"
                >
                    <Dropdown.Button className="cursor-pointer">
                        <div className="flex items-center justify-between px-2 py-2 text-sm text-primary w-full">
                            <div className="flex items-center gap-2 font-mixed">
                                <LanguageIcon
                                    className="size-4 icon-stroke"
                                    viewBox="0 0 24 24"
                                />
                                <span>{t("language")}</span>
                            </div>
                            <LanguageSelector />
                        </div>

                    </Dropdown.Button>
                    <Dropdown.Menu placement={isRTL ? "left" : "right"} className="mt-2">
                        <Dropdown.Item onClick={() => handleLanguageChange('ar')}>{t('arabic')}</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleLanguageChange('en')}>{t('english')}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <div className="border-t border-neutral-700 my-1"></div>
                <Dropdown.Item
                    onClick={() => logout()}
                >
                    <LogoutIcon
                        className="size-4 stroke-red-400"
                        viewBox="0 0 24 24"
                    />
                    <span className="text-danger">{t("logout")}</span>
                </Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}