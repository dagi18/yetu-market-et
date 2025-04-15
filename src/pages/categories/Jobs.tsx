
import Layout from '@/components/Layout';
import ComingSoon from '@/components/ui/coming-soon';

export default function Jobs() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <ComingSoon 
          title="Jobs Section Coming Soon"
          message="We're working on bringing you the best job listings from across Ethiopia. Check back soon!"
          buttonText="Explore Other Categories"
          buttonLink="/products"
        />
      </div>
    </Layout>
  );
}
