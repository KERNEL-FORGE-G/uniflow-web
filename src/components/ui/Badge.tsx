import { cn } from '../../utils/cn'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary'

const variants: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-2 border-primary/20',
  success: 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200',
  warning: 'bg-orange-100 text-orange-700 border-2 border-orange-200',
  danger: 'bg-red-100 text-red-700 border-2 border-red-200',
  info: 'bg-blue-100 text-blue-700 border-2 border-blue-200',
  neutral: 'bg-gray-100 text-gray-700 border-2 border-gray-200',
}

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center rounded-xl px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  )
}
