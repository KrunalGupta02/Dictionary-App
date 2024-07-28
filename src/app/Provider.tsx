"use client";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Inter, DM_Mono, Noto_Serif_Display } from "next/font/google";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { cn } from "@/utils/cn";
import { useAtom } from "jotai";
import { fontAtom } from "./atom";

const inter = Inter({ subsets: ["latin"] });
const dM_Mono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"] });
const noto_Serif_Display = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
});

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [font, setFont] = useAtom(fontAtom);
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <body
          className={cn(
            "bg-white text-black  dark:bg-black/95 dark:text-white ",
            inter.className,
            font === "sans serif" && inter.className,
            font === "serif" && dM_Mono.className,
            font === "mono" && noto_Serif_Display.className
          )}
        >
          {children}
        </body>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
