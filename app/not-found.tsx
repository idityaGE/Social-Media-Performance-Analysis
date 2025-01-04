import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[420px]">
        <CardHeader>
          <CardTitle>404 - Page Not Found</CardTitle>
          <CardDescription>Oops! The page you&apos;re looking for doesn&apos;t exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            It seems you&apos;ve stumbled upon a broken link or entered a URL that doesn&apos;t exist on our site.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

