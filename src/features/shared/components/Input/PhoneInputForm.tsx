import { useState } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js/max';
import "react-phone-number-input/style.css";
import NumberPhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { useI18n } from '@/features/localization/hooks/useI18n';
interface PhoneInputFormProps {
    testId: string;
    phoneNumber: string;
    handlePhoneChange?: (value: string | undefined) => void;
    required?: boolean;
}

export default function PhoneInputForm({
    testId = "register-phone-input",
    phoneNumber,
    required = false,
    handlePhoneChange
}: PhoneInputFormProps) {
    const [error, setError] = useState('');
    const { t } = useI18n();


    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-mixed dark:text-neutral-200">
                {t('phone_number')}
            </label>
            <NumberPhoneInput
                style={{ direction: "ltr" }}
                data-testid={testId}
                value={phoneNumber}
                onChange={handlePhoneChange ?? (() => {})}
                onBlur={() => {
                    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
                        setError(t('invalid_phone_number'));
                    } else {
                        setError('');
                    }
                }}
                onFocus={() => error && setError('')}
                flags={flags}
                defaultCountry={'SA'}
                international={true}
                countryCallingCodeEditable={false}
                addInternationalOption={false}
                withCountryCallingCode={true}
                countrySelectProps={{ unicodeFlags: true }}
                required={required}
                className="input-form phone-input-form"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}