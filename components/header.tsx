"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-secondary bg-primary">
      <div className="flex h-16 items-center justify-center px-6">
        <Image src="/prioriwise-logo.png" alt="Prioriwise" width={180} height={40} className="h-8 w-auto" priority />
      </div>
    </header>
  )
}
