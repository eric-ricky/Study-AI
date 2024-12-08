import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <BookOpenCheck className="h-6 w-6 text-indigo-600" />
      <span className="font-bold text-xl">StudyAI</span>
    </Link>
  );
};

export default Logo;
