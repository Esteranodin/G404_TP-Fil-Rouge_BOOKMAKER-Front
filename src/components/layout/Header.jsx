"use client"

import logo from "@/../public/img/logo.jpg"
import menuburger from "@/../public/icon/menu_burger.svg"
import closeIcon from "@/../public/icon/close_icon.svg"
import slider from "@/../public/icon/slider.png"
import userIcon from "@/../public/icon/user-round.svg"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
import { navItems, socialLinks } from "@/lib/config/navigations";
import { useAuth } from "@/hooks/useAuth";


const Header = () => {
    const { isAuthenticated: isLoggedIn, user } = useAuth();

    const commonProps = {
        logo,
        userIcon,
        slider,
        menuburger,
        closeIcon,
        isLoggedIn,
        username: user?.name || "Invité", // Utiliser le vrai nom d'utilisateur
        navItems,
    }

    const desktopProps = {
        ...commonProps,
        socialLinks
    }

    return (
        <header className="w-full">
            <div className="lg:hidden">
                <MobileHeader {...commonProps} />
            </div>

            <div className="hidden lg:block">
                <DesktopHeader {...desktopProps} />
            </div>
        </header>
    )
}

export default Header;