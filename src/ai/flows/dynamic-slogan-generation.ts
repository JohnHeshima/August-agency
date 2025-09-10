// src/ai/flows/dynamic-slogan-generation.ts
'use server';

/**
 * @fileOverview Generates dynamic slogans based on company services and values.
 *
 * - generateDynamicSlogan - A function that generates a dynamic slogan.
 * - DynamicSloganInput - The input type for the generateDynamicSlogan function.
 * - DynamicSloganOutput - The return type for the generateDynamicSlogan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicSloganInputSchema = z.object({
  service: z
    .string()
    .describe('The specific service or value to generate a slogan for.'),
  companyName: z.string().describe('The name of the company.'),
});
export type DynamicSloganInput = z.infer<typeof DynamicSloganInputSchema>;

const DynamicSloganOutputSchema = z.object({
  slogan: z.string().describe('The dynamically generated slogan.'),
});
export type DynamicSloganOutput = z.infer<typeof DynamicSloganOutputSchema>;

export async function generateDynamicSlogan(input: DynamicSloganInput): Promise<DynamicSloganOutput> {
  return dynamicSloganFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicSloganPrompt',
  input: {schema: DynamicSloganInputSchema},
  output: {schema: DynamicSloganOutputSchema},
  prompt: `You are a marketing expert for {{companyName}}, tasked with creating engaging slogans.

  Generate a slogan that reflects the following service or value: {{service}}.
  The slogan should be concise, memorable, and inspire confidence and trust.
  The slogan should be no more than 10 words long.
  Do not add any quotation marks to the slogan.
  `,
});

const dynamicSloganFlow = ai.defineFlow(
  {
    name: 'dynamicSloganFlow',
    inputSchema: DynamicSloganInputSchema,
    outputSchema: DynamicSloganOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
