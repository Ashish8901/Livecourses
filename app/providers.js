// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51NIp3yFDQuNEtI4fax3fV8rjQY40yLMNYxFU4qFkTR3ZvzZrKYmtdOiQy607vVCntLn2YZ9Ck0nmvrzYE6PzeDog00ti6CtU7h');

export function CHProviders({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
      <Elements stripe={stripePromise}>
        {children}
        </Elements>
        </ChakraProvider>
    </CacheProvider>
  );
}
