import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TestimonialCard from '@/components/testimonial-card';

const testimonialsData = [
  {
    id: 1,
    author: 'Jean Dupont, Directeur des Opérations',
    company: 'Mining Corp',
    testimonial: 'La collaboration avec AGUST a été un véritable tournant pour nous. Leur expertise en logistique minière a permis de réduire nos délais de 20% et d’optimiser nos coûts de manière significative. Leur équipe est proactive, professionnelle et toujours à l’écoute de nos besoins. C’est un partenaire de confiance que je recommande vivement pour des opérations en RDC.',
  },
  {
    id: 2,
    author: 'Amina Diallo, CFO',
    company: 'Industrie Unie',
    testimonial: 'AGUST a complètement restructuré notre département comptable avec une rigueur et une vision stratégique impressionnantes. Grâce à leurs conseils, nous avons amélioré notre reporting financier et pris des décisions plus éclairées. Leur maîtrise des enjeux locaux est un atout inestimable.',
  },
  {
    id: 3,
    author: 'David Chen, Investisseur',
    company: 'Global Ventures',
    testimonial: 'En tant qu’investisseur étranger, naviguer dans le paysage économique congolais peut être complexe. L’équipe d’AGUST a été notre guide, facilitant les négociations et assurant la conformité de nos projets. Leur professionnalisme et leur réseau sont exceptionnels. Ils inspirent une grande confiance.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Ce que disent nos clients</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            La satisfaction de nos partenaires est notre meilleure récompense.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonialsData.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <TestimonialCard {...testimonial} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
