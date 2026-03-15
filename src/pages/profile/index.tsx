import useAuthMount from "@/features/authenticate/hooks/useAuthMount";
import { useI18n } from "@/features/localization/hooks/useI18n";
import UploadAvatarContainer from "@/features/users/components/Forms/UploadAvatarContainer";
import UserDeactivateFormContainer from "@/features/users/components/Forms/UserDeactivateFormContainer";
import UserInformationFormContainer from "@/features/users/components/Forms/UserInformationFormContainer";
import UserPasswordFormContainer from "@/features/users/components/Forms/UserPasswordFormContainer";
import BlankLoading from "@/features/shared/components/Loaders/BlankLoading";
import Layout from "@/features/shared/layout/DefaultLayout";
import Heads from "@/features/shared/template/Heads";
import { UserStore } from "@/features/users/store/User";
import { ReactNode } from "react";

export default function Home() {

  const { t } = useI18n();
  const user = UserStore();


  const { isMounted } = useAuthMount();

  if (!isMounted) return (<BlankLoading />);


  return (
    <div className="relative h-full max-h-screen flex w-full flex-col items-center">
      <Heads title={t('profile')} />

      <div className="w-full h-full max-w-3xl flex flex-col md:justify-center md:items-center gap-2 overflow-y-auto p-2 py-10">
        {user.access_token && <UploadAvatarContainer currentAvatar={user.avatar} />}
        {user.access_token &&
          <UserInformationFormContainer
            currentName={user.name}
            currentEmail={user.email}
            currentPhoneNumber={user.phone || ''}
          />}
        <UserPasswordFormContainer />
        <UserDeactivateFormContainer />
      </div>
    </div>
  );
}


Home.getLayout = function getLayout(page: ReactNode) {
  return <Layout>{page}</Layout>;
}