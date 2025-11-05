import Header from '@/components/layout/Header';
import SearchBlock from '@/components/search/SearchBlock';
import SolutionWithPillars from '@/components/home/SolutionWithPillars';
import CategoryGrid from '@/components/home/CategoryGrid';

export const metadata = {
  title: 'Axon - Asset Golden Index',
  description: 'Discover and explore all your technical assets in one place',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchBlock />
      <SolutionWithPillars />
      <CategoryGrid />
    </div>
  );
}
