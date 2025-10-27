import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
