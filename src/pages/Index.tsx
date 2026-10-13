import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { VehicleCategoriesSection } from '@/components/home/VehicleCategoriesSection';
import { FeaturedFleetSection } from '@/components/home/FeaturedFleetSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { LeadFormSection } from '@/components/home/LeadFormSection';
import { ListYourBusSection } from '@/components/home/ListYourBusSection';
import BlogSection from '@/components/home/BlogSection';
import { SEOHead } from '@/components/seo/SEOHead';
import { getLocalBusinessSchema, getOrganizationSchema } from '@/components/seo/schemaData';

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Bus Rental & Tempo Traveller Hire in Odisha | RentAnyBus"
        description="Book luxury AC buses, sleeper coaches & tempo travellers in Bhubaneswar, Cuttack & Puri. Best rates for pilgrimage, weddings, corporate & school tours."
        canonicalPath="/"
        jsonLd={[getOrganizationSchema(), getLocalBusinessSchema()]}
      />
      <HeroSection />
      <LeadFormSection />
      <VehicleCategoriesSection />
      <FeaturedFleetSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <BlogSection />
      <ListYourBusSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
