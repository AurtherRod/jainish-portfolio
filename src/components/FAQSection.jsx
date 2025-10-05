import { faqData } from '../data/faqData';
import { generateFAQSchema } from '../utils/seoUtils';
import StructuredData from './StructuredData';

const FAQSection = () => {
  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      <StructuredData data={faqSchema} />
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-semibold cursor-pointer text-lg">{faq.question}</summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
