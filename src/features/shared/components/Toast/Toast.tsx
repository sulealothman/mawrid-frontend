'use client'

import { Icons } from '@/features/shared/components/Toast/Icons'
import { cn } from '@/features/shared/utils/utils'
import * as React from 'react'
import hotToast, { Toaster as HotToaster } from 'react-hot-toast'
import Image from 'next/image'
import { SIDEBAR_WIDTH } from "@/features/sidebar/constants/constants";
import { SCREEN_SIZES } from "@/features/shared/constants/breakpoints";

export const Toaster = HotToaster

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <React.Suspense>
      <div
        className={cn(
          'min-h-14 mb-2 min-w-97.5 w-auto max-w-md flex flex-row justify-start items-center gap-1 rounded-xl',
          visible && 'animate-in slide-in-from-bottom-5',
          className
        )}
        {...props}
      />
    </React.Suspense>

  )
}

interface ToastIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  name: keyof typeof Icons
}

Toast.Icon = function ToastIcon({ name, className }: ToastIconProps) {
  const Icon = Icons[name]

  if (!Icon) {
    return null
  }

  return (
    <div className='flex size-10 items-center justify-center'>
      <Image className={cn('min-h-10 min-w-10', className)} width='10' height="10"
        src={Icon}
        alt={`${name} icon`}
      />
    </div>
  )
}

// interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { }

Toast.Title = function ToastTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <p className={cn('text-sm font-semibold', className)} {...props} />
}

// interface ToastDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> { }

Toast.Description = function ToastDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm font-semibold', className)} {...props} />
}

interface ToastOpts {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  testId?: string
}

export function toast(opts: ToastOpts, isSidebarView?: boolean) {
  const { title, message, type = 'success', testId, duration = 3000 } = opts;
  hotToast.remove();
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  const _testId = testId ? `toast-${type}-${testId}` : `toast-${type}`;
  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className="bg-white">
        <div style={{
          marginInlineStart: isSidebarView && width > SCREEN_SIZES.sm ? `${SIDEBAR_WIDTH}px` : "0",
        }} 
        className={cn({
          'bg-red-200 text-red-600': type === 'error',
          'bg-green-200 text-green-900/95': type === 'success',
          'bg-blue-300/40 text-blue-900/95': type === 'info',
          'bg-yellow-300/35 text-yellow-900/95': type === 'warning',
        }, 'font-mixed p-2 flex flex-row justify-between items-center gap-1 rounded-xl w-full')}>
          <div className='flex flex-row justify-start items-center gap-1'>
            <Toast.Title>{title}</Toast.Title>
            <Toast.Icon className='p-1' name={type} />
            {message && <Toast.Description data-testid={_testId} className='pe-3'>

              {message}</Toast.Description>}
          </div>
          <div className='flex flex-row justify-end items-center gap-1'>
            <Image src={Icons.close} alt='Close toast' onClick={() => hotToast.remove()} className='cursor-pointer pe-1 min-h-4 min-w-4' />
          </div>
        </div>

      </Toast>
    ),
    { duration }
  )
}