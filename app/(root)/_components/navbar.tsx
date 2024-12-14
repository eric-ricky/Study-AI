import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Benefits", href: "#benefits" },
  { name: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {l.name}
            </Link>
          ))}
        </div>
        <Button
          className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          asChild
        >
          <Link href="/dashboard">Try Free</Link>
        </Button>
      </div>
    </nav>
  );
};
