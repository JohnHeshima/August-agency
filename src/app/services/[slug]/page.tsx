import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck, Handshake, BarChart3, Megaphone, GraduationCap, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const servicesData = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Logistique & Transport',
    description: 'Gestion optimisée de la chaîne d’approvisionnement, du transport local à l’international, pour garantir la ponctualité et la sécurité de vos biens.',
    longDescription: 'Notre service de logistique et transport est le pilier de votre chaîne d\'approvisionnement. Nous offrons des solutions complètes qui couvrent le transport routier, maritime et aérien. Grâce à notre expertise locale et notre réseau international, nous assurons une gestion de fret efficace, un dédouanement rapide et un suivi en temps réel de vos marchandises. Nous nous engageons à livrer vos biens en toute sécurité et dans les délais impartis, vous permettant de vous concentrer sur votre cœur de métier.',
    imageId: 'service-logistics',
    slug: 'logistique-et-transport',
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Négociation & Intermédiation',
    description: 'Facilitation des accords commerciaux et partenariats stratégiques. Nous représentons vos intérêts avec expertise pour des résultats mutuellement bénéfiques.',
    longDescription: 'Dans un environnement commercial complexe, notre service de négociation et d\'intermédiation est votre meilleur allié. Nous facilitons les discussions, élaborons des stratégies de négociation et agissons comme médiateur pour conclure des accords avantageux. Que ce soit pour des contrats d\'approvisionnement, des partenariats stratégiques ou des joint-ventures, notre équipe défend vos intérêts avec intégrité et professionnalisme pour garantir des résultats gagnant-gagnant.',
    imageId: 'service-negotiation',
    slug: 'negociation-et-intermediation',
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: 'Comptabilité & Stratégie',
    description: 'Services comptables complets et conseils stratégiques pour optimiser votre performance financière, assurer la conformité et piloter votre croissance.',
    longDescription: 'Notre expertise en comptabilité et stratégie financière vous offre une vision claire de votre santé économique. Nous proposons des services de tenue de livres, de reporting financier, d\'audit interne et de planification fiscale. Au-delà des chiffres, nous vous fournissons des analyses stratégiques pour optimiser vos coûts, améliorer votre rentabilité et soutenir vos décisions d\'investissement. Assurez la conformité réglementaire et pilotez votre croissance avec confiance.',
    imageId: 'service-accounting',
    slug: 'comptabilite-et-strategie',
  },
  {
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    title: 'Communication professionnelle',
    description: 'Élaboration de stratégies de communication percutantes pour renforcer votre image de marque, gérer votre réputation et engager vos parties prenantes.',
    longDescription: 'Une communication efficace est essentielle pour bâtir une marque forte et une réputation solide. Notre équipe de communication élabore des stratégies sur mesure qui incluent les relations publiques, la communication interne, la gestion de crise et le marketing de contenu. Nous vous aidons à transmettre votre message de manière claire et cohérente à vos clients, employés, investisseurs et à la communauté, renforçant ainsi votre positionnement sur le marché.',
    imageId: 'service-communication',
    slug: 'communication-professionnelle',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Formation',
    description: 'Programmes de formation sur mesure pour développer les compétences de vos équipes dans les domaines techniques, managériaux et de la sécurité.',
    longDescription: 'Investir dans les compétences de vos employés est la clé du succès durable. Nous concevons et animons des programmes de formation personnalisés qui répondent aux besoins spécifiques de votre secteur. Nos formations couvrent un large éventail de sujets, incluant les compétences techniques minières, le leadership, la gestion de projet, la santé et la sécurité au travail. Renforcez les capacités de vos équipes et favorisez une culture d\'excellence et d\'amélioration continue.',
    imageId: 'service-training',
    slug: 'formation',
  },
];

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === service.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] w-full">
            {image && (
                <Image
                  src={image.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority
                />
            )}
           <div className="absolute inset-0 bg-black/60" />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">{service.title}</h1>
          </div>
        </section>

        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button asChild variant="outline">
                            <Link href="/#services" className="inline-flex items-center gap-2">
                                <ArrowLeft size={16} />
                                Retour aux services
                            </Link>
                        </Button>
                    </div>

                    <Card className="bg-card border-border/50">
                        <CardContent className="p-8">
                             <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                                <p className="text-lg leading-relaxed">{service.longDescription}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="text-center mt-12">
                        <h3 className="text-2xl font-semibold mb-6">Prêt à démarrer un projet avec nous ?</h3>
                        <Button asChild size="lg">
                            <Link href="/#contact">Contactez-nous</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
