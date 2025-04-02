"use client"

import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import { Button } from "../ui/button"
import React from "react"

const DesktopHeader = ({ logo, navItems, socialLinks, isLoggedIn, username }) => {

    return (
        <>
            <div className="flex justify-between items-center mb-6 p-8 header-yellow">
                <div className="flex items-center">
                    <h1 className="mr-4">BOOKMAKER</h1>
                    <h2 id="title-header">Le meilleur des livres d'occasion</h2>
                </div>

                {/* Liens réseaux sociaux */}
                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="text-primary-green hover:opacity-80">
                        <Image 
                            src={link.icon} 
                            alt={link.name}
                            width={24}
                            height={24}
                        />
                    </Link>
                    ))}
                </div>
            </div>
            {/*NavBar supérieur */}
            <div className="flex justify-between items-center px-8">
                <div className="w-[100px]">
                    <Link href="/">
                        <Image src={logo} alt="Bookmaker Logo" width={100} />
                    </Link>
                </div>

                <div className="flex-1 flex justify-center">
                    <Navbar navItems={navItems} orientation="horizontal" />
                </div>

                <div className="w-[100px] flex justify-end">
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <p className="text-green text-xl mr-3">Hi, {username}!</p>
                            <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white text-lg">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <Button variant="pink">
                            <Link href="/login">
                                Connexion
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default DesktopHeader