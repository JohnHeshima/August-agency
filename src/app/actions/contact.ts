'use server';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { z } from 'zod';

// IMPORTANT: You must generate a service account key in your Firebase project settings
// and place it in a .env.local file as GOOGLE_APPLICATION_CREDENTIALS_JSON.
// GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type": "service_account", ...}'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  office: z.string(),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof formSchema>;

export async function submitContactForm(data: ContactFormData) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    console.error('Form validation failed:', validation.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid form data. Please check the fields and try again.' };
  }

  try {
    const serviceAccountString = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
    if (!serviceAccountString) {
      console.error("Firebase Admin initialization error: GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable is not set.");
      return { success: false, error: "La configuration du serveur est incomplète. Les identifiants de l'application ne sont pas définis." };
    }

    if (!getApps().length) {
      const serviceAccount = JSON.parse(serviceAccountString);
      initializeApp({
        credential: cert(serviceAccount),
      });
    }
  } catch (error: any) {
    console.error("Firebase Admin initialization error:", error.message);
    return { success: false, error: "Could not connect to the database. Please check server configuration." };
  }
  
  try {
    const db = getFirestore();
    await addDoc(collection(db, 'contacts'), {
      ...validation.data,
      createdAt: Timestamp.now(),
    });
    return { success: true, message: "Form submitted successfully." };
  } catch (error) {
    let errorMessage = 'An unknown error occurred while writing to Firestore.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error("Firestore write error:", errorMessage);
    return { success: false, error: "Could not submit the form. Please try again later." };
  }
}
