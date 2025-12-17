import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Booking Process',
    questions: [
      {
        question: 'How does the booking process work?',
        answer: 'Our booking process is simple: Browse our vehicles, submit an inquiry with your travel details, and our team will contact you within 30 minutes with a quote. Once you confirm, we finalize the booking. No online payment is required at inquiry stage.',
      },
      {
        question: 'Do I need to pay online to book?',
        answer: 'No, we do not require online payments. After submitting an inquiry, our team will discuss pricing and payment terms with you directly. We accept multiple payment methods including cash, bank transfer, and UPI.',
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 2-3 days in advance for regular trips. For peak seasons (holidays, wedding season), booking 1-2 weeks ahead is advisable to ensure vehicle availability.',
      },
      {
        question: 'Can I book for same-day travel?',
        answer: 'Yes, same-day bookings are possible subject to availability. Contact us directly via phone or WhatsApp for urgent requirements.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'How is the rental price calculated?',
        answer: 'Pricing depends on vehicle type, travel duration, distance, and route. We provide all-inclusive quotes that cover driver charges, fuel, and tolls. There are no hidden charges.',
      },
      {
        question: 'Is there a minimum booking duration?',
        answer: 'The minimum booking is typically 8 hours or 80 km per day, whichever is higher. This may vary for outstation trips.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept cash, bank transfers (NEFT/RTGS/IMPS), UPI, and cheques. A partial advance may be required to confirm the booking.',
      },
      {
        question: 'Are there any additional charges?',
        answer: 'Our quotes are typically all-inclusive. Additional charges may apply for overtime (beyond agreed hours), extra kilometers, night halt charges for multi-day trips, and state permit fees for interstate travel.',
      },
    ],
  },
  {
    category: 'Vehicles & Drivers',
    questions: [
      {
        question: 'Are your vehicles insured?',
        answer: 'Yes, all our vehicles carry comprehensive insurance. Passengers are covered under the policy during the journey.',
      },
      {
        question: 'Do drivers have valid licenses?',
        answer: 'Absolutely. All our drivers hold valid commercial driving licenses and have years of experience. They undergo background verification and regular training.',
      },
      {
        question: 'Can I request a specific vehicle?',
        answer: 'Yes, you can request a specific vehicle when submitting your inquiry. We will do our best to accommodate your preference based on availability.',
      },
      {
        question: 'What amenities are included in AC buses?',
        answer: 'AC buses typically include air conditioning, push-back/reclining seats, music system, LCD TV, mic system, first aid kit, and charging points. Specific amenities vary by vehicle.',
      },
    ],
  },
  {
    category: 'Cancellation & Refunds',
    questions: [
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellation charges depend on how far in advance you cancel. Cancellation more than 48 hours before: Minimal charges. 24-48 hours: 25% of booking amount. Less than 24 hours: 50% charges may apply. Contact us for specific terms.',
      },
      {
        question: 'Can I modify my booking after confirmation?',
        answer: 'Yes, modifications are possible subject to vehicle availability. Please contact us as early as possible if you need to change dates, routes, or vehicle type.',
      },
      {
        question: 'How do I get a refund?',
        answer: 'If eligible for a refund, it will be processed within 5-7 business days to your original payment method. Cash advances may be refunded via bank transfer.',
      },
    ],
  },
  {
    category: 'Safety & Support',
    questions: [
      {
        question: 'What safety measures do you follow?',
        answer: 'We prioritize safety with regular vehicle maintenance, verified drivers, comprehensive insurance, GPS tracking (on request), first aid kits, and 24/7 support during your journey.',
      },
      {
        question: 'What if there is a breakdown during the trip?',
        answer: 'In case of any breakdown, our 24/7 support team will arrange for immediate assistance. We will either fix the issue or provide a replacement vehicle to ensure your journey continues smoothly.',
      },
      {
        question: 'How can I contact you during my trip?',
        answer: 'You can reach our support team 24/7 via phone or WhatsApp. Emergency contact numbers will be provided at the time of booking.',
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Find answers to common questions about our services, booking process, and policies.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {section.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${section.category}-${index}`}
                      className="border border-border rounded-xl px-6 data-[state=open]:bg-muted/50"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium text-foreground">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="max-w-2xl mx-auto mt-16 p-8 rounded-2xl bg-primary text-primary-foreground text-center">
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-primary-foreground/80 mb-6">
              Our team is ready to help you with any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Contact Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="lg">
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
