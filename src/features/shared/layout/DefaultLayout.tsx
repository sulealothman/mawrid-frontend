import { ReactNode } from "react";
import Sidebar from "@/features/sidebar/components/Sidebar";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { UserStore } from "@/features/users/store/User";
import useSidebar from "@/features/sidebar/hooks/useSidebar";
const Theme = dynamic(() => import('@/features/theme/components/Theme'), { ssr: false });

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {

  const user = UserStore((state) => state);
  const { isCollapse, handleClose } = useSidebar();

  return (
    <>
       <Toaster position="top-center" />
       <Theme />
        <div className="font-sans h-screen overflow-hidden bg-gray-100 dark:bg-neutral-800 flex duration-300">

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