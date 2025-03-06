import { NextRequest, NextResponse } from 'next/server';
import { createUserProfile } from '../../../../lib/firebase/firestore';
import { auth } from '../../../../lib/firebase/firebase';
import { DecodedIdToken } from 'firebase-admin/auth';

// Initialize Firebase Admin if not already initialized
let admin: any;
let adminInitialized = false;

try {
  admin = require('firebase-admin');
  
  if (!admin.apps.length) {
    // Only try to initialize in production or if the service account key is available
    if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      try {
        const serviceAccount = JSON.parse(
          process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
        );
        
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        adminInitialized = true;
      } catch (parseError) {
        console.error('Error parsing Firebase service account:', parseError);
        // Create a stub admin for build time
        adminInitialized = false;
      }
    } else {
      // Use demoApp in development if no service account key
      console.log('Running Firebase in mock mode for development/build');
      admin.initializeApp({
        projectId: 'demo-project',
      });
      adminInitialized = false;
    }
  } else {
    adminInitialized = true;
  }
} catch (error) {
  console.error('Firebase admin initialization error:', error);
  adminInitialized = false;
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization token from the request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid token' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken: DecodedIdToken;

    // Check if Firebase Admin is properly initialized
    if (!adminInitialized) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable: Authentication service not initialized' },
        { status: 503 }
      );
    }

    try {
      // Verify the ID token
      decodedToken = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    // Get the user data from the request body
    const userData = await request.json();

    // Create the user profile in Firestore
    await createUserProfile(decodedToken.uid, {
      ...userData,
      email: decodedToken.email || userData.email,
    });

    return NextResponse.json(
      { message: 'User profile created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user profile:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 