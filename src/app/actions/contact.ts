'use server';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { z } from 'zod';

// This is a server-only file. The client will never see this.
// IMPORTANT: You must generate a service account key in your Firebase project settings
// and place it in a .env.local file.
// GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type": "service_account", ...}'

try {
  if (!getApps().length) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
        // Fallback for local development if GOOGLE_APPLICATION_CREDENTIALS_JSON is not set
        // This will have limited permissions compared to a service account.
        // For production, always use a service account.
        console.warn("Service account credentials not found. Initializing with default app for local dev.");
        // This part won't work on a deployed server without credentials.
        // The original firebase-config is for client-side, we need admin for server.
        // Let's assume for now the user needs to set up the env var.
    }
  }
} catch (error: any) {
  console.error("Firebase Admin initialization error:", error.message);
}


const db = getFirestore();

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof formSchema>;

export async function submitContactForm(data: ContactFormData) {
  if (!getApps().length) {
    const errorMsg = "Firebase Admin SDK is not initialized. Make sure GOOGLE_APPLICATION_CREDENTIALS_JSON is set in your environment variables.";
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: 'Invalid form data.' };
  }

  try {
    await addDoc(collection(db, 'contacts'), {
      ...validation.data,
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    let errorMessage = 'An unknown error occurred while writing to Firestore.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error("Firestore write error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
