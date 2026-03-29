'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { name: '简历', en: 'Resume', path: '/resume' },
  { name: '项目', en: 'Portfolio', path: '/portfolio' },
  { name: '荣誉', en: 'Awards', path: '/awards' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-16 md:py-8 lg:px-24">
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex items-center justify-between"
      >
        {/* 左侧 Logo 区 */}
        <div className="flex items-center gap-12">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-10 h-10 bg-klein rounded-xl flex items-center justify-center text-[11px] font-bold text-white transition-all group-hover:shadow-[0_0_20px_rgba(0,47,167,0.6)]">JC</div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[12px] font-bold text-white tracking-widest uppercase mb-0.5">John Chen</span>
              <span className="text-[9px] font-bold text-silver/40 tracking-[0.2em] uppercase">DIGITAL CREATOR</span>
            </div>
          </Link>

          {/* 导航主菜单 - 重新排序为：简历, 项目, 荣誉 */}
          <div className="flex items-center gap-2 md:gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group relative px-6 py-2 transition-all duration-500`}
                >
                  <div className="flex flex-col items-center">
                    <span className={`text-[14px] font-bold tracking-tight mb-0.5 ${isActive ? 'text-white' : 'text-silver/50 group-hover:text-white'}`}>
                      {item.name}
                    </span>
                    <span className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${isActive ? 'text-klein opacity-100' : 'text-silver/20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0.5'}`}>
                      {item.en}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-klein rounded-full shadow-[0_0_10px_rgba(0,47,167,1)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 右侧深化后的 Status 区 */}
        <div className="flex items-center gap-10">
          <div className="hidden lg:flex flex-col items-end gap-1">
             <span className="text-[9px] font-bold text-silver/30 tracking-[0.3em] uppercase leading-none">Geo_Context</span>
             <span className="text-[11px] font-bold text-white/80 tracking-widest uppercase leading-none">Guangzhou, CN</span>
          </div>

          <div className="h-8 w-px bg-white/5 mx-2" />

          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-silver/40 tracking-[0.2em] uppercase mb-2">Live Status</span>
            <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10 group cursor-default">
              <div className="relative">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-400 animate-ping opacity-40" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest leading-none mb-0.5">Open to Connect</span>
                <span className="text-[8px] font-bold text-silver/30 uppercase tracking-widest leading-none">Research Focus</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
