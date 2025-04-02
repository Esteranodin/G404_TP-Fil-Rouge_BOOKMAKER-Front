// Import des icônes
import facebookIcon from "../../../public/icon/facebook.svg";
import twitterIcon from "../../../public/icon/twitter.svg";
import instagramIcon from "../../../public/icon/instagram.svg";

// Éléments du menu principal
export const navItems = [
    { name: "Home", href: "/" },
    { name: "Mon compte", href: "/auth/dashboard" },
    { name: "Livres", href: "/books" },
    { name: "Mes ventes", href: "/auth/sales" },
];

// Liens réseaux sociaux
export const socialLinks = [
    { 
        name: "Facebook", 
        href: "https://www.facebook.com",
        icon: facebookIcon
    },
    { 
        name: "Twitter", 
        href: "https://www.twitter.com",
        icon: twitterIcon
    },
    { 
        name: "Instagram", 
        href: "https://www.instagram.com",
        icon: instagramIcon
    },
];