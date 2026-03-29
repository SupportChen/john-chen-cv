'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DOMAINS = [
  { id: 'building', name: '智能建筑科技产品研发', en: 'Building Tech R&D' },
  { id: 'research', name: '战略策划与科研', en: 'Strategic Research' },
  { id: 'management', name: '运营管理', en: 'Agile Management' }
];

export default function ResumePage({ skills, awardCounts }: { skills: any[], awardCounts: any }) {
  const [activeNode, setActiveNode] = useState<any | null>(null);

  const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

  const summaryAwards = [
    { id: 'intl', zh: '国际级', en: 'International', count: awardCounts?.intl?.toString().padStart(2, '0') || '00' },
    { id: 'national', zh: '国家级', en: 'National', count: awardCounts?.national?.toString().padStart(2, '0') || '00' },
    { id: 'provincial', zh: '省部级', en: 'Provincial', count: awardCounts?.provincial?.toString().padStart(2, '0') || '00' },
    { id: 'city', zh: '市厅级', en: 'City-Level', count: awardCounts?.city?.toString().padStart(2, '0') || '00' }
  ];

  return (
    <div className="flex-grow flex flex-col items-center p-6 md:p-12 relative min-h-[100dvh] overflow-y-auto pt-32 md:pt-40 pb-40">
      {/* 顶部个人名片区域 - Apple 风格大圆角卡片 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="mb-16 w-full max-w-6xl glass rounded-[48px] overflow-hidden shadow-3xl flex flex-col lg:flex-row border border-white/10"
      >
        {/* 照片核心区 - 黑白变彩色 */}
        <div className="lg:w-1/4 aspect-[4/5] relative overflow-hidden group cursor-pointer border-r border-white/5">
          <Image
            src="/profile-v2.jpg"
            alt="John Chen"
            fill
            className="object-cover transition-all duration-[1.5s] ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-klein shadow-[0_0_8px_rgba(0,47,167,0.8)]" />
            <span className="text-[10px] font-bold text-white tracking-widest uppercase">Visual Focus</span>
          </div>
        </div>

        {/* 身份特质模块 */}
        <div className="lg:w-1/3 p-12 flex flex-col justify-between border-r border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-klein rounded-full shadow-[0_0_8px_rgba(0,47,167,0.8)]" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-silver font-bold">Reseacher & Developer</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white mb-4 leading-none">John Chen</h1>
            <p className="text-[14px] text-silver/80 tracking-wide font-light leading-relaxed">
              数字化设计咨询 / 建筑科技研发 / 运营管理
              Rhino3D/Abaqus/Ps/AI/UE/CAD/Python

            </p>

            <div className="mt-16 group cursor-pointer inline-block">
              <span className="text-[10px] text-silver/30 uppercase tracking-[0.2em] block mb-2">Connect</span>
              <a href="mailto:cjg1850362992@gmail.com" className="text-lg font-light text-white group-hover:text-klein transition-colors underline-offset-8 decoration-white/10 decoration-1 hover:decoration-klein/50 break-all">
                cjg1850362992@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* 教育背景模块 (平权布局) */}
        <div className="lg:w-1/4 p-12 flex flex-col justify-center border-r border-white/5 bg-white/[0.01]">
          <div className="space-y-12">
            <div className="relative pl-7 border-l-2 border-klein">
              <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full bg-klein shadow-[0_0_12px_rgba(0,47,167,0.8)]" />
              <p className="text-[15px] text-white font-bold mb-1 tracking-tight">华南理工大学 (985)</p>
              <p className="text-[12px] text-silver leading-relaxed font-medium">数字建筑硕士 / 研究生在读</p>
              <p className="text-[11px] text-silver/50 tracking-widest mt-1 uppercase">2024 - 2027</p>
            </div>
            <div className="relative pl-7 border-l-2 border-klein">
              <div className="absolute left-[-6px] top-1 w-2.5 h-2.5 rounded-full bg-klein shadow-[0_0_12px_rgba(0,47,167,0.8)]" />
              <p className="text-[15px] text-white font-bold mb-1 tracking-tight">长安大学 (211)</p>
              <p className="text-[12px] text-silver leading-relaxed font-medium">建筑学学士 / 2024届毕业生</p>
              <p className="text-[11px] text-silver/50 tracking-widest mt-1 uppercase">2019 - 2024</p>
            </div>
          </div>
        </div>

        {/* 综合统计 - 动态列表 */}
        <div className="lg:w-1/6 p-10 flex flex-col justify-center bg-white/[0.03]">
          <div className="flex flex-col gap-6">
            {summaryAwards.map((award) => (
              <div key={award.id} className="flex flex-col">
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="text-[11px] font-bold text-white tracking-wider">{award.zh}</span>
                  <span className="text-xl font-bold text-klein tracking-tighter drop-shadow-[0_0_8px_rgba(0,47,167,0.3)]">{award.count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold text-silver/40 uppercase tracking-[0.2em]">{award.en}</span>
                  <div className="h-px flex-grow mx-2 bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 技能/领域三路架构 */}
      <main className="max-w-[1400px] w-full z-10 pb-40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start"
        >
          {DOMAINS.map((domain, i) => (
            <div key={domain.id} className="flex flex-col gap-10">
              <div className="flex flex-col gap-1 items-center">
                <h2 className="text-[12px] font-bold tracking-[0.3em] uppercase text-white/90">
                  {domain.name}
                </h2>
                <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-klein italic">
                  {domain.en}
                </span>
                <div className="mt-4 w-12 h-0.5 bg-gradient-to-r from-transparent via-klein to-transparent" />
              </div>

              <div className="flex flex-col gap-4">
                {skills
                  .filter(s => s.domain === domain.id)
                  .sort((a, b) => {
                    const yearA = typeof a.year === 'string' ? parseFloat(a.year) : (a.year || 0);
                    const yearB = typeof b.year === 'string' ? parseFloat(b.year) : (b.year || 0);
                    return yearB - yearA;
                  })
                  .map((skill, j) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ y: -6, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: i * 0.1 + j * 0.08 + 0.5,
                        ...springConfig
                      }}
                      className={`relative p-6 rounded-[28px] border transition-all duration-500 cursor-pointer group overflow-hidden ${activeNode?._id === skill._id
                        ? 'border-klein bg-klein/10 shadow-[0_8px_40px_rgba(0,47,167,0.2)]'
                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20'
                        }`}
                      onClick={() => setActiveNode(skill)}
                    >
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-klein transition-transform duration-500 scale-y-0 group-hover:scale-y-100 origin-top" />
                      <div className="flex justify-between items-start mb-2 pr-2">
                        <span className="text-[10px] font-bold text-silver/40 tracking-[0.1em] group-hover:text-klein transition-colors uppercase italic">
                          {skill.year}
                        </span>
                        {skill.important && <div className="w-1.5 h-1.5 bg-klein rounded-full animate-pulse" />}
                      </div>
                      <span className="text-[15px] font-semibold tracking-tight leading-snug text-white/90 group-hover:text-white transition-colors block">
                        {skill.title}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* 详情浮层 */}
      <AnimatePresence>
        {activeNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNode(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={springConfig}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-12 sm:bottom-12 max-w-sm w-[90vw] sm:w-[440px] glass rounded-[44px] p-12 shadow-3xl z-50 border border-white/20"
            >
              <button
                onClick={() => setActiveNode(null)}
                className="absolute top-10 right-10 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-silver hover:text-white transition-all group"
              >
                <span className="text-xl group-hover:rotate-90 transition-transform">✕</span>
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-klein rounded-full shadow-[0_0_10px_rgba(0,47,167,0.6)]" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-klein font-bold uppercase tracking-[0.2em]">
                    {DOMAINS.find(d => d.id === activeNode.domain)?.name}
                  </span>
                  <span className="text-[8px] text-silver/40 font-bold uppercase tracking-[0.1em]">
                    {DOMAINS.find(d => d.id === activeNode.domain)?.en}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-8 leading-tight">{activeNode.title}</h3>

              <div className="h-px w-full bg-white/5 mb-8" />

              <div className="max-h-[300px] overflow-y-auto pr-3 custom-scrollbar">
                <p className="text-[14px] leading-relaxed text-silver/90 font-light whitespace-pre-wrap">{activeNode.description}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
