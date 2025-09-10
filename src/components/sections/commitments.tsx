import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Gem, TrendingUp, HeartHandshake } from 'lucide-react';

const commitmentsData = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Fiabilité',
    description: 'Nous respectons nos promesses avec une rigueur et une ponctualité sans faille.',
  },
  {
    icon: <Gem className="h-10 w-10 text-primary" />,
    title: 'Expertise',
    description: 'Notre savoir-faire pointu garantit des solutions innovantes et conformes aux normes les plus exigeantes.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: 'Performance',
    description: 'Nous visons l’excellence opérationnelle pour maximiser votre efficacité et votre rentabilité.',
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Confiance',
    description: 'Nous bâtissons des relations durables basées sur la transparence, l’intégrité et le respect mutuel.',
  },
];

export default function Commitments() {
  return (
    <section id="commitments" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Nos Engagements</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Les quatre piliers qui fondent notre excellence et guident chacune de nos actions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitmentsData.map((commitment) => (
            <Card key={commitment.title} className="bg-card border-border/50 text-center p-6">
              <CardHeader className="items-center p-0">
                <div className="mb-4">{commitment.icon}</div>
                <CardTitle className="text-2xl font-semibold">{commitment.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground">{commitment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
