import Logo from "@/components/brand/logo";

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#benefits"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Benefits
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </a>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
          Try Free
        </button>
      </div>
    </nav>
  );
};
