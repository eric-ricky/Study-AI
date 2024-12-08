import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import SettingsPageContent from "./_component/content";

const SettingsPge = async () => {
  const supabase: SupabaseClient<any, "public", any> = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <SettingsPageContent />;
};

export default SettingsPge;
