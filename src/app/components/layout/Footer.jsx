import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            À propos
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Politique de confidentialité
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Conditions d&apos;utilisation
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <Link href="/" className="flex items-center justify-center md:justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
            <span className="ml-2 text-lg font-bold font-manrope">BookMarket</span>
          </Link>
          <p className="mt-2 text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BookMarket. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}