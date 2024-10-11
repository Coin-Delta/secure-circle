import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '@/lib/utils';
import ButtonLoader from '@/assets/icons/ButtonLoader.svg?react';
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-primary hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        tab: 'bg-gradient-to-l from-custom-start to-custom-end text-transparent hover:bg-gradient-to-r bg-clip-text ',
      },
      size: {
        default: 'h-12 rounded-xl px-4 py-2',
        sm: 'h-9 rounded-xl px-3',
        md: 'h-11 rounded-xl px-6',
        lg: 'h-14 max-xl:h-12   rounded-xl px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 animate-spin">
              <ButtonLoader />
            </div>
            <span>Loading</span>
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'destructive',
    'outline',
    'secondary',
    'ghost',
    'link',
  ]),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'icon']),
  asChild: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export { Button, buttonVariants };
