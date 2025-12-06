import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowing?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverEffect = false, glowing = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          glass-card
          p-6
          transition-all duration-300 ease-out
          ${hoverEffect ? 'hover:translate-y-[-4px] hover:bg-white/10 dark:hover:bg-white/5 hover:border-white/20' : ''}
          ${glowing ? 'border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card }

