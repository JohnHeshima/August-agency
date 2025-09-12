'use client';

import { useEffect, useState } from 'react';
import { generateDynamicSlogan } from '@/ai/flows/dynamic-slogan-generation';
import { Skeleton } from '@/components/ui/skeleton';

export default function DynamicSlogan() {
  const [slogan, setSlogan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSlogan() {
      try {
        const result = await generateDynamicSlogan({
          companyName: 'AGUST COMPANY AGENCY',
          service: 'Transformer les défis en opportunités',
        });
        setSlogan(result.slogan);
      } catch (error) {
        console.error("Failed to generate slogan:", error);
        // Optionnel : définir un slogan par défaut en cas d'erreur
        setSlogan('L’expertise au service de vos ambitions.');
      } finally {
        setLoading(false);
      }
    }

    fetchSlogan();
  }, []);

  return (
    <div className="bg-card border border-dashed border-primary/30 p-6 rounded-lg max-w-3xl mx-auto">
      <h3 className="text-center text-2xl font-headline font-semibold text-primary italic">
        {loading ? (
          <Skeleton className="h-8 w-3/4 mx-auto" />
        ) : (
          slogan ? `« ${slogan} »` : <Skeleton className="h-8 w-3/4 mx-auto" />
        )}
      </h3>
    </div>
  );
}
