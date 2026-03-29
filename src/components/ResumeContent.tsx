'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DOMAINS = [
  { id: 'building', name: '智能建筑科技产品研发' },
  { id: 'research', name: '战略策划与科研' },
  { id: 'management', name: '运营管理' }
];

export default function ResumePage({ skills }: { skills: any[] }) {
  const [activeNode, setActiveNode] = useState<any | null>(null);

  return (
    <div className="flex-grow flex flex-col items-center p-8 relative min-h-[100dvh] overflow-y-auto custom-scrollbar">
      {/* 顶部个人名片区域 - 极简矩形架构 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-24 mb-16 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-px bg-[#111] border border-[#111] overflow-hidden"
      >
        {/* 照片区 */}
        <div className="lg:col-span-3 aspect-[4/5] relative bg-[#050505]">
          <Image
            src="/profile-v2.jpg"
            alt="John Chen"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
          />
        </div>

        {/* 姓名与多维身份模块 */}
        <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0a0a0a] border-r border-[#111]">
          <div>
            <h1 className="text-3xl lg:text-4xl font-light tracking-[0.15em] text-white mb-2 uppercase whitespace-nowrap">John Chen</h1>
            <span className="text-[10px] font-mono text-[#555] tracking-[0.4em] uppercase">Architecture / Research</span>

            <div className="mt-8 border-l-2 border-white pl-4 py-1">
              <span className="text-[9px] font-mono text-[#555] uppercase block mb-1 tracking-[0.3em]">Contact</span>
              <a href="mailto:cjg1850362992@gmail.com" className="text-sm font-mono text-white tracking-widest hover:text-[#ccc] transition-colors decoration-transparent focus:outline-none block w-fit">
                cjg1850362992@gmail.com
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#111] pt-6">
            <div>
              <span className="text-[9px] font-mono text-[#444] uppercase block mb-2 tracking-widest">技术栈/Tech_Stack</span>
              <ul className="text-[10px] text-[#999] tracking-widest leading-relaxed">
                <li>Rhino / Abaqus / UE</li>
                <li>PS / AI / CAD / MS Office</li>
                <li>Python / JS</li>
              </ul>
            </div>
            <div>
              <span className="text-[9px] font-mono text-[#444] uppercase block mb-2 tracking-widest">隶属/Affiliation</span>
              <ul className="text-[10px] text-[#666] tracking-widest leading-relaxed">
                <li>中国建筑学会 会员</li>
                <li>中国公路学会 会员</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 教育背景 */}
        <div className="lg:col-span-3 p-8 flex flex-col justify-center bg-[#0a0a0a] border-r border-[#111]">
          <h4 className="text-[9px] font-mono text-[#333] mb-6 tracking-[0.5em] uppercase border-b border-[#111] pb-2">Education_Archive</h4>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-[#ccc] font-light">华南理工大学 (985)</p>
              <p className="text-[9px] text-[#555] font-mono mt-1 uppercase leading-relaxed">数字建筑与建造方向硕士 / 2024 - 2027</p>
            </div>
            <div>
              <p className="text-xs text-[#ccc] font-light">长安大学 (211)</p>
              <p className="text-[9px] text-[#555] font-mono mt-1 uppercase leading-relaxed">建筑学学士 / 2019 - 2024</p>
            </div>
          </div>
        </div>

        {/* 综合荣誉统计 */}
        <div className="lg:col-span-2 p-8 flex flex-col justify-center bg-[#0a0a0a]">
          <h4 className="text-[9px] font-mono text-[#333] mb-6 tracking-[0.5em] uppercase border-b border-[#111] pb-2">荣誉 / Awards</h4>
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div className="flex flex-col">
              <span className="text-xl font-light text-white mb-1">05</span>
              <div className="flex flex-col leading-tight gap-1">
                <span className="text-xs text-[#aaa] tracking-widest">国际级</span>
                <span className="text-[8px] font-mono text-[#444] uppercase tracking-tighter">Intl.</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white mb-1">07</span>
              <div className="flex flex-col leading-tight gap-1">
                <span className="text-xs text-[#aaa] tracking-widest">国家级</span>
                <span className="text-[8px] font-mono text-[#444] uppercase tracking-tighter">Natl.</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white mb-1">04</span>
              <div className="flex flex-col leading-tight gap-1">
                <span className="text-xs text-[#aaa] tracking-widest">省部级</span>
                <span className="text-[8px] font-mono text-[#444] uppercase tracking-tighter">Prov.</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-light text-white mb-1">28</span>
              <div className="flex flex-col leading-tight gap-1">
                <span className="text-xs text-[#aaa] tracking-widest">院校级</span>
                <span className="text-[8px] font-mono text-[#444] uppercase tracking-tighter">Schl.</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-[1400px] w-full z-10 pb-32 h-full flex mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full justify-between items-start"
        >
          {DOMAINS.map((domain, i) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
              className="flex flex-col gap-8 items-center flex-1"
            >
              <h2 className="text-lg md:text-xl tracking-[0.1em] border-b border-[#333] pb-3 text-[#ccc] whitespace-nowrap font-light">
                {domain.name}
              </h2>

              <div className="flex flex-col gap-4 w-full px-2 lg:px-4">
                {skills
                  .filter(s => s.domain === domain.id)
                  .sort((a, b) => {
                    if (domain.id === 'building') {
                      const getOrder = (title: string) => {
                        if (title.includes('中国建筑设计研究院')) return 1;
                        if (title.includes('华工建筑设计研究院')) return 2;
                        if (title.includes('省级大学生创新创业项目')) return 3;
                        return 4;
                      };
                      return getOrder(a.title) - getOrder(b.title);
                    }
                    // 其他组默认按照年份最新倒排 (支持区间字符串，如 "2024-2027")
                    const yearA = typeof a.year === 'string' ? parseFloat(a.year) : (a.year || 0);
                    const yearB = typeof b.year === 'string' ? parseFloat(b.year) : (b.year || 0);
                    return yearB - yearA;
                  })
                  .map((skill, j) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{ y: -2, borderColor: '#fff' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 + j * 0.15 + 0.3 }}
                      className={`relative z-10 p-5 bg-[#050505] border ${activeNode?._id === skill._id ? 'border-[#fff] shadow-[0_0_20px_rgba(255,255,255,0.05)] bg-[#111]' : 'border-[#1a1a1a]'} cursor-pointer transition-colors duration-500 hover:bg-[#0f0f0f] w-full flex flex-col items-center text-center group`}
                      onClick={() => setActiveNode(skill)}
                    >
                      {/* 参数化修饰角 */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#555] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#555] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <span className="text-[9px] font-mono text-[#444] tracking-[0.4em] mb-2 group-hover:text-[#666] transition-colors">{skill.year}</span>
                      <span className="text-xs font-light tracking-widest leading-snug text-[#bbb] group-hover:text-white transition-colors">
                        {skill.title}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            className="fixed bottom-8 sm:bottom-auto sm:right-12 sm:top-1/2 sm:-translate-y-1/2 max-w-sm w-[90%] sm:w-full bg-[#111]/90 backdrop-blur-xl border border-[#333] p-8 shadow-2xl z-50 rounded-sm"
          >
            <button onClick={() => setActiveNode(null)} className="absolute top-4 right-4 text-xs text-[#666] hover:text-white transition-colors font-mono">[ CLOSE ]</button>
            <h3 className="text-xl md:text-2xl font-light tracking-wider mb-2">{activeNode.name}</h3>
            <p className="text-[10px] text-[#888] mb-6 uppercase tracking-[0.2em] border-b border-[#333] pb-2 inline-block">
              {DOMAINS.find(d => d.id === activeNode.domain)?.name}
            </p>
            <p className="text-sm leading-relaxed text-[#bbb] font-light">{activeNode.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
