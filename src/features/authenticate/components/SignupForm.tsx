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
import Button from '@/features/shared/components/Button/Button';

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
    <form className="flex flex-col gap-3 w-full max-w-sm p-2">
        <LogoTitle className='text-3xl justify-center mb-4' logoClassName='size-7' />
        <Title text={t('create_a_new_account')} />

        <Divider className='border-tertiary' />

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
          <Button variant='primary' onClick={registerHandler}>
            {t('create_account')}
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 font-mixed">
                <span className='text-tertiary'>{t('already_have_an_account')}</span>
                <Link className='text-secondary font-bold' href='/authenticate'>{t('login')}</Link>
            </div>
      </form>
  )
}
