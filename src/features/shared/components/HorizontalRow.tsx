interface Props {
    text: string,
    className?: string
}
export default function HorizontalRow({ text, className }: Props) {
    return (
        <div className={`relative flex flex-row w-full items-center px-3 sm:px-10 ${className ?? className}`}>

            <div className="grow border-t border-slate opacity-12"></div>
            <span className="shrink mx-4 text-sm font-mixed font-semibold text-slate opacity-40">
                {text}
            </span>
            <div className="grow border-t border-slate opacity-12"></div>
        </div>
    );
}