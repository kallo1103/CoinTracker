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
          web3-card p-6
          ${hoverEffect ? 'hover:translate-y-[-4px] hover:border-white/[0.12]' : ''}
          ${glowing ? 'border-indigo-500/20 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]' : ''}
          ${className}
        `}
        style={{ transition: 'all 0.3s ease' }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card }
