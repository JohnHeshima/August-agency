'use server';

import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase-config';
import { z } from 'zod';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

type ContactFormData = z.infer<typeof formSchema>;

export async function submitContactForm(data: ContactFormData) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  try {
    await addDoc(collection(db, 'contacts'), {
      ...validation.data,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
