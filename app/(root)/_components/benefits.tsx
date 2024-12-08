export const BenefitsSection = () => {
  return (
    <section
      id="benefits"
      className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-16">Why Students Love StudyAI</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-4xl font-bold text-indigo-600 mb-4">85%</h3>
            <p className="text-gray-600">Improvement in study efficiency</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600 mb-4">3.2hrs</h3>
            <p className="text-gray-600">Saved per study session</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-indigo-600 mb-4">92%</h3>
            <p className="text-gray-600">Student satisfaction rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};
