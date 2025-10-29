import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

const font = Poppins(
  {
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
  }
)

export const metadata: Metadata = {
  title: "JSON Tree Visualizer",
  description: "Json tree visualizer",
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

  const cookie = await cookies()

  const displayMode = cookie.get('theme')?.value || '';

  return (
    <html lang="en" className={displayMode}>
      <body
        className={`${font.className} antialiased bg-white text-black/95 dark:bg-black/95 dark:text-white transition-b duration-300`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
