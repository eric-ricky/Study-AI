"use client";

import LoadingComponent from "@/components/loading-component";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import useUser from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// avatar_url,billing_address,email,full_name,id,payment_method,updated_at

const SettingsFormSchema = z.object({
  firstName: z.string().describe("First Name"),
  lastName: z.string().describe("Last Name"),
  apiKey: z
    .string()
    .describe("API Key")
    .min(6, "API Key must be a minimum of 6 characters"),
});

const SettingsPageContent = () => {
  const supabase = createClient();
  const { user, loading } = useUser();

  const form = useForm<z.infer<typeof SettingsFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      firstName: user?.full_name?.split(" ")[0] || "",
      lastName: user?.full_name?.split(" ").slice(1).join(" ") || "",
      apiKey: user?.api_key || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("firstName", user.full_name?.split(" ")[0] || "");
      form.setValue(
        "lastName",
        user.full_name?.split(" ").slice(1).join(" ") || ""
      );
      form.setValue("apiKey", user.api_key || "");
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof SettingsFormSchema>) => {
    if (!user) return;

    try {
      console.log(data);
      await supabase
        .from("users")
        .update({
          full_name: `${data.firstName} ${data.lastName}`,
          api_key: data.apiKey,
        })
        .eq("id", user.id);
      toast.success("Settings updated successfully");
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const {
    formState: { isSubmitting },
  } = form;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="max-w-4xl">
        {loading && <LoadingComponent className="min-h-[300px]" />}

        {!loading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  disabled={isSubmitting}
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem aria-autocomplete="none">
                      <Label htmlFor="firstName">First Name</Label>
                      <FormControl aria-autocomplete="none">
                        <Input
                          type="text"
                          placeholder="First Name"
                          autoComplete="off"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="lastName">Last Name</Label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          autoComplete="additional-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="apiKey">API Key</Label>
                    <FormControl>
                      <PasswordInput
                        placeholder="API Key"
                        autoComplete="billing address-line2 webauthn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4 pt-8">
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </Link>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader className="size-4 mr-2 animate-spin" />
                  )}
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SettingsPageContent;
