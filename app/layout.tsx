import { Toaster } from "sonner";
import "./globals.css";

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="light">
      <body className="bg-neutral-50">
        <Providers>
          {children}

          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
