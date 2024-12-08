import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Your AI Study Partner
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your study materials into interactive learning experiences.
          Upload your notes and let AI help you master your subjects faster.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            size={"lg"}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors"
            asChild
          >
            <Link href={"/dashboard"}>Start Learning</Link>
          </Button>
          <Button
            size={"lg"}
            className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Link href={"/dashboard"}>Watch Demo</Link>
          </Button>
        </div>

        <div className="relative mt-16 rounded-xl shadow-lg max-w-4xl mx-auto w-full h-[300px] md:h-[500px]">
          <Image
            src="/images/students1.webp?auto=format&fit=crop&q=80"
            alt="Students studying"
            fill
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};
