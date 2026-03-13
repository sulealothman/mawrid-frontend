import Image from 'next/image';
import DarkLogo from '@/assets/logo/dark-logo.svg';
import LightLogo from '@/assets/logo/light-logo.svg';

interface LogoProps {
    className?: string;
}


export default function Logo({ className }: LogoProps) {
  return (
    <>
      <Image src={LightLogo} alt="logo" className={`${className ?? 'size-7'} transition dark:hidden`} />
      <Image src={DarkLogo} alt="logo" className={`${className ?? 'size-7'} transition hidden dark:block`} />
    </>
  )
}
