"use client"

import logo from "@/../public/img/logo.jpg"
import menuburger from "@/../public/icon/menu_burger.svg"
import closeIcon from "@/../public/icon/close_icon.svg"
import slider from "@/../public/icon/slider.png"
import user from "@/../public/icon/user-round.svg"
import MobileHeader from "./MobileHeader"
import DesktopHeader from "./DesktopHeader"
import { navItems, socialLinks } from "@/lib/config/navigations";
import { useState } from "react"


const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false) // remplacer apr useAuth

    const commonProps = {
        logo,
        user,
        slider,
        menuburger,
        closeIcon,
        isLoggedIn,
        username: "June", // variable nom user
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