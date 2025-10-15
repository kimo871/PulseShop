import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/client";
import { ReactElement } from "react";

export default function AppProviders({children}:{children:ReactElement | ReactElement[]}){
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}