import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'indigo' | 'gradient'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-gradient-to-r from-[#1e3a8a] to-[#2d4fa8] text-white hover:from-[#2d4fa8] hover:to-[#3b5fb8] active:from-[#152a66] active:to-[#1e3a8a] shadow-md hover:shadow-lg hover:shadow-blue-900/30',
  secondary: 'bg-gradient-to-r from-[#0d9488] to-[#14b8a8] text-white hover:from-[#14b8a8] hover:to-[#2dd4bf] active:from-[#0a7167] active:to-[#0d9488] shadow-md hover:shadow-lg hover:shadow-teal-600/30',
  outline:   'border-2 border-[#e2e8f0] bg-white text-[#374151] hover:border-[#1e3a8a] hover:text-[#1e3a8a] active:bg-[#f3f4f6] hover:shadow-md',
  ghost:     'text-[#1e3a8a] hover:bg-gradient-to-r hover:from-[#eff3ff] hover:to-[#f0fdfa] active:bg-[#dce5fd]',
  danger:    'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:from-[#dc2626] hover:to-[#b91c1c] shadow-md hover:shadow-lg hover:shadow-red-600/30',
  success:   'bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857] shadow-md hover:shadow-lg hover:shadow-emerald-600/30',
  indigo:    'bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white hover:from-[#4f46e5] hover:to-[#4338ca] shadow-md hover:shadow-lg hover:shadow-indigo-600/30',
  gradient:  'bg-gradient-to-r from-[#1e3a8a] via-[#0d9488] to-[#6366f1] text-white hover:from-[#2d4fa8] hover:via-[#14b8a8] hover:to-[#818cf8] shadow-lg hover:shadow-xl animate-gradient',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-sm gap-2',
  xl: 'px-8 py-3.5 text-base gap-2.5',
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
        'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/40 focus:ring-offset-2 focus:ring-offset-white btn-ripple',
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
