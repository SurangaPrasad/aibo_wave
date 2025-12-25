export default function FAQ() {
  const faqs = [
    {
      question: "What is the membership fee?",
      answer: "Membership fees vary by tier: Supporter (€30-50/year), Regular Member (€80-120/year), and Founding Member (€150-250/year). All fees go directly to supporting local events and community activities."
    },
    {
      question: "When is the inaugural Silent Echo event?",
      answer: "The inaugural event is on January 2, 2026, in Oulu, Finland, focusing on the Sri Lankan community. Additional cities and cultural communities will follow throughout 2026 and beyond."
    },
    {
      question: "Do I need to speak the community's language?",
      answer: "While each event is conducted primarily in the community's native language, we welcome people from all backgrounds. Some events may include translation or multilingual elements depending on the community."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {faq.question}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
