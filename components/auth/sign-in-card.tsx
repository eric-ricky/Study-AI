"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../ui/password-input";

const SignInFormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Enter a valid email" }),
  password: z
    .string()
    .describe("Password")
    .min(6, "Password must be a minimum of 6 characters"),
});

const SignInCard = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
    try {
      setErrorMessage(null);

      const { email, password } = values;
      if (!email || !password) throw new Error("Please fill all the fields");

      const supabase = createClient();

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("SIGNIN ERROR ===>", signInError);
      if (signInError) throw new Error(signInError.message);

      toast.success("Login successfully");
      form.reset();
      location.reload();
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
      {showResetPassword ? (
        <ResetPasswordForm />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email address</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email webauthn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">Password</Label>
                    <FormControl>
                      <PasswordInput
                        placeholder="Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader className="size-4 mr-2 animate-spin" />
                  )}
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>

                {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div> */}
                {/* 
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button> */}

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowResetPassword(true)}
                >
                  Forgot Password?
                </Button>
              </div>

              {errorMessage && (
                <Alert variant="destructive" className="relative">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>

                  <div className="absolute right-2 top-2 cursor-pointer">
                    <X
                      className="size-4 "
                      onClick={() => setErrorMessage(null)}
                    />
                  </div>
                </Alert>
              )}

              <p>
                Don&apos;t have an account?{" "}
                <Link href={"/signup"} className="text-blue-600">
                  &nbsp;Create Account
                </Link>
              </p>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default SignInCard;

const ResetPasswordFormSchema = z.object({
  email: z.string().describe("Email").email({ message: "Enter a valid email" }),
});

const ResetPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    try {
      setErrorMessage(null);

      const { email } = values;
      if (!email) throw new Error("Please fill all the fields");

      const supabase = createClient();

      const { error: resetPasswordLinkError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

      console.log("RESET_PASSWORD_LINK ERROR ===>", resetPasswordLinkError);
      if (resetPasswordLinkError)
        throw new Error(resetPasswordLinkError.message);

      toast.success(`Reset password link has been sent to ${email}`);
      form.reset();
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email address</Label>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  autoComplete="email webauthn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader className="size-4 mr-2 animate-spin" />}
            {isSubmitting ? "Sending reset link..." : "Send Reset Link"}
          </Button>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="relative">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>

            <div className="absolute right-2 top-2 cursor-pointer">
              <X className="size-4 " onClick={() => setErrorMessage(null)} />
            </div>
          </Alert>
        )}

        <p>
          Don&apos;t have an account?{" "}
          <Link href={"/signup"} className="text-blue-600">
            &nbsp;Create Account
          </Link>
        </p>
      </form>
    </Form>
  );
};
