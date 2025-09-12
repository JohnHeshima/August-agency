import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const newsData = [
  {
    id: 1,
    title: 'Participation à la DRC Mining Week 2024',
    date: '12 Juin 2024',
    description: 'AGUST a marqué sa présence à la DRC Mining Week, renforçant ses partenariats et explorant de nouvelles synergies dans le secteur minier. Notre stand a attiré de nombreux visiteurs, et nous avons eu des discussions fructueuses avec des leaders de l\'industrie. Cet événement a été une plateforme clé pour présenter nos innovations en matière de logistique et de sous-traitance.',
    imageId: 'news-1',
    slug: 'drc-mining-week-2024'
  },
  {
    id: 2,
    title: 'Lancement de notre programme de formation communautaire',
    date: '25 Mai 2024',
    description: 'Nous sommes fiers d\'annoncer le lancement de nos initiatives de formation pour les jeunes talents des communautés locales à Kolwezi. Ce programme vise à doter les jeunes de compétences techniques et managériales pour améliorer leur employabilité et contribuer au développement économique local. Les premières sessions ont été un grand succès.',
    imageId: 'news-2',
    slug: 'programme-formation-communautaire'
  },
  {
    id: 3,
    title: 'Acquisition de nouveaux équipements de transport',
    date: '02 Avril 2024',
    description: 'Afin de mieux servir nos clients, nous avons investi dans une nouvelle flotte de camions et d\'équipements de levage. Cet investissement majeur va nous permettre d\'augmenter notre capacité opérationnelle, de réduire les délais de livraison et d\'améliorer encore la fiabilité de notre chaîne logistique, au bénéfice de tous nos partenaires.',
    imageId: 'news-3',
    slug: 'acquisition-nouveaux-equipements'
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-32 lg:py-40 bg-card">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-primary">Actualités</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Restez informé des dernières nouvelles, des événements et des réalisations d'AGUST Company Agency.
                </p>
            </div>
        </section>

        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData.map((item) => {
                        const image = PlaceHolderImages.find(img => img.id === item.imageId);
                        return (
                        <Card key={item.id} className="bg-background border-border/50 flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                            {image && (
                                <div className="relative h-56 w-full overflow-hidden">
                                    <Image
                                        src={image.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        data-ai-hint={image.imageHint}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                            <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={item.date}>{item.date}</time>
                            </div>
                            <h3 className="text-xl font-semibold mt-2 text-foreground">{item.title}</h3>
                            </CardHeader>
                            <CardContent className="flex-grow">
                            <p className="text-muted-foreground line-clamp-3">{item.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="link" className="p-0 h-auto text-primary">
                                    <Link href={`/blog/${item.slug}`}>
                                        Lire la suite
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        );
                    })}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
