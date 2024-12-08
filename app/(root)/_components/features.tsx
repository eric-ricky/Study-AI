import {
  BookOpenCheck,
  Brain,
  MessageSquare,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { Feature } from "./feature";

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Transform Your Study Experience
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={Brain}
            title="Smart Summaries"
            description="Get instant, comprehensive summaries of your study materials using advanced AI technology."
          />
          <Feature
            icon={MessageSquare}
            title="Interactive Q&A"
            description="Engage in meaningful discussions with AI about your study materials to deepen understanding."
          />
          <Feature
            icon={Sparkles}
            title="Key Insights"
            description="Automatically extract and highlight the most important concepts and takeaways."
          />
          <Feature
            icon={Zap}
            title="Quick Practice"
            description="Generate practice questions and quizzes to test your knowledge effectively."
          />
          <Feature
            icon={BookOpenCheck}
            title="Study Tracking"
            description="Monitor your progress and identify areas that need more attention."
          />
          <Feature
            icon={Trophy}
            title="Performance Analytics"
            description="Get detailed insights into your learning patterns and improvements."
          />
        </div>
      </div>
    </section>
  );
};
