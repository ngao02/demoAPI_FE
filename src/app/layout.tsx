import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { ThemeProvider } from 'next-themes';
import Navbar from './components/navbar';

const roboto = Roboto({
  subsets: ['vietnamese'],
  weight: ['100', '300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'demo_API',
  description: 'Website demo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Navbar />
          <div className="flex flex-1  ">
            <div className="flex-col w-52 pt-8 border-r-[1px] hidden md:flex bg-[var(--sub-color-1)] h-[1000px]"></div>

            <main className="flex-1 p-4">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
