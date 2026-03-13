import { useI18n } from "../hooks/useI18n";
import {Dropdown} from "../../shared/components/Dropdown/Dropdown";
import { DropdownButton } from "../../shared/components/Dropdown/DropdownButton";
import { DropdownMenu } from "../../shared/components/Dropdown/DropdownMenu";
import { DropdownItem } from "../../shared/components/Dropdown/DropdownItem";
import { LanguageIcon } from "@/features/shared/icons/CommonIcons";

export default function LanguageDropdown() {
  const { t, setLanguage } = useI18n();
  return (
    <Dropdown
      >
      <DropdownButton>
        <div className="flex items-center space-x-2">
           <LanguageIcon className="w-4 h-4 icon-stroke" viewBox="0 0 24 24" />
        </div>
      </DropdownButton>
      <DropdownMenu className="w-32!">
        <DropdownItem onClick={() => setLanguage('ar')}>{t('arabic')}</DropdownItem>
        <DropdownItem onClick={() => setLanguage('en')}>{t('english')}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
