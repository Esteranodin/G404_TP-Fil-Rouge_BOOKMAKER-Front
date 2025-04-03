"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import React from "react"

const Navbar = ({
  navItems,
  orientation = "horizontal",
  onItemClick,
  className = ""
}) => {

  return (
    <nav className={cn(
      "flex",
      orientation === "vertical" ? "flex-col gap-4" : "items-center",
      className
    )}>
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && orientation === "horizontal" && (
            <div className="h-[30px] w-[2px] bg-black mx-4"></div>)}
          <Link
            href={item.href}
            className="text-neutral-grey hover:text-primary-green transition-colors duration-200 uppercase"
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Navbar