'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Resume', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Awards', path: '/awards' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center text-xs uppercase tracking-[0.2em] z-50 mix-blend-difference">
      <Link href="/" className="text-white font-mono tracking-widest hidden sm:block">
        Logic & Aesthetics
      </Link>
      <nav className="flex gap-8 w-full sm:w-auto justify-between sm:justify-end">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors duration-300 ${
              pathname === item.path 
                ? 'text-white font-bold' 
                : 'text-[#888] hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
