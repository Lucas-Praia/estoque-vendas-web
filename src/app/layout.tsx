import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { fetchCompany } from "@/lib/api-server";
import { brandStyle } from "@/lib/brand";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-face", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const company = await fetchCompany();
  const name = company?.tx_name || "Vendas e Estoque";
  return { title: { default: name, template: `%s · ${name}` } };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const company = await fetchCompany();
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable} h-full`} style={brandStyle(company)}>
      <body className="h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
