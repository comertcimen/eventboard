import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "src/constants/firebaseConfig";

export const fb = initializeApp(firebaseConfig);
export const auth = getAuth(fb);
export const db = getFirestore();
