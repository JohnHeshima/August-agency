import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

export function generateStaticParams() {
  return newsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = newsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === post.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative h-[50vh] w-full">
            {image && (
                <Image
                  src={image.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                  priority
                />
            )}
           <div className="absolute inset-0 bg-black/60" />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">{post.title}</h1>
            <div className="flex items-center gap-2 mt-4 text-lg text-slate-200">
                <Calendar className="h-5 w-5" />
                <time dateTime={post.date}>{post.date}</time>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button asChild variant="outline">
                            <Link href="/blog" className="inline-flex items-center gap-2">
                                <ArrowLeft size={16} />
                                Retour aux actualités
                            </Link>
                        </Button>
                    </div>

                    <Card className="bg-card border-border/50">
                        <CardContent className="p-8">
                             <div className="prose prose-invert max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
                                <p className="text-lg leading-relaxed">{post.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
