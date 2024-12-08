import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BenefitsSection } from "./_components/benefits";
import { CTASection } from "./_components/cta";
import { FeaturesSection } from "./_components/features";
import { Footer } from "./_components/footer";
import { HeroSection } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { PricingSection } from "./_components/pricing";

export const dynamic = "force-static";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect("/dashboard");

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <PricingSection />
        <CTASection />
        <Footer />
      </div>

      <div className="hidden min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Document Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            Chat with your documents using AI. Upload PDFs and get instant
            answers.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
