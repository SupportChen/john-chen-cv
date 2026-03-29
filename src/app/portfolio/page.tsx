import { client } from '@/lib/sanity';
import PortfolioContent from '@/components/PortfolioContent';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const projects = await client.fetch(`*[_type == "portfolio" && category == "portfolio"] | order(year desc) {
    _id,
    title,
    year,
    role,
    description,
    githubLink,
    media
  }`);

  return <PortfolioContent projects={projects} />;
}
