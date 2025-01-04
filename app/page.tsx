import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BarChart3, MessageCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white shadow-md">
        <Link className="flex items-center" href="/">
          <BarChart3 className="h-5 w-5 mr-2 sm:h-6 sm:w-6" />
          <span className="font-bold text-lg sm:text-xl truncate">
            Social Media Analyzer
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button asChild className="flex items-center space-x-1 sm:space-x-2">
            <Link href="/chat">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:block">Chat Analysis</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex items-center space-x-1 sm:space-x-2"
          >
            <Link href="/insight">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:block">Get Insights</span>
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Social Media Performance Analysis
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Analyze engagement data from social media accounts using advanced AI and data analytics.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className='p-6 text-xl'>
                  <Link href="/chat">
                    <MessageCircle />
                    Chat Analysis
                  </Link>
                </Button>
                <Button asChild variant="outline" className='p-6 text-xl'>
                  <Link href="/insight">
                    <BarChart3 />
                    Get Insights
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BarChart3 className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">Data Analysis</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Analyze engagement metrics across different post types</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <MessageCircle className="h-10 w-10 mb-2" />
                <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Get AI-generated insights on your social media performance</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <svg
                  className=" h-10 w-10 mb-2"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3v19" />
                  <path d="M5 10h14" />
                  <path d="M5 15h14" />
                  <path d="M5 20h14" />
                </svg>
                <h3 className="text-xl font-bold">Comprehensive Reports</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">Generate detailed reports on your social media strategy</p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">About the Project</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
              This pre-hackathon assignment project utilizes Langflow and DataStax to create a powerful social media analytics tool.
              By leveraging advanced AI and robust database operations, we provide valuable insights into social media engagement and performance.
            </p>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Social Media Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

