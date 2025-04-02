"use client"

import Link from "next/link"

const Navbar = ({ 
  navItems, 
  orientation = "horizontal", 
  onItemClick, 
  className = "" 
}) => {
  
  return (
    <nav className={`flex ${orientation === "vertical" ? "flex-col gap-4" : "gap-6"} ${className}`}>
      {navItems.map((item, index) => (
        <Link 
          key={index} 
          href={item.href}
          className="text-neutral-grey hover:text-primary-green transition-colors duration-200"
          onClick={onItemClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar