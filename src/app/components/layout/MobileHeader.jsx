"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "./Navbar"
import MenuBurger from "../ui/menu-burger"
import { createPortal } from "react-dom"

const MobileHeader = ({ logo, menuburger, closeIcon, slider, user, navItems, isLoggedIn, username }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscKey)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [isMenuOpen])

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <div className="p-4 mt-2">
            {/* NavBar supérieur */}
            <nav className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <MenuBurger 
                        isOpen={isMenuOpen}
                        onToggle={toggleMenu}
                        menuIcon={menuburger}
                        closeIcon={closeIcon}
                    />
                    
                    <Link href="">
                        <Image src={slider} alt="Filtres" className="w-6" />
                    </Link>
                </div>
                

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/">
                        <Image src={logo} alt="Bookmaker Logo" width={80} />
                    </Link>
                </div>

                {/* Connexion utilisateur */}
                <div>
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <p className="text-green text-sm mr-2">Hi, {username}!</p>
                            <div className="w-8 h-8 rounded-full bg-primary-green flex items-center justify-center text-white">
                                {username.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Image src={user} alt="Connexion" className="w-8" />
                        </Link>
                    )}
                </div>
            </nav>

            <div className="text-center mt-12">
                <h1 className="pb-1">BOOKMAKER</h1>
                <h2 id="title-header" className="pb-6">Le meilleur des livres d'occasion</h2>
            </div>

            {/* Menu mobile avec Portal */}
            {isMenuOpen && isMounted && createPortal(
                <div 
                    id="mobile-menu"
                    ref={menuRef}
                    className="flex bg-white flex-col pt-20 fixed top-0 left-0 p-6 shadow-md z-50 w-64 h-full"
                    role="dialog"
                    aria-modal="true"
                >
                    <button 
                        aria-label="Fermer le menu"
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-4 right-4"
                    >
                        <Image
                            src={closeIcon}
                            alt="Fermer"
                            className="w-8 cursor-pointer"
                        />
                    </button>
                    <Navbar
                        navItems={navItems}
                        orientation="vertical"
                        onItemClick={() => setIsMenuOpen(false)}
                        className="py-2"
                    />
                </div>,
                document.body
            )}
        </div>
    )
}

export default MobileHeader