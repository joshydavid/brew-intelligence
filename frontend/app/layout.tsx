import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import { TanStackProvider } from "./TanStackProvider";

const raleway = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brew Intelligence",
  description: "AI-Powered Coffee Grind Analysis App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className} suppressHydrationWarning>
      <body>
        <TanStackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
