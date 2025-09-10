import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Truck, Handshake, BarChart3, Megaphone, GraduationCap } from 'lucide-react';

const servicesData = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Logistique & Transport',
    description: 'Gestion optimisée de la chaîne d’approvisionnement, du transport local à l’international, pour garantir la ponctualité et la sécurité de vos biens.',
    imageId: 'service-logistics',
    slug: 'logistique-et-transport',
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Négociation & Intermédiation',
    description: 'Facilitation des accords commerciaux et partenariats stratégiques. Nous représentons vos intérêts avec expertise pour des résultats mutuellement bénéfiques.',
    imageId: 'service-negotiation',
    slug: 'negociation-et-intermediation',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Comptabilité & Stratégie',
    description: 'Services comptables complets et conseils stratégiques pour optimiser votre performance financière, assurer la conformité et piloter votre croissance.',
    imageId: 'service-accounting',
    slug: 'comptabilite-et-strategie',
  },
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'Communication professionnelle',
    description: 'Élaboration de stratégies de communication percutantes pour renforcer votre image de marque, gérer votre réputation et engager vos parties prenantes.',
    imageId: 'service-communication',
    slug: 'communication-professionnelle',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Formation',
    description: 'Programmes de formation sur mesure pour développer les compétences de vos équipes dans les domaines techniques, managériaux et de la sécurité.',
    imageId: 'service-training',
    slug: 'formation',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Une gamme complète de solutions pour accompagner votre succès.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]">
          {servicesData.map((service) => {
            const image = PlaceHolderImages.find(img => img.id === service.imageId);
            return (
              <Link key={service.title} href={`/services/${service.slug}`} className="group block">
                <Card className="overflow-hidden bg-background border-border/50 h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(4deg)] group-hover:shadow-2xl group-hover:shadow-primary/20">
                  <div className="transition-all duration-500 [transform:translateZ(40px)]">
                    {image && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={image.imageHint}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        {service.icon}
                        <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
