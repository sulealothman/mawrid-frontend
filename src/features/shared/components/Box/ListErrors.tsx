import { useI18n } from "../../../localization/hooks/useI18n";

interface ListErrorsProps {
    errors: string[];
}

export default function ListErrors({ errors }: ListErrorsProps) {
    const { t } = useI18n();
    
    return (
        <>
            {errors.length > 0 && (
                <div className='bg-red-200 text-red-600 font-medium w-full p-2 border border-red-300 rounded-xl rtl:font-noto-sans ltr:font-nunito'>
                    <ul className='list-disc list-inside'>
                        {errors.map((error, index) => (
                            <li key={index} className='text-sm'>{t(error)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
