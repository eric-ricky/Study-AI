"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .describe("Password")
      .min(6, "Password must be a minimum of 6 characters"),
    confirmPassword: z
      .string()
      .describe("Confirm Password")
      .min(6, "Password must be a minimum of 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      toast.error("Invalid reset password link");
      router.push("/signin");
    }
  }, [code, router]);

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordFormSchema>) => {
    try {
      setErrorMessage(null);
      const { password } = values;

      const supabase = createClient();

      const { error: updatePasswordError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updatePasswordError) throw new Error(updatePasswordError.message);

      toast.success("Password updated successfully");
      form.reset();
      location.replace("/login");
    } catch (error) {
      setErrorMessage((error as Error).message);
      toast.error((error as Error).message);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  if (!code) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="password">New Password</Label>
                    <FormControl>
                      <PasswordInput
                        placeholder="New Password"
                        autoComplete="new-password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader className="size-4 mr-2 animate-spin" />
                )}
                {isSubmitting ? "Updating password..." : "Update Password"}
              </Button>

              {errorMessage && (
                <Alert variant="destructive" className="relative">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>

                  <div className="absolute right-2 top-2 cursor-pointer">
                    <X
                      className="size-4"
                      onClick={() => setErrorMessage(null)}
                    />
                  </div>
                </Alert>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
