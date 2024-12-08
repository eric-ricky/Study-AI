import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

const products = [
  {
    label: "Features",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
  {
    label: "Use Cases",
    href: "#",
  },
];

const resources = [
  {
    label: "Blog",
    href: "#",
  },
  {
    label: "Documentation",
    href: "#",
  },
  {
    label: "Help Center",
    href: "#",
  },
];

const company = [
  {
    label: "About",
    href: "#",
  },
  {
    label: "Careers",
    href: "#",
  },
  {
    label: "Contact",
    href: "#",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white mb-4">
            <BookOpenCheck className="h-6 w-6" />
            <span className="font-bold text-xl">StudyAI</span>
          </div>
          <p>
            Making studying smarter and more efficient for students worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.label}>
                <Link
                  href={product.href}
                  className="hover:text-white transition-colors"
                >
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2">
            {resources.map((resource) => (
              <li key={resource.label}>
                <Link
                  href={resource.href}
                  className="hover:text-white transition-colors"
                >
                  {resource.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {company.map((company) => (
              <li key={company.label}>
                <Link
                  href={company.href}
                  className="hover:text-white transition-colors"
                >
                  {company.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center mt-8 border-t border-gray-800 pt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} StudyAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
