'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

interface SuccessRedirectProps {
  title?: string
  redirectPath?: string
  onRedirect?: () => void
  countdownSeconds?: number
}

export const SuccessRedirect = ({
  title = 'Operaci\u00f3n exitosa',
  redirectPath = '/',
  onRedirect,
  countdownSeconds = 5
}: SuccessRedirectProps) => {
  const router = useRouter()
  const [countdown, setCountdown] = useState(countdownSeconds)

  useEffect(() => {
    if (countdown === 0) {
      if (onRedirect) {
        onRedirect()
      } else {
        router.push(redirectPath)
      }
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, router, redirectPath, onRedirect])

  const handleRedirect = () => {
    if (onRedirect) {
      onRedirect()
    } else {
      router.push(redirectPath)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-md mx-auto w-full">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base mt-2">
              Ser\u00e1s redirigido en {countdown}...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={handleRedirect} size="lg">
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
