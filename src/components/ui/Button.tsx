import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-[#1e3a8a] text-white hover:bg-[#2d4fa8] active:bg-[#152a66] shadow-sm',
  secondary: 'bg-[#0d9488] text-white hover:bg-[#14b8a8] active:bg-[#0a7167] shadow-sm',
  outline:   'border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f9fafb] active:bg-[#f3f4f6]',
  ghost:     'text-[#1e3a8a] hover:bg-[#eff3ff] active:bg-[#dce5fd]',
  danger:    'bg-[#ef4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c] shadow-sm',
  success:   'bg-[#10b981] text-white hover:bg-[#059669] shadow-sm',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-2.5 text-sm gap-2',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30 focus:ring-offset-1',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
