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

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
      {showResetPassword ? (
        <ResetPasswordForm />
      ) : (
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
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader className="size-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>

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
