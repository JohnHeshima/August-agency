import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Rocket, Target } from 'lucide-react';
import DynamicSlogan from '@/components/dynamic-slogan';

const aboutData = [
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Notre Mission',
    description: 'Fournir un soutien inégalé aux acteurs miniers et industriels, en garantissant l’excellence opérationnelle et la conformité à chaque étape.',
  },
  {
    icon: <Eye className="h-8 w-8 text-primary" />,
    title: 'Notre Vision',
    description: 'Devenir le partenaire de sous-traitance de référence en RDC et en Afrique, reconnu pour notre fiabilité, notre expertise et notre contribution au développement durable.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Nos Valeurs',
    description: 'Intégrité, performance, innovation et engagement client sont les piliers de toutes nos actions. Nous agissons avec responsabilité et transparence.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Qui sommes-nous ?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Partenaire stratégique des géants miniers et industriels, nous transformons les défis en opportunités.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aboutData.map((item) => (
            <Card key={item.title} className="bg-card border-border/50 text-center hover:shadow-primary/10 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">{item.icon}</div>
                <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <DynamicSlogan />
        </div>
      </div>
    </section>
  );
}
