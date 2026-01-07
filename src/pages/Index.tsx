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

const Index = () => {
  return (
    <Layout>
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
