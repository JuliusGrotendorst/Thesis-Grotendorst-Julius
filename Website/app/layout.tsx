import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stadt Borken · Online-Dienste",
  description:
    "Online-Dienste der Kreisstadt Borken – Sozialhilfe, Bürgerservice und mehr.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-brand-bg text-brand-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
