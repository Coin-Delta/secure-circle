// PasswordField.js
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import PropTypes from 'prop-types';
import { passwordSchema } from '@/lib/validators/AuthPages';
import EyeIcon from '@/assets/icons/eye-icon.svg';
import HideEyeIcon from '@/assets/icons/eye-hide-icon.svg';

const PasswordField = ({ name = 'password' }) => {
  const { control, setValue } = useFormContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
    hasLowercase: false,
  });

  const [isFocused, setIsFocused] = useState(false);

  const validatePassword = password => {
    const validationResult = passwordSchema.safeParse(password);
    setPasswordValidation({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*#?&]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
    });
    return validationResult.success;
  };

  const handlePasswordChange = password => {
    validatePassword(password);
    setValue(name, password, { shouldValidate: true });
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Enter your Password"
              {...field}
              onChange={e => handlePasswordChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              icon={
                <button
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="cursor-pointer"
                >
                  <img
                    src={!isPasswordVisible ? EyeIcon : HideEyeIcon}
                    alt="eyeIcon"
                    width={20}
                    height={20}
                  />
                </button>
              }
            />
          </FormControl>
          {!isFocused && <FormMessage>{fieldState.error?.message}</FormMessage>}
          {isFocused && (
            <ul className="password-validation list-disc ">
              <span className="font-semibold">Password must contain:</span>
              <li
                style={{
                  color: passwordValidation.minLength ? 'green' : 'red',
                }}
              >
                At least 8 characters
              </li>
              <li
                style={{
                  color: passwordValidation.hasNumber ? 'green' : 'red',
                }}
              >
                Contains a number
              </li>
              <li
                style={{
                  color: passwordValidation.hasSpecialChar ? 'green' : 'red',
                }}
              >
                Contains a special character
              </li>
              <li
                style={{
                  color: passwordValidation.hasUppercase ? 'green' : 'red',
                }}
              >
                Contains an uppercase letter
              </li>
              <li
                style={{
                  color: passwordValidation.hasLowercase ? 'green' : 'red',
                }}
              >
                Contains a lowercase letter
              </li>
            </ul>
          )}
        </FormItem>
      )}
    />
  );
};

PasswordField.propTypes = {
  name: PropTypes.string,
};

export default PasswordField;
