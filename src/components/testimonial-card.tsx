'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { summarizeTestimonial } from '@/ai/flows/client-testimonial-summarization';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type TestimonialCardProps = {
  author: string;
  company: string;
  testimonial: string;
};

export default function TestimonialCard({ author, company, testimonial }: TestimonialCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeTestimonial({ testimonial });
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to summarize testimonial:', error);
      setSummary('Erreur lors du résumé.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col bg-background border-border/50">
      <CardHeader>
        <p className="text-muted-foreground italic">"{testimonial}"</p>
      </CardHeader>
      <CardContent className="flex-grow">
        {summary && (
          <Alert className="mt-4 bg-primary/5 border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary font-semibold">Résumé</AlertTitle>
            <AlertDescription className="text-foreground/80">{summary}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div>
            <p className="font-semibold text-primary">{author}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
        </div>
        <Button onClick={handleSummarize} disabled={isLoading} variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Résumé en cours...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Résumer avec l'IA
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
