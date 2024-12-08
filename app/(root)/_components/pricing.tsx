import { PricingCard } from "./pricing-card";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Simple, Student-Friendly Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Basic"
            price="Free"
            features={[
              "5 uploads per month",
              "Basic summaries",
              "Simple practice questions",
              "Community support",
            ]}
          />
          <PricingCard
            title="Pro"
            price="$9.99"
            features={[
              "Unlimited uploads",
              "Advanced summaries",
              "Custom practice tests",
              "Priority support",
              "Performance analytics",
            ]}
            isPopular
          />
          <PricingCard
            title="Team"
            price="$19.99"
            features={[
              "Everything in Pro",
              "Group collaboration",
              "Study group features",
              "Custom integrations",
              "Admin dashboard",
            ]}
          />
        </div>
      </div>
    </section>
  );
};
