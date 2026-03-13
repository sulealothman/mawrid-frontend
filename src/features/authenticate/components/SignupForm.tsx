import Link from 'next/link';
import InputForm from '@/features/shared/components/Input/InputForm';
import PhoneInputForm from '@/features/shared/components/Input/PhoneInputForm';
import PasswordInputForm from '@/features/shared/components/Input/PasswordInputForm';
import Divider from '@/features/shared/components/Divider';
import Title from '@/features/shared/components/Title/Title';
import ListErrors from '@/features/shared/components/Box/ListErrors';
import { useI18n } from '@/features/localization/hooks/useI18n';
import LogoTitle from '@/features/navbar/components/LogoTitle';
import useFormValidator from '../hooks/useFormValidator';

interface SignupFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phoneNumber: string;
  handlePhoneChange: (value: string | undefined) => void;
  password: string;
  setPassword: (password: string) => void;
  registerHandler: (e:React.MouseEvent<HTMLButtonElement> | undefined) => void;
  errors: string[];
}

export const SignupForm = ({
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    handlePhoneChange,
    password,
    setPassword,
    registerHandler,
    errors = []
  }: SignupFormProps) => {

    const {t} = useI18n();
    const { inputEmailValidator, inputNameValidator } = useFormValidator();

  return (
    <form className="flex flex-col gap-3 w-full max-w-xs p-2">
        <LogoTitle className='text-3xl justify-center mb-4' logoClassName='size-7' />
        <Title text={t('create_a_new_account')} />

        <Divider />

        <ListErrors errors={errors} />
        

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

        <PasswordInputForm
          label='password'
          testId='register-password-input'
          placeholder={t('password_placeholder')}
          password={password}
          setPassword={setPassword}
          required={true}
        />

        <div className='flex flex-col gap-2'>
          <button className='bg-black text-white rounded-lg p-2 font-mixed'
           onClick={registerHandler}>
            {t('create_account')}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 font-mixed">
                <span className='text-black/70 dark:text-white/70'>{t('already_have_an_account')}</span>
                <Link className='font-semibold dark:text-white/90' href='/authenticate'>{t('login')}</Link>
            </div>
      </form>
  )
}
