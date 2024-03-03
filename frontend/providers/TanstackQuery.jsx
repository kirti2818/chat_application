"use client";

import {

  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function TanstackQuery({children}) {
  
  return (
   
    <QueryClientProvider client={queryClient}>
     {children}
    </QueryClientProvider>
   
  );
}

export default TanstackQuery;
