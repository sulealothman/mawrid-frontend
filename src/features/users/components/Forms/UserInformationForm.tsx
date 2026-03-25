import useFormValidator from '@/features/authenticate/hooks/useFormValidator';
import { useI18n } from '@/features/localization/hooks/useI18n';
import Button from '@/features/shared/components/Button/Button';
import InputForm from '@/features/shared/components/Input/InputForm'
import PhoneInputForm from '@/features/shared/components/Input/PhoneInputForm'

interface UserInformationFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  handlePhoneChange: (value: string | undefined) => void;
  onSubmit: () => void;
}

export default function UserInformationForm({
  name,
  setName,
  email,
  setEmail,
  phoneNumber,
  handlePhoneChange,
  onSubmit
}: UserInformationFormProps) {
  const { t } = useI18n();
  const { inputEmailValidator, inputNameValidator } = useFormValidator();

  return (
    <div className='flex flex-col gap-2 rounded-xl px-4 py-4 w-full bg-accent shadow-md border border-secondary'>
      <h2 className='font-semibold text-lg font-mixed text-primary'>{t('user_information')}</h2>
      <InputForm
        label='name'
        testId='register-name-input'
        placeholder={t('name_placeholder')}
        value={name}
        setValue={setName}
        required={true}
        validator={inputNameValidator}
      />

      <InputForm
        type='email'
        label='email'
        testId='register-email-input'
        placeholder={t('email_placeholder')}
        value={email}
        setValue={setEmail}
        required={true}
        validator={inputEmailValidator}
      />

      <PhoneInputForm
        phoneNumber={phoneNumber}
        handlePhoneChange={handlePhoneChange}
        testId='register-phone-input'
        required={true}
      />
      <Button className='self-center w-fit' onClick={onSubmit}>{t('update')}</Button>
    </div>
  )
}
