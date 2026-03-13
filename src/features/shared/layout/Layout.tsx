import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
const Theme = dynamic(() => import('@/features/theme/components/Theme'), { ssr: false });

interface Props {
    children: ReactNode;
}
export default function Layout({ children }: Props) {
    return (
        <>
            <Theme />
            <Toaster position="top-center" />
            <main className="flex flex-row relative w-full h-screen dark:bg-neutral-950 duration-300">
                {children}
            </main>
        </>
    );
}