import * as React from 'react';
import PropTypes from 'prop-types';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';

import { cn } from '@/lib/utils';

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        'flex items-center gap-4 has-[:disabled]:opacity-50',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  ),
);
InputOTP.displayName = 'InputOTP';
InputOTP.propTypes = {
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';
InputOTPGroup.propTypes = {
  className: PropTypes.string,
};

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-12 w-12 items-center justify-center border-y border-r border-input text-lg transition-all first:rounded-l-md first:border-l last:rounded-r-md',
        isActive && 'z-10 ring-1 ring-ring ring-offset-background',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';
InputOTPSlot.propTypes = {
  index: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';
InputOTPSeparator.propTypes = {
  // No specific props to validate for InputOTPSeparator
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
