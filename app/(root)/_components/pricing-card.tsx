import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard = ({
  title,
  price,
  features,
  isPopular,
}: PricingCardProps) => {
  return (
    <div
      className={`p-8 rounded-2xl ${
        isPopular ? "bg-indigo-50 border-2 border-indigo-600" : "bg-white"
      } shadow-lg`}
    >
      {isPopular && (
        <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <div className="mt-4 mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-gray-600">/month</span>}
      </div>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="h-5 w-5 text-indigo-600" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full mt-8 py-3 rounded-lg font-medium transition-colors ${
          isPopular
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
        }`}
      >
        Get Started
      </button>
    </div>
  );
};
