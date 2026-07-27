import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-light shadow-sm border-b-4 border-primary-dark active:border-b-0 active:translate-y-1',
  secondary: 'bg-teal text-white hover:bg-teal-light shadow-sm border-b-4 border-teal-dark active:border-b-0 active:translate-y-1',
  outline: 'border-2 border-border bg-white text-gray-700 hover:bg-gray-50 border-b-4 active:border-b-2 active:translate-y-0.5',
  ghost: 'text-primary hover:bg-primary/10',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-b-4 border-red-800 active:border-b-0 active:translate-y-1',
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
