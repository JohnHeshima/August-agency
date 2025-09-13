'use server';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase-admin/firestore';
import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { z } from 'zod';

// This is a server-only file. The client will never see this.
// IMPORTANT: You must generate a service account key in your Firebase project settings
// and place it in a .env.local file as GOOGLE_APPLICATION_CREDENTIALS_JSON.
// GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type": "service_account", ...}'

try {
  // Initialize Firebase Admin SDK
  if (!getApps().length) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      // This fallback is for environments where the env var might not be set,
      // but it won't work on a deployed server without credentials.
      // It's a safeguard for local development but the env var is the correct method.
      console.warn("GOOGLE_APPLICATION_CREDENTIALS_JSON is not set. Firebase Admin SDK might not be initialized correctly.");
      initializeApp();
    }
  }
} catch (error: any) {
  console.error("Firebase Admin initialization error:", error.message);
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof formSchema>;

export async function submitContactForm(data: ContactFormData) {
  // Ensure the Admin SDK is initialized before trying to use it.
  if (!getApps().length) {
    const errorMsg = "Firebase Admin SDK is not initialized. Make sure GOOGLE_APPLICATION_CREDENTIALS_JSON is set in your environment variables.";
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    // This provides detailed validation errors to the server console for debugging
    console.error('Form validation failed:', validation.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid form data.' };
  }

  try {
    const db = getFirestore();
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
    // Return a more generic error message to the client for security.
    return { success: false, error: "Could not submit the form. Please try again later." };
  }
}
