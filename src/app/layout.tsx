import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { WorkspaceProvider } from "@/presentation/hooks/use-workspace-state";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusHub — Peluang Mahasiswa Indonesia",
  description:
    "Temukan magang, beasiswa, kompetisi, dan bootcamp untuk langkah besarmu di CampusHub.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#f6f8fa] font-sans text-violet-700">
        <WorkspaceProvider>{children}</WorkspaceProvider>
      </body>
    </html>
  );
}
