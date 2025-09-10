'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#about', label: 'Qui sommes-nous ?' },
  { href: '#services', label: 'Services' },
  { href: '#commitments', label: 'Engagements' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold font-headline text-primary">
          AGUST
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
           <Button asChild size="sm">
            <Link href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contactez-nous</Link>
          </Button>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu could be implemented here */}
        </div>
      </div>
    </header>
  );
}
