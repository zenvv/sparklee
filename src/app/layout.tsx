"use client";

import "./globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import Loading from "@/components/loading";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/nav/navbar";
import Footer from "@/components/footer";
import LoginPage from "./login-page";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);

  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {!user ? <LoginPage /> : <MainLayout>{children}</MainLayout>}
          </div>
        )}
        <Toaster />
      </ThemeProvider>
    </html>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="flex items-start justify-center w-screen h-full min-h-screen bg-muted/20">
      <div className="flex items-start w-full h-screen max-w-5xl border-x">
        <aside className="sticky top-0 flex items-center justify-center w-1/3 h-full overflow-hidden">
          <Navbar />
        </aside>
        <main className="flex-1 w-full p-8 bg-background">{children}</main>
      </div>
    </body>
  );
}
