import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';

const newsData = [
  {
    id: 1,
    title: 'Participation à la DRC Mining Week 2024',
    date: '12 Juin 2024',
    description: 'AGUST a marqué sa présence à la DRC Mining Week, renforçant ses partenariats et explorant de nouvelles synergies dans le secteur minier.',
    imageId: 'news-1',
    slug: 'drc-mining-week-2024'
  },
  {
    id: 2,
    title: 'Lancement de notre programme de formation communautaire',
    date: '25 Mai 2024',
    description: 'Nous sommes fiers d\'annoncer le lancement de nos initiatives de formation pour les jeunes talents des communautés locales à Kolwezi.',
    imageId: 'news-2',
    slug: 'programme-formation-communautaire'
  },
  {
    id: 3,
    title: 'Acquisition de nouveaux équipements de transport',
    date: '02 Avril 2024',
    description: 'Afin de mieux servir nos clients, nous avons investi dans une nouvelle flotte de camions, optimisant notre chaîne logistique.',
    imageId: 'news-3',
    slug: 'acquisition-nouveaux-equipements'
  },
];

export default function News() {
  return (
    <section id="news" className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos Actualités</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Suivez les derniers événements et les grandes étapes de notre entreprise.
          </p>
        </div>
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
                  <p className="text-muted-foreground">{item.description}</p>
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
        <div className="text-center mt-12">
            <Button asChild size="lg">
                <Link href="/blog">Voir toutes les actualités</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
