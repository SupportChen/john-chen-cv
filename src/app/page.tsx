import { client } from '@/lib/sanity';
import ResumeContent from '@/components/ResumeContent';

export const dynamic = 'force-dynamic';

async function getSkills() {
  const query = `*[_type == "portfolio" && category == "skill"] {
    _id,
    title,
    year,
    domain,
    description,
    important
  }`;
  return await client.fetch(query);
}

async function getAwardsSummary() {
  const query = `*[_type == "portfolio" && category == "award"] {
    domain,
    "mediaCount": count(media)
  }`;
  const awards = await client.fetch(query);
  
  const summary = {
    intl: 0,
    national: 0,
    provincial: 0,
    city: 0
  };

  awards.forEach((a: any) => {
    if (a.domain in summary) {
      summary[a.domain as keyof typeof summary] += a.mediaCount || 0;
    }
  });

  return summary;
}

export default async function Page() {
  const [skills, awardCounts] = await Promise.all([
    getSkills(),
    getAwardsSummary()
  ]);
  
  const finalSkills = skills.length > 0 ? skills : [
    { _id: '1', domain: 'building', title: '参数化建模', year: 2024, description: '加载中...', important: true },
    { _id: '2', domain: 'research', title: '城市计算', year: 2024, description: '等待数据接入' },
    { _id: '3', domain: 'management', title: '敏捷管理', year: 2024, description: '请在 CMS 后台添加' }
  ];

  return <ResumeContent skills={finalSkills} awardCounts={awardCounts} />;
}
