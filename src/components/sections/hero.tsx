'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';
import { cn } from '@/lib/utils';

export default function Hero() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])


  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full">
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
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

       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {heroImages.map((_, index) => (
            <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                    "h-2 w-2 rounded-full bg-white/50 transition-all duration-300",
                    current === index ? "w-4 bg-primary" : "hover:bg-white"
                )}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
      </div>
    </section>
  );
}
