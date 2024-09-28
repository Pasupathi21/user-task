import { cn } from '../utils/tcss'

interface ButtonProps {
    buttonText: string;
    type?: any;
    disabled?: boolean
    className?: string
    handleClick?: (value?: any) => void
}
export default function Button({
    buttonText = 'button',
    type,
    disabled = false,
    className,
    handleClick,
    ...rest
}: ButtonProps) {
  return (
    <button className={cn("bg-blue-800 p-2 rounded-lg text-white w-[100px]", className)} type={type || 'button'} disabled={disabled} onClick={handleClick}{...rest}>{buttonText}</button>
  )
}
