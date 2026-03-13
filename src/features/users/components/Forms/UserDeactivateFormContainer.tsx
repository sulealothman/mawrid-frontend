import { useState } from 'react';
import useUserActions from '../../hooks/useUserActions';
import UserDeactivateForm from './UserDeactivateForm'
import DeactivateAccountModal from '../Model/DeactivateAccountModal';

export default function UserDeactivateFormContainer() {
  const { deactivateAccount } = useUserActions();
  const [showDeactivateAccountModal, setShowDeactivateAccountModal] = useState(false);

  const openDeactivateAccountModal = () => {
    setShowDeactivateAccountModal(true);
  }
  const closeDeactivateAccountModal = () => {
    setShowDeactivateAccountModal(false);
  }
  return (
    <>
      <DeactivateAccountModal
        showDeactivateAccountModal={showDeactivateAccountModal}
        closeDeactivateAccountModal={closeDeactivateAccountModal}
        onDeactivate={deactivateAccount}
      />
      <UserDeactivateForm openDeactivateAccountModal={openDeactivateAccountModal} />
    </>
  )
}
