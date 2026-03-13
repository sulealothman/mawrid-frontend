import React, { useState } from 'react'
import LoginForm from '@/features/authenticate/components/LoginForm'
import useAuth from '@/features/authenticate/hooks/useAuth';
import useFormValidator from '@/features/authenticate/hooks/useFormValidator';

const LoginContainer = () => {
  const {login} = useAuth();
  const { signinValidator } = useFormValidator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const onEmailChange = (value: string) => {
    setEmail(value);
    if (errors.length) setErrors([]);
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
    if (errors.length) setErrors([]);
  };

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement> | undefined) => {
    e?.preventDefault();
    const validate = signinValidator({email, password});
    if(validate.length > 0) {
      setErrors(validate);
      return;
    }
    await login(email, password);
  }
  return (
    <LoginForm
      email={email}
      setEmail={onEmailChange}
      password={password}
      setPassword={onPasswordChange}
      loginHandler={loginHandler}
      errors={errors}
    />
  )
}

export default LoginContainer;