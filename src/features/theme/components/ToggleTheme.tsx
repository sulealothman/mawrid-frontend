"use client";

import { useTheme } from "@/features/theme/hooks/useTheme";
import { MoonIcon, SunIcon } from "../icons/ThemeIcons";

const ToggleTheme = () =>{
    const { theme, toggleTheme } = useTheme();

	return (
		<button
			data-testid="theme-toggle-button"
			className="dark:hover:bg-black/20 cursor-pointer"
			onClick={() => {
				toggleTheme(theme === "light" ? "dark" : "light");
			}}
		>

			<SunIcon data-testid="theme-toggle-sun-icon" className=" hidden dark:block stroke-amber-500 h-6 w-6" viewBox="0 0 24 24" />
			<MoonIcon data-testid="theme-toggle-moon-icon" className="dark:hidden bg-inherit stroke-neutral-400 fill-neutral-400 h-6 w-6" />
			<span data-testid="theme-toggle-sr-text" className="sr-only">
				Toggle theme
			</span>
		</button>
	);
}

export default ToggleTheme;