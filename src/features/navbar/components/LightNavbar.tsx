import dynamic from 'next/dynamic';
import LanguageDropdown from '@/features/localization/components/LanguageDropdown';
import LogoTitle from './LogoTitle';
import Link from 'next/link';

const ToggleTheme = dynamic(() => import('@/features/theme/components/ToggleTheme'), { ssr: false });

export const LightNavbar = () => {
  return (
    <nav className="relative flex items-center justify-center flex-wrap duration-200 px-8 py-6">
      <div className="w-full flex items-center justify-between">
        <Link href='/'>
          <LogoTitle />
        </Link>
        <div className='flex items-center gap-4 me-8 relative'>

          <ToggleTheme />
          <LanguageDropdown />
        </div>
      </div>
    </nav>
  )
}