"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary bg-primary transition-all duration-300 hover:shadow-md">
      <div className="flex h-16 items-center justify-center px-6">
        <Image
          src="/prioriwise-logo.png"
          alt="Prioriwise"
          width={180}
          height={40}
          className="h-8 w-auto transition-transform duration-300 hover:scale-110"
          priority
        />
      </div>
    </header>
  )
}
