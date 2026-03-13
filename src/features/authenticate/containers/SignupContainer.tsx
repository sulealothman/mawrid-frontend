import React, { useState } from 'react'
import { SignupForm } from '@/features/authenticate/components/SignupForm'
import useAuth from '@/features/authenticate/hooks/useAuth';
import useFormValidator from '@/features/authenticate/hooks/useFormValidator';
import useHandleError from '@/features/shared/hooks/useHandleError';

export const SignupContainer = () => {
  const {register} = useAuth();
  const { signupValidator } = useFormValidator();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const { hasErrorsResponse } = useHandleError();


  const onNameChange = (value: string) => {
    setName(value);
    if (errors.length) setErrors([]);
  }
  const onEmailChange = (value: string) => {
    setEmail(value);
    if (errors.length) setErrors([]);
  }

  const onPasswordChange = (value: string) => {
    setPassword(value);
    if (errors.length) setErrors([]);
  }

  const handlePhoneChange = (value: string | undefined) => {
    if (value?.trim()) setPhoneNumber(value ?? '');
    if (errors.length) setErrors([]);
  }

  const handleRegister = async (name: string, email: string, password: string, phone: string) => {
    setErrors([]);
    const validate = signupValidator({name, email, password, phoneNumber});
    if(validate.length > 0) {
      setErrors(validate);
      return;
    }
    const response = await register(name, email, password, phone);
    if(hasErrorsResponse(response)) setErrors(response.errors!);
  }

  return (
    <SignupForm
      name={name}
      setName={onNameChange}
      email={email}
      setEmail={onEmailChange}
      phoneNumber={phoneNumber}
      handlePhoneChange={handlePhoneChange}
      password={password}
      setPassword={onPasswordChange}
      errors={errors}
      registerHandler={(e:React.MouseEvent<HTMLButtonElement> | undefined) => {
        e?.preventDefault();
        handleRegister(name, email, password, phoneNumber);
      }}
    
    />
  )
}
