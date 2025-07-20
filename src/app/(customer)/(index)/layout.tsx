import { Poppins } from "next/font/google";
import "../../globals-landing.css"

const poppins = Poppins({
    weight: ['300', '400', '500', '700', '800'],
    subsets: ['latin-ext'],
})

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
