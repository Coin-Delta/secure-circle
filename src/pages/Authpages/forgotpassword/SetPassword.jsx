import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setPasswordSchema } from '@/lib/validators/AuthPages';
import { useLocation, useNavigate } from 'react-router-dom';
import PasswordField from '@/components/ui/input-password';
import EyeIcon from '@/assets/icons/eye-icon.svg';
import HideEyeIcon from '@/assets/icons/eye-hide-icon.svg';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { toast } from 'sonner';
import { forgotPassword, forgotPasswordVerifyEmail } from '@/services/auth';

function SetPassword() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location?.state?.email;

  const form = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      email: email,
      otp: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function handleResend() {
    try {
      const data = await forgotPasswordVerifyEmail({ email: email });
      if (data.success) {
        toast.success('OTP sent successfully');
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function onSubmit(values) {
    setLoading(true);
    await forgotPassword(values, navigate);
    setLoading(false);
  }
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, []);
  return (
    <Form {...form}>
      <div className="w-full flex justify-center items-center h-full">
        <div className="relative py-3 w-4/6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  bg-white drop-shadow-md rounded-xl p-5 h-full flex flex-col justify-around"
          >
            <div className="w-full grid grid-cols-1 gap-6">
              <h3 className="text-2xl mt-auto mb-2 font-jost">Set Password</h3>
              <FormField
                control={form.control}
                name="otp"
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authorization Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Authorization Code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PasswordField />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Enter your Confirm Password"
                        {...field}
                        icon={
                          <button
                            onClick={() =>
                              setIsPasswordVisible(!isPasswordVisible)
                            }
                            type="button"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex md:flex-row flex-col items-center gap-4 pb-4">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleResend}
                  className="text-center border-[#FAFAFA29]  w-full font-normal gap-1 max-sm:text-sm"
                >
                  {'Don’t Receive code?'}
                  <span className="text-primary max-sm:text-sm font-medium">
                    Resend
                  </span>
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  type="submit"
                  className=" w-full max-w-64 max-sm:text-sm"
                  loading={loading}
                >
                  Verify
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default SetPassword;
