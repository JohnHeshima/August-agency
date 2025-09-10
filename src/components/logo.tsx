import Link from 'next/link';
import { cn } from '@/lib/utils';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("h-8 w-8", className)}
  >
    <path d="M12.17,2.008,22.29,20.5H2.05L12.17,2.008M12.17,4,4.5,18.5h15.34L12.17,4Z" />
    <path d="M8.25 15h7.5" stroke="hsl(var(--background))" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);


export default function Logo({ showText = true }: { showText?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="text-primary transition-transform duration-300 group-hover:scale-110">
        <LogoIcon />
      </div>
      {showText && (
        <div className="flex flex-col">
            <span className="text-2xl font-bold font-headline leading-none text-primary">AGUST</span>
            <span className="text-xs font-medium tracking-widest text-muted-foreground leading-none mt-0.5">COMPANY AGENCY</span>
        </div>
      )}
    </Link>
  );
}
