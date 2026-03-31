import { ReactNode } from "react";
import { LightNavbar } from "@/features/navbar/components/LightNavbar";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <div className="h-screen overflow-hidden bg-gradient flex flex-col duration-300">
      <LightNavbar />
      <Toaster position="top-center" />
      <main className="flex flex-row relative w-full h-full duration-300">
        {children}
      </main>
    </div>
  );
}