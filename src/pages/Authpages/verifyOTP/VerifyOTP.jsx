import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { VerifyOtpSchema } from '@/lib/validators/AuthPages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { ResendOTP, verifyOTP } from '@/services/auth';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function VerifyOTP() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const email = location?.state?.email;
  const form = useForm({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  async function handleResend() {
    try {
      const data = await ResendOTP({ email: email });
      if (data.success) {
        toast.success('OTP sent successfully');
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function onSubmit(values) {
    try {
      values = { ...values, email: email };
      setLoading(true);
      const response = await verifyOTP(values);
      if (response.success) {
        toast.success('Successfully Verified');
        navigate('/');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!email) {
      console.log(email);
    }
  }, [email]);

  return (
    <div className="w-full flex justify-center items-center h-full">
      <Form {...form}>
        <div className="relative py-3 w-4/6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-4xl bg-white drop-shadow-md rounded-xl p-5 h-full flex flex-col justify-around"
          >
            <div className="w-full grid grid-cols-1 gap-6">
              <h3 className="text-2xl mt-auto font-jost">Verify Email</h3>

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Enter the 6-digit code sent to your email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full"
                loading={loading}
              >
                Verify
              </Button>
              <p className="text-center mb-0 text-[#9C9C9C]">
                {'Don’t Receive code'}
                <Button
                  variant="link"
                  type="button"
                  onClick={handleResend}
                  className="text-primary pl-1"
                >
                  Resend OTP
                </Button>
              </p>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}

export default VerifyOTP;
