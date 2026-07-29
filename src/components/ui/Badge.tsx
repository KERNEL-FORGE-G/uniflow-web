import { cn } from '../../utils/cn'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary' | 'purple' | 'teal' | 'indigo' | 'gradient'
type BadgeSize = 'sm' | 'md' | 'lg'

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-gradient-to-r from-[#eff3ff] to-[#dbeafe] text-[#1e3a8a] border border-[#bfdbfe] shadow-sm',
  success: 'bg-gradient-to-r from-[#d1fae5] to-[#a7f3d0] text-[#065f46] border border-[#6ee7b7] shadow-sm',
  warning: 'bg-gradient-to-r from-[#fef3c7] to-[#fde68a] text-[#92400e] border border-[#fcd34d] shadow-sm',
  danger:  'bg-gradient-to-r from-[#fee2e2] to-[#fecaca] text-[#991b1b] border border-[#fca5a5] shadow-sm',
  info:    'bg-gradient-to-r from-[#dbeafe] to-[#bfdbfe] text-[#1e40af] border border-[#93c5fd] shadow-sm',
  neutral: 'bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] text-[#374151] border border-[#d1d5db] shadow-sm',
  purple:  'bg-gradient-to-r from-[#ede9fe] to-[#ddd6fe] text-[#5b21b6] border border-[#c4b5fd] shadow-sm',
  teal:    'bg-gradient-to-r from-[#ccfbf1] to-[#99f6e4] text-[#115e59] border border-[#5eead4] shadow-sm',
  indigo:  'bg-gradient-to-r from-[#e0e7ff] to-[#c7d2fe] text-[#3730a3] border border-[#a5b4fc] shadow-sm',
  gradient: 'bg-gradient-to-r from-[#1e3a8a] via-[#0d9488] to-[#6366f1] text-white border-0 shadow-md animate-gradient',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3.5 py-1.5 text-sm',
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  pulse = false,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  pulse?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-300',
        variants[variant],
        sizes[size],
        pulse && 'badge-pulse',
        className,
      )}
    >
      {children}
    </span>
  )
}
