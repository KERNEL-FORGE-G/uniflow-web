import { cn } from '../../utils/cn'

export function Card({
  children,
  className,
  onClick,
  hover = true,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-[#e2e8f0] bg-white shadow-premium transition-all duration-300',
        hover && onClick && 'hover-lift-premium cursor-pointer',
        !hover && 'hover:shadow-premium-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({
  children,
  className,
  gradient = false,
}: {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}) {
  return (
    <h3 className={cn(
      'text-base font-bold tracking-tight',
      gradient ? 'gradient-text' : 'text-[#111827]',
      className
    )}>
      {children}
    </h3>
  )
}

export function CardSubtitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('text-sm text-[#64748b] mt-1', className)}>
      {children}
    </p>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('', className)}>{children}</div>
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-[#e2e8f0]', className)}>
      {children}
    </div>
  )
}
