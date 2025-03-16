"use client"

import Link from "next/link"
import { Frame, LogOut, Menu, X } from "lucide-react"
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/theme-toggle"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("trello_current_user")
    if (user) {
      setIsLoggedIn(true)
      setUsername(JSON.parse(user).username)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("trello_current_user")
    setIsLoggedIn(false)
    router.push("/login")
  }

  return <header className="bg-rose-700 text-white">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Frame className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-sm sm:text-base">Trello Clone</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? <div className="flex items-center gap-4">
                <span className="text-sm">
                  Hola, {username}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white hover:bg-white/40">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Cerrar sesión</span>
                </Button>
              </div> : <Button asChild variant="secondary" size="sm">
                <Link href="/login">Iniciar sesión</Link>
              </Button>}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && <div className="absolute top-14 left-0 right-0 bg-primary border-t border-white/20 z-50 md:hidden">
            <div className="flex flex-col p-4 gap-4">
              <div className="flex justify-between items-center">
                <ThemeToggle />
                {isLoggedIn ? <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-2 text-white hover:bg-white/20">
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Button> : <Button asChild variant="secondary" size="sm">
                      <Link href="/login">Iniciar sesión</Link>
                    </Button>}
              </div>
              {isLoggedIn && <div className="text-sm text-white/80 text-center">
                  Hola, {username}
                </div>}
            </div>
          </div>}
      </div>
    </header>;
}