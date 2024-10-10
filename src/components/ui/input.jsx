import * as React from 'react';
import { cn } from '@/lib/utils';
import propsTypes from 'prop-types';
const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        className={cn(
          'flex h-14 w-full rounded-xl border-2 border-input bg-background px-3 py-2 pr-10 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {icon && (
        <div className="absolute right-3 flex items-center">
          {icon}
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };

Input.propTypes = {
  className: propsTypes.string,
  type: propsTypes.string,
  icon: propsTypes.node,
};
