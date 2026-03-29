import { client } from '@/lib/sanity';
import AwardsContent from '@/components/AwardsContent';

export const dynamic = 'force-dynamic';

export default async function AwardsPage() {
  const awards = await client.fetch(`*[_type == "portfolio" && category == "award"] | order(year desc) {
    _id,
    title,
    year,
    domain,
    media
  }`);

  return <AwardsContent awards={awards} />;
}
