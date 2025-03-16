"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { getUserByUsername, createUser } from "../../lib/storage"
import { toast } from "sonner"

export default function LoginPage() {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("trello_current_user")
    if (user) {
      router.push("/")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginUsername || !loginPassword) {
      toast.error("Error", {
        description: "Por favor, rellene todos los campos",
      })
      return
    }

    const user = getUserByUsername(loginUsername)

    if (!user || user.password !== loginPassword) {
      toast.error("Error", {
        description: "Nombre de usuario o contraseña no válidos",
      })
      return
    }

    // Store current user in localStorage
    localStorage.setItem("trello_current_user", JSON.stringify(user))

    toast.success("Success", {
      description: "Has iniciado sesión",
    })

    router.push("/")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!registerUsername || !registerPassword || !confirmPassword) {
      toast.error("Error", {
        description: "Por favor, rellene todos los campos",
      })
      return
    }

    if (registerPassword !== confirmPassword) {
      toast.error("Error", {
        description: "Las contraseñas no coinciden",
      })
      return
    }

    const existingUser = getUserByUsername(registerUsername)

    if (existingUser) {
      toast.error("Error", {
        description: "El nombre de usuario ya existe",
      })
      return
    }

    const newUser = createUser(registerUsername, registerPassword)

    // Store current user in localStorage
    localStorage.setItem("trello_current_user", JSON.stringify(newUser))

    toast.success("Success", {
      description: "Cuenta creada exitosamente",
    })

    router.push("/")
  }

  return (
    <div className="container px-4 py-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl text-center">Bienvenido(a)</CardTitle>
          <CardDescription className="text-center">Inicie sesión o cree una cuenta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Inicio de sesión</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input
                    id="login-username"
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Ingrese su nombre de usuario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Introduce tu contraseña"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Inicio de sesión
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-2 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <Input
                    id="register-username"
                    type="text"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    placeholder="Elige un nombre de usuario"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Elije una contraseña"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirma tu contraseña"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Registro
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/">Continuar como Invitado(a)</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}