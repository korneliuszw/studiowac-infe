"use client"

import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

export default function Providers({children}: PropsWithChildren<{}>) {
    const queryClient = new QueryClient()
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}