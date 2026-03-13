"use client";

import { useTheme } from "@/features/theme/hooks/useTheme";
import Switch from "@/features/shared/components/Switch/Switch";
import { MoonIcon, SunIcon } from "../icons/ThemeIcons";


interface ThemeToggleProps {
	callback?: (isDark: boolean) => void;
}


const SwitchTheme = ({callback}: ThemeToggleProps) => {
	const { theme, toggleTheme } = useTheme();

	const toggleThemeHandler = () => {
		toggleTheme(theme === "light" ? "dark" : "light")
		if (callback) {
			callback(theme === "light" ? true : false);
		}
	};

	return (
		<Switch checked={theme === 'dark'} onClick={() => toggleThemeHandler()}>
			<SunIcon
				data-testid="theme-toggle-sun-icon"
				className="duration-200 transition-all bg-inherit stroke-orange-300 fill-orange-300"
				viewBox="0 0 24 24" />
			<MoonIcon
				data-testid="theme-toggle-moon-icon"
				className="duration-200 transition-all bg-inherit stroke-neutral-200 fill-neutral-200"
				viewBox="0 0 24 24" />
		</Switch>
	);
}

export default SwitchTheme;