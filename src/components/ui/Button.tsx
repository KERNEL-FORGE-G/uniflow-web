import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-light shadow-sm',
  secondary: 'bg-teal text-white hover:bg-teal-light shadow-sm',
  outline: 'border border-border bg-surface text-gray-700 hover:bg-bg',
  ghost: 'text-primary hover:bg-primary/10',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
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
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
