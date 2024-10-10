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
import { useForm } from 'react-hook-form';
import { verfiyEmailSchema } from '@/lib/validators/AuthPages';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { forgotPasswordVerifyEmail } from '@/services/auth';

function VerifyEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(verfiyEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    await forgotPasswordVerifyEmail(values, navigate);
    setLoading(false);
  }
  return (
    <Form {...form}>
      <div className="w-full flex justify-center items-center h-full">
        <div className="relative py-3 w-4/6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full  bg-white drop-shadow-md rounded-xl p-5 h-full flex flex-col justify-around"
          >
            <div className="w-full grid grid-cols-1 gap-10 mb-10">
              <h3 className="text-2xl mt-auto mb-2 font-jost">
                Forgot Password
              </h3>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full"
                loading={loading}
              >
                Send OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default VerifyEmail;
