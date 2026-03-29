import { client } from '@/lib/sanity';
import ResumeContent from '@/components/ResumeContent';

export const dynamic = 'force-dynamic';

async function getSkills() {
  const query = `*[_type == "portfolio" && category == "skill"] {
    _id,
    title,
    year,
    domain,
    description
  }`;
  return await client.fetch(query);
}

export default async function Page() {
  const skills = await getSkills();
  
  // 兜底 Mock 数据，如果 Sanity 为空
  const finalSkills = skills.length > 0 ? skills : [
    { _id: '1', domain: 'building', title: '参数化建模', year: 2024, description: '初始化中...' },
    { _id: '2', domain: 'research', title: '城市计算', year: 2024, description: '等待 Sanity 数据接入' },
    { _id: '3', domain: 'management', title: '敏捷管理', year: 2024, description: '请在 CMS 后台添加' }
  ];

  return <ResumeContent skills={finalSkills} />;
}
