import Link from 'next/link';
import PasswordInputForm from '@/features/shared/components/Input/PasswordInputForm';
import InputForm from '@/features/shared/components/Input/InputForm';
import Divider from '@/features/shared/components/Divider';
import Title from '@/features/shared/components/Title/Title';
import ListErrors from '@/features/shared/components/Box/ListErrors';
import { useI18n } from '@/features/localization/hooks/useI18n';
import LogoTitle from '@/features/navbar/components/LogoTitle';
import useFormValidator from '../hooks/useFormValidator';
import Button from '@/features/shared/components/Button/Button';


interface LoginFormProps {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    loginHandler: (e: React.MouseEvent<HTMLButtonElement> | undefined) => void;
    errors: string[];
}

const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    loginHandler,
    errors = []
}: LoginFormProps) => {
    const { t } = useI18n();
    const { inputEmailValidator } = useFormValidator();

    return (
        <form  className="flex flex-col gap-3 w-full max-w-sm p-2">
            <LogoTitle className='text-3xl justify-center mb-4' logoClassName='size-7' />
            <Title text={t('login')} />
            <Divider className='border-tertiary' />
            <ListErrors errors={errors} />
            <InputForm
                label='email'
                testId='email-input'
                placeholder={t('email_placeholder')}
                value={email}
                setValue={setEmail}
                type='email'
                validator={inputEmailValidator}
            />
            <PasswordInputForm
                label='password'
                testId='password-input'
                placeholder={t('password_placeholder')}
                password={password}
                setPassword={setPassword}
            />
            <Link
                className='font-mixed pb-3 text-secondary font-semibold'
                href='/authenticate/forgot-password'>
                    {t('forgot_password')}
            </Link>

            <div className='flex flex-col gap-2'>
                <Button onClick={loginHandler} variant='primary'>
                    {t('login')}
                </Button>
            </div>

            <div className="flex items-center justify-center gap-2 font-mixed">
                <span className='text-tertiary'>{t('didnt_have_an_account')}</span>
                <Link href='/authenticate/signup' className='text-secondary font-bold'>{t('create_account')}</Link>
            </div>
        </form>
    )
}

export default LoginForm;