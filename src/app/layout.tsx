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
    <body className="flex items-start justify-center w-screen h-full min-h-screen bg-muted/30">
      <div className="flex items-start w-full h-screen max-w-6xl">
        <aside className="sticky top-0 flex items-center justify-center w-[30%] h-full overflow-hidden">
          <Navbar />
        </aside>
        <main className="flex-1 w-full h-full p-8 px-10 bg-background border-x">
          {children}
        </main>
      </div>
    </body>
  );
}
