import { ReactNode } from "react";
import { LightNavbar } from "@/features/navbar/components/LightNavbar";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <LightNavbar />
      <Toaster position="top-center" />
      <main className="flex flex-row relative w-full h-[calc(100vh-80px)] bg-white dark:bg-neutral-950 duration-300">
        {children}
      </main>
    </>
  );
}