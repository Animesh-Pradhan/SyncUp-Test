import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
const Provider = dynamic(() => import('@/components/ui/chakraUI/provider').then((mod) => mod.Provider))
export const metadata: Metadata = {
  title: "SyncUp Task",
  description: "A simple Feed App built with Next, Chakra UI and Socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider defaultTheme="light">{children}</ Provider>
      </body>
    </html>
  );
}
