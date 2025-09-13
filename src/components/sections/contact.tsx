'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions/contact';


const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères.' }),
  email: z.string().email({ message: 'Adresse e-mail invalide.' }),
  subject: z.string().min(5, { message: 'Le sujet doit contenir au moins 5 caractères.' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
});

const offices = [
    { city: 'Kinshasa', address: '123 Avenue de la Révolution, Gombe', phone: '+243 81 000 0001', email: 'kinshasa@agust.com' },
    { city: 'Lubumbashi', address: '456 Avenue Lumumba, Centre-ville', phone: '+243 81 000 0002', email: 'lubumbashi@agust.com' },
    { city: 'Kolwezi', address: '789 Boulevard de l\'Indépendance, Dilala', phone: '+243 81 000 0003', email: 'kolwezi@agust.com' },
];

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitContactForm(values);

    if (result.success) {
      toast({
        title: "Message Envoyé!",
        description: "Merci de nous avoir contactés. Nous reviendrons vers vous bientôt.",
      });
      form.reset();
    } else {
      console.error("Error submitting form: ", result.error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
        variant: 'destructive'
      });
    }
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Contactez-nous</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Une question ? Un projet ? Notre équipe est à votre disposition.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Nos bureaux</h3>
            <div className="space-y-8">
              {offices.map(office => (
                <div key={office.city} className="flex gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg">{office.city}</h4>
                        <p className="text-muted-foreground">{office.address}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{office.email}</span>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Card className="bg-card border-border/50 p-6 sm:p-8">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse e-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemple.com" {...field} className="bg-background focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Demande de renseignements" {...field} className="bg-background focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Votre message..." {...field} className="min-h-[120px] bg-background focus:border-primary"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
