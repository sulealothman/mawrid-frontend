import { ReactNode, useRef, useEffect } from "react";
import Sidebar from "@/features/sidebar/components/Sidebar";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { UserStore } from "@/features/users/store/User";
import useSidebar from "@/features/sidebar/hooks/useSidebar";
import { AuthStore } from "@/features/authenticate/store/Auth";
import useAuth from "@/features/authenticate/hooks/useAuth";
const Theme = dynamic(() => import('@/features/theme/components/Theme'), { ssr: false });

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {

  const lastAccessToken = useRef<string | null>(null);

  const access_token = AuthStore(state => state.access_token);
  const { existUserDataOrRetrieve } = useAuth();
  const user = UserStore((state) => state);
  const { isCollapse, handleClose } = useSidebar();

  useEffect(() => {
    if (access_token == null) return;
    if (lastAccessToken.current === access_token && lastAccessToken.current !== '') return;
    lastAccessToken.current = access_token;
    existUserDataOrRetrieve();

  }, [access_token, existUserDataOrRetrieve]);

  return (
    <>
       <Toaster position="top-center" />
       <Theme />
        <div className="font-sans h-screen overflow-hidden bg-grandient flex duration-300">

        {user.access_token && (
          <>
            <Sidebar />
            {!isCollapse && (
              <div
                className="fixed inset-0 bg-black/60 z-30 md:hidden"
                onClick={handleClose}
              />
            )}
          </>
        )}
          {children}
        </div>
    </>
  );
}