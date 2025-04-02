"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"

const DesktopHeader = ({ logo, navItems, socialLinks, isLoggedIn, username }) => {

    return (
        <>
            <div className="flex justify-between items-center mb-6 border-b p-8 header-yellow ">
                <div className="flex items-center">
                    <h1 className="mr-4">BOOKMAKER</h1>
                    <h2 id="title-header">Le meilleur des livres d'occasion</h2>
                </div>

                {/* Liens réseaux sociaux */}
                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-primary-green hover:opacity-80">
                            {link.icon}
                        </Link>
                    ))}
                </div>
            </div>
            {/*NavBar supérieur */}
            <div className="flex justify-between items-center ml-8">
                <div className="flex items-center gap-10 ">
                    <Link href="/">
                        <Image src={logo} alt="Bookmaker Logo" width={100} />
                    </Link>

                    <Navbar navItems={navItems} orientation="horizontal" />
                </div>

                <div>
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <p className="text-green text-xl mr-3">Hi, {username}!</p>
                            <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white text-lg">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        // <Button variant="default">
                        <Link href="/auth/login" className="px-4 py-2 bg-primary-green text-white rounded hover:opacity-90 transition-opacity">
                            Connexion
                        </Link>
                        // </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default DesktopHeader