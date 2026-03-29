'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/image';

const LEVEL_NAMES: Record<string, {zh: string, en: string}> = {
  'intl': { zh: '国际级', en: 'International' },
  'national': { zh: '国家级', en: 'National' },
  'provincial': { zh: '省部级', en: 'Provincial' },
  'city': { zh: '市厅级', en: 'City' },
  'school': { zh: '院校级', en: 'University' },
  'patent': { zh: '专利/著作', en: 'Patents' }
};

export default function AwardsContent({ awards }: { awards: any[] }) {
  const [selectedAward, setSelectedAward] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const springConfig = { type: "spring" as const, stiffness: 300, damping: 30 };

  const handleOpenModal = (award: any) => {
    setSelectedAward(award);
    setCurrentImageIndex(0);
  };

  const LEVEL_ORDER = ['intl', 'national', 'provincial', 'city', 'school', 'patent'];

  const groupedAwards = LEVEL_ORDER.map(levelKey => ({
    id: levelKey,
    name: LEVEL_NAMES[levelKey],
    items: awards.filter((a: any) => a.domain === levelKey)
  })).filter(group => group.items.length > 0);

  const uncategorizedItems = awards.filter((a: any) => !LEVEL_NAMES[a.domain]);
  if (uncategorizedItems.length > 0) {
    groupedAwards.push({
      id: 'other',
      name: { zh: '特殊项', en: 'Honors' },
      items: uncategorizedItems
    });
  }

  return (
    <div className="pt-24 min-h-screen z-10 w-full overflow-x-hidden pb-40">
      <header className="px-8 lg:px-20 py-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-1 bg-klein rounded-full" />
            <span className="text-[11px] font-bold text-klein tracking-[0.5em] uppercase">Archive_Honors</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">Awards</h2>
          <p className="text-silver/60 max-w-md text-sm font-light leading-relaxed">学术荣誉与专利成果归档，展示研究路径的各阶段成果。</p>
        </div>
        <div className="glass px-8 py-3.5 rounded-full border border-white/10 flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-silver/30 tracking-[0.2em] uppercase">Total Records</span>
            <span className="text-lg font-bold text-white tracking-widest">{awards.length}</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-klein tracking-[0.4em] uppercase">Verified</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-col gap-28 px-8 lg:px-20">
        {groupedAwards.map((group, groupIndex) => (
          <div key={group.id} className="flex flex-col w-full">
            <div className="flex items-center gap-8 mb-14">
               <div className="relative group/tag">
                  <div className="absolute -inset-2 bg-klein/10 blur-xl rounded-full opacity-60 group-hover/tag:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col items-start px-6 py-2.5 rounded-full border border-white/10 glass">
                    <span className="text-[12px] font-bold text-white tracking-[0.1em]">{group.name.zh}</span>
                    <span className="text-[8px] font-bold text-klein tracking-[0.3em] uppercase">{group.name.en}</span>
                  </div>
               </div>
               <div className="flex-grow h-px bg-gradient-to-r from-white/10 to-transparent" />
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-silver/20 tracking-[0.2em] uppercase">Quantity</span>
                  <span className="text-xs font-bold text-silver/40 tracking-widest italic">{group.items.length}_ITEMS</span>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {group.items.map((award: any, i: number) => (
                <motion.div
                  key={award._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                  className={`group flex flex-col justify-between p-10 rounded-[40px] glass border border-white/5 transition-all duration-700 hover:shadow-3xl hover:border-white/20 hover:bg-white/[0.04] ${award.media && award.media.length > 0 ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    if (award.media && award.media.length > 0) {
                      handleOpenModal(award);
                    }
                  }}
                >
                  <div>
                    <span className="text-klein font-bold text-[11px] tracking-[0.4em] mb-4 block uppercase italic drop-shadow-[0_0_8px_rgba(0,47,167,0.3)]">{award.year}</span>
                    <h3 className="text-lg font-bold tracking-tight text-white/80 leading-[1.6] group-hover:text-white transition-colors">
                      {award.title}
                    </h3>
                  </div>

                  {award.media && award.media.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center group/btn">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-silver/20 tracking-[0.2em] uppercase">Evidence</span>
                        <span className="text-[10px] font-bold text-silver group-hover:text-klein transition-colors uppercase">Scan File</span>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center bg-white/5 group-hover:bg-klein rounded-full text-white transition-all shadow-lg hover:shadow-klein/20">
                        <span className="text-xl group-hover:translate-x-0.5 transition-transform">→</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAward && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 lg:p-24 overflow-hidden">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAward(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={springConfig}
              className="relative w-full max-w-6xl h-full glass rounded-[54px] overflow-hidden flex flex-col shadow-4xl border border-white/20"
            >
              <button 
                onClick={() => setSelectedAward(null)} 
                className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-all z-50 shadow-lg"
              >
                <span className="text-2xl leading-none">✕</span>
              </button>

              <div className="h-full flex flex-col">
                {/* 图片区 */}
                <div className="flex-grow relative bg-black/40 flex items-center justify-center overflow-hidden group/img p-8 lg:p-20">
                   <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                      >
                        <Image 
                          src={urlFor(selectedAward.media[currentImageIndex]).url()} 
                          alt={selectedAward.title} 
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </motion.div>
                   </AnimatePresence>

                   {selectedAward.media.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(p => (p > 0 ? p - 1 : selectedAward.media.length - 1)); }}
                          className="absolute left-10 w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-3xl font-light transition-all opacity-0 group-hover/img:opacity-100"
                        >←</button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(p => (p + 1) % selectedAward.media.length); }}
                          className="absolute right-10 w-16 h-16 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-3xl font-light transition-all opacity-0 group-hover/img:opacity-100"
                        >→</button>
                      </>
                   )}
                </div>

                {/* 底部信息栏 */}
                <div className="p-12 lg:p-16 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-6 bg-klein rounded-full animate-glow" />
                      <span className="text-[11px] font-bold text-klein tracking-[0.4em] uppercase">Document Verified</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">{selectedAward.title}</h3>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-silver/30 uppercase tracking-[0.3em] mb-2">Award Date</span>
                      <span className="text-2xl font-bold text-white tracking-widest">{selectedAward.year}</span>
                    </div>
                    {selectedAward.media.length > 1 && (
                      <div className="glass px-6 py-3 rounded-full border border-white/10 text-[12px] font-bold text-white/60">
                         {currentImageIndex + 1} <span className="opacity-20 px-2">/</span> {selectedAward.media.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
