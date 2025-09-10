'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import Logo from '../logo';

const navLinks = [
  { href: '#about', label: 'Qui sommes-nous ?' },
  { href: '#services', label: 'Services' },
  { href: '#commitments', label: 'Engagements' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10);
      };
      handleScroll(); // Set initial state
    }
  }, [isMounted]);


  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const baseHeaderClass = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  const scrolledHeaderClass = 'bg-background/95 shadow-md backdrop-blur-sm';
  const transparentHeaderClass = 'bg-transparent';
  
  const headerClasses = isMounted ? cn(baseHeaderClass, scrolled ? scrolledHeaderClass : transparentHeaderClass) : cn(baseHeaderClass, transparentHeaderClass);

  return (
    <header className={headerClasses}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
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
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contactez-nous</Link>
          </Button>
        </nav>
        <div className="flex items-center md:hidden">
           <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full p-4">
                 <div className="mb-8">
                    <Logo />
                 </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleScrollTo(e, link.href)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-8">
                  <Link href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contactez-nous</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
