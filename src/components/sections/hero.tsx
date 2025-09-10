'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay"

export default function Hero() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-screen w-full">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority={image.id === 'hero-1'}
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 border-white/20" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 border-white/20" />
      </Carousel>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-tight tracking-tighter">
          AGUST COMPANY AGENCY
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-light text-slate-200 max-w-3xl">
          L’expertise au service de vos ambitions
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="#contact" onClick={handleScrollToContact}>
            Contactez-nous
          </Link>
        </Button>
      </div>
    </section>
  );
}
