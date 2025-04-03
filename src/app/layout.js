import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "@/context/Provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookmaker",
  description: "Le meilleur des livres d'occasion",
  keywords: "livres, occasion, lecture, bookmaker",
  openGraph: {
    title: "Bookmaker",
    description: "Le meilleur des livres d'occasion",
    images: ['/img/logo.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${roboto.variable} ${inter.variable} antialiased`}
      >
        <Provider>
          <Header />
          {children}
          <div id="portal-root"></div>
      
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
