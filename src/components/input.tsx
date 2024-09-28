import { cn } from '../utils/tcss'
interface IInputProps {
name: string;
value: string;
id?: string;
className?: string;
handleInputChange?: (key: string, value: any) => void;
error?: Record<string, any>
}

export const Input = ({
    name,
    value,
    id,
    handleInputChange,
    error,
    className,
    ...rest
}: IInputProps | any) => {
    return (
        <div className="flex flex-1 flex-col gap-1 items-start">
            <input
                id={id}
                name={name}
                value={value}
                className={cn("rounded-xl w-full p-1 border-2 border-blue-600", className)}
                onChange={(event: any) => handleInputChange && handleInputChange(name, event)}
                
                {...rest} />
                { error && error[name] && <span className='text-red-500'> {error[name]}</span> }
        </div>
    )
    
} 
