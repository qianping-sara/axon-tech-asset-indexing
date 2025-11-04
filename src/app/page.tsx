import Header from '@/components/layout/Header';
import SearchBlock from '@/components/home/SearchBlock';
import SolutionIntro from '@/components/home/SolutionIntro';
import FourPillars from '@/components/home/FourPillars';

export const metadata = {
  title: 'Axon - Asset Golden Index',
  description: 'Discover and explore all your technical assets in one place',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchBlock />
      <SolutionIntro />
      <FourPillars />
    </div>
  );
}
