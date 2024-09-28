
import { cn } from '../utils/tcss'
interface DropDownProps {
    name: string
    options: Record<string, any>[];
    value: Record<string, any> | any;
    handleInputChange?: (key: string, value: any) => void;
    className?: string;
    error?: Record<string, any>
}

export const DropDown = ({ name, options, value, handleInputChange, className, error, ...rest }: DropDownProps) => {
    return (
        <>
        <div className="w-full flex flex-1 flex-col gap-1 items-start ">
            <select value={value || null} className={cn("w-full p-1.5 rounded-xl border-2 border-blue-600 bg-white", className)} {...rest} onChange={(event: any) => handleInputChange && handleInputChange(name, event)}>
                <option value="select">Select</option>
                {
                    options?.length ? (
                        options.map((opt: Record<string, any>, _i: number) => (<option value={opt.value}>{opt.label}</option>))
                    ) : null
                }
                
            </select>
            { error && error[name] && <span className='text-red-500'> {error[name]}</span> }
        </div>
        </>
    )
}