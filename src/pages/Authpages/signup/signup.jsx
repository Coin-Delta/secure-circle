import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signUpSchema } from '@/lib/validators/AuthPages';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import PasswordField from '@/components/ui/input-password';
import { register } from '@/services/auth';
import EyeIcon from '@/assets/icons/eye-icon.svg';
import HideEyeIcon from '@/assets/icons/eye-hide-icon.svg';

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      await register(values);
      toast.success('OTP sent successfully');
      navigate('/verify-otp', { state: { email: values.email } });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="w-full flex justify-center items-center h-full">
        <div className="relative py-3 w-4/6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-4xl bg-white drop-shadow-md rounded-xl p-5 h-full flex flex-col justify-around"
          >
            <div className="w-full">
              <h3 className="text-2xl mt-auto mb-2 font-jost">
                Register Business Account
              </h3>
            </div>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-10 gap-y-6 my-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Email Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="w-1/4"
                variant="default"
                loading={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default SignUp;
