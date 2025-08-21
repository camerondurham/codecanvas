import type { Metadata } from "next";
// import "./globals.css";

export const metadata: Metadata = {
  title: "Code Runner",
  description: "Execute code in multiple programming languages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}