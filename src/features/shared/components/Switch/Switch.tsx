import React from 'react'
import { FC, InputHTMLAttributes, ReactNode } from "react";

const defaultClasses = "flex justify-between items-center bg-gray-600 peer-checked:bg-red-400 duration-200 w-10 h-5 rounded-full px-0.5"

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    labelClass?: string,
    className?:string,
    circleClassName?:string,
    children?: ReactNode
}

const Switch: FC<Props> = React.forwardRef<HTMLLabelElement, Props>(({
    label,
    labelClass,
    children,
    className,
    circleClassName,
    ...props
}, ref) => {
    const { id, checked } = props;
    return (
        <label ref={ref} htmlFor={id ? id : 'default-switch'} className="flex gap-2 items-center cursor-pointer">
            {label ? (
                <div className={`text-gray-700 font-medium ${labelClass ? labelClass : ''}`}>
                    {label}
                </div>
            ) : ''}
            
            <div className="relative">
                <input type="checkbox"
                id={id ? id : 'default-switch'}
                className="peer sr-only"
                checked={checked}
                hidden
                {...props} />
                
                <div 
                className={`${defaultClasses} ${className ? className : ''}`}>
                    {children ?
                    React.Children.map(children, child => (
                    <div className='w-3.5 h-3.5 flex justify-center items-center'>
                        {child}
                    </div>))
                    : ''}
                </div>

                <div 
                className={`peer-checked:translate-x-[calc(100%+4px)]
                absolute ltr:left-0.5 rtl:right-0.5 top-1/2 -translate-y-1/2
                bg-white w-4 h-4 rounded-full transition ${circleClassName ? circleClassName : ''}`}>
                </div>
            </div>
        </label>
    )
})

Switch.displayName = "Switch";

export default Switch;