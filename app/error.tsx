'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>We apologize for the inconvenience.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {error.message || "An unexpected error occurred. Please try again later."}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={reset}>Try again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

