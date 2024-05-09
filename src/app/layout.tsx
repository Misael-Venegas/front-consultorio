import '../pagesGlobals.css'
import "./globals.css";
import '../output.css'
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
