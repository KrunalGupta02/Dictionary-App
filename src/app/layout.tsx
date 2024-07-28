import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="shortcut icon"
        href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXyQ_6yXUv6-HcB7NQNZe5hOI_1XUDlg0j7g&s"
        type="image/x-icon"
      />
      <Provider>{children}</Provider>
    </html>
  );
}
