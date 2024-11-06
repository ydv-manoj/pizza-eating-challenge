"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Pizza } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-red-600 text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold flex items-center">
            <Pizza className="mr-2 animate-spin-slow" />
            Pizza Challenge
          </Link>
          <div className="flex space-x-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/new-user', label: 'New User' },
              { href: '/leaderboard', label: 'Leaderboard' },
              { href: '/manage-players', label: 'Manage Players' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-white text-red-600"
                    : "text-red-100 hover:bg-red-500"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}