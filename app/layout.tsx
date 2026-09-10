import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutorspie | Academic Writing Assistance",
  description: "Explore academic writing assistance, qualified experts, and study support at Tutorspie.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&family=Poppins:wght@400;500;600;700;800&display=swap" />
        <link rel="stylesheet" href="/reference/Content/lib/bootstrap/bootstrap-5.3.3.min.css" />
        <link rel="stylesheet" href="/reference/Content/t1/css/style.css" />
        <link rel="stylesheet" href="/reference/Content/t1/css/responsive.css" />
        <link rel="stylesheet" href="/tutorspie.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
