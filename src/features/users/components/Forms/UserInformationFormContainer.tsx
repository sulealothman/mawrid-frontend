import {useState} from 'react'
import UserInformationForm from './UserInformationForm'
import useUserActions from '../../../users/hooks/useUserActions';
import useFormValidator from '@/features/authenticate/hooks/useFormValidator';

interface UserInformationFormContainerProps {
  currentName: string;
  currentEmail: string;
  currentPhoneNumber: string;
}

export default function UserInformationFormContainer({
  currentName,
  currentEmail,
  currentPhoneNumber
}: UserInformationFormContainerProps) {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const { updateInformationValidator } = useFormValidator();


  const { updateUserInformation } = useUserActions();

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value || '');
  };

  const onSubmit = async () => {
    const validate = updateInformationValidator({name, email, phone: phoneNumber});
    if(validate.length > 0) {
      return;
    }
    await updateUserInformation({name, email, phone: phoneNumber});
  }

  return (
    <UserInformationForm
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phoneNumber={phoneNumber}
      handlePhoneChange={handlePhoneChange}
      onSubmit={onSubmit}
    />
  )
}
