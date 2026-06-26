import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, value, ...props }, ref) => {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> } = {
      type,
      className: cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      ),
      ref,
      ...props
    }

    if (value !== undefined) {
      inputProps.value = value
    }

    if (prefix) {
      return (
        <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background">
          <span className="px-3 py-2 text-sm text-muted-foreground border-r border-input">
            {prefix}
          </span>
          <input
            {...inputProps}
            className={cn(
              'flex-1 h-full px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background rounded-r-md',
              className
            )}
          />
        </div>
      )
    }

    return <input {...inputProps} />
  }
)
Input.displayName = 'Input'

export { Input }
