import 'dotenv/config';
import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error('❌ 缺少 SANITY_API_TOKEN 环境变量，请复制 .env.example 为 .env 并填写 Token');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lgflefat',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-28',
  token,
  useCdn: false,
});

const skillsData = [
  {
    _type: 'portfolio',
    title: '华工建筑设计研究院 - 数字化设计咨询',
    year: 2025,
    category: 'skill',
    domain: 'building',
    role: '数字化设计咨询 / 成员',
    description: '• 数字化设计：参与海南旅游公路基础设施咨询设计，采用参数化可变建模完成建筑节点数字化深化，迭代优化方案、提升设计效率；搭建标准化 AI 绘图工作流，高效输出合规方案成果，保障项目院士专项汇报顺利落地。\n• 壳体结构研究：参与双层异形壳体建造科研项目，针对非完整边界壳体的设计难点开展研究，搭建了数字化建模与迭代优化工作流；结合结构受力特性及实际使用功能，对壳体开洞区域进行仿真分析与构型改良，完成高性能优化设计。',
  },
  {
    _type: 'portfolio',
    title: '中国建筑设计研究院 - 建筑科技产品研发',
    year: 2023,
    category: 'skill',
    domain: 'building',
    role: '建筑科技产品研发实习生',
    description: '• 建筑数字化算法研发与落地应用：针对大剧院场芯手工建模效率低、参数耦合复杂的行业痛点，参与克拉玛依演艺中心投标专项；运用交互式编程工具独立研发剧院智能生成算法，打造建筑科技产品，快速输出场芯规模方案及声、光、视线多维技术分析；将成果复用至乾县剧院改造项目并推进市场化推广，实现产品稳定创收，解决观演建筑设计痛点。',
  },
  {
    _type: 'portfolio',
    title: '省级大学生创新创业项目-项目主持人',
    year: 2022,
    category: 'skill',
    domain: 'building',
    role: '项目负责人',
    description: '• 建筑算法科研：主导基于波函数塌缩算法的建筑布局生成研究；引入强化学习与 Agent 智能体优化原有算法，攻克传统模型应用短板；依托课题完成两篇论文摘要收录，衍生设计成果新获多项国家级、省部级专业奖项。',
  },
  {
    _type: 'portfolio',
    title: '广东建科创新技术研究院 - 战略规划与科研',
    year: 2025,
    category: 'skill',
    domain: 'research',
    role: '集团战略规划与科研咨询 / 实习生',
    description: '• 数字化规划编制：协助起草集团“十五五”数字化发展规划方案，对标行业标杆并衔接集团“十四五”规划，系统梳理行业形势与子公司数字化应用现状；搭建涵盖战略定位、核心目标、重点方向、实施路径及风险保障的完整规划体系。\n• 团体标准编制与建筑科研咨询：参与“好房子”团体标准申报及修订工作，通过搜集梳理行业相关标准数据，协助完成标准形式审查与润色优化，并优化团体标准服务方案文本、绘制标准编制流程图；同时围绕建筑综合能源系统优化方向完成综述型科研论文撰写。',
  },
  {
    _type: 'portfolio',
    title: '大湾区绿色建筑科技产品研发 -负责人',
    year: 2026,
    category: 'skill',
    domain: 'research',
    role: '负责人 / 科研助理',
    description: '• 性能优化实践：针对高密度城区与老旧小区更新，自研外立面多功能遮阳系统；集约利用空间，兼顾垂直绿化、热辐射削减与商业媒体增收；项目斩获香港绿色建筑议会、香港工程师学会专项竞赛多项奖项，验证产品创新与实用价值。',
  },
  {
    _type: 'portfolio',
    title: '网易有道信息技术 (北京) 有限公司-运营助理',
    year: 2020,
    category: 'skill',
    domain: 'management',
    role: '运营助理',
    description: '• K12 线上教育运营：负责 K12 线上教育板块运营支持，针对线上直播授课保障需求，课前配合主讲讲师完成直播设备与系统调试、直播间流量引流及突发状况应急预案处理；依托企业内部办公系统规范完成开合规校验与直播间启用操作，课后独立开展课程回放剪辑、优化及平台上架归档；保障单场课程稳定服务百余名学员，教学流程顺畅标准化运行。',
  },
  {
    _type: 'portfolio',
    title: '院校学生干部-科协科创部部长/参会汇报组长',
    year: 2024,
    category: 'skill',
    domain: 'management',
    role: '统筹负责人',
    description: '• 管理能力：曾任学生干部，协调千人余人活动，主持百余人活动，牵头团队代表校方，面向市级主管领导开展项目汇报。具备极强的跨系统、跨部门资源调度能力与敏捷项目管理经验。',
  }
];

async function updateData() {
  console.log('🚀 开始清理旧数据并导入详尽简历数据...');

  try {
    // 简单清理旧的同类数据防止重复
    await client.delete({ query: '*[_type == "portfolio" && category == "skill"]' });
    console.log('🗑️ 旧数据清理完成。');

    for (const skill of skillsData) {
      const result = await client.create(skill);
      console.log(`✅ 导入成功: ${result.title}`);
    }
    console.log('✨ 详尽简历数据导入完成！');
  } catch (err) {
    console.error('❌ 执行失败:', err.message);
  }
}

updateData();
