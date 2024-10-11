import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/validators/AuthPages";
import EyeIcon from "@/assets/icons/eye-icon.svg";
import HideEyeIcon from "@/assets/icons/eye-hide-icon.svg";
import { useState } from "react";
import { login } from "../../../services/auth";
import { useAppDispatch } from "../../../store";
import { Link } from "react-router-dom";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      await login(values, navigate, dispatch);

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
            className="w-full  bg-white drop-shadow-md rounded-xl p-5 h-full flex flex-col justify-around"
          >
            <div className="w-full grid grid-cols-1 gap-3">
              <div className="w-full mb-5">
                <h3 className="text-2xl mt-auto mb-2 font-jost">
                  Sign-In Business Account
                </h3>
              </div>
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter your Password"
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
              <div className="w-full text-start text-primary font-semibold">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </div>
            <div className="mt-6">
              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full"
                loading={loading}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Form>
  );
}

export default Login;
