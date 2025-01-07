"use client"

import { Github, Home, MessageSquare, PieChart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="p-4">
        <Link href="/">
          <Home className="h-6 w-6" />
        </Link>
        <h2 className="text-lg font-semibold">Social Media Analysis</h2>
        <p className="text-sm text-muted-foreground">Pre-Hackathon Assignment</p>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex flex-col justify-between flex-grow">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Social Media Analysis</h2>
          <p className="text-sm text-muted-foreground mb-4">Pre-Hackathon Assignment</p>
          <p className="text-sm mb-4">
            This project uses Langflow and DataStax to analyze engagement data from mock social media accounts.
          </p>
          <ul className="list-disc list-inside text-sm space-y-2 pb-4">
            <li>Fetches engagement data</li>
            <li>Analyzes post performance</li>
            <li>Provides insights using GPT</li>
          </ul>
          <SidebarSeparator />
          <div className="mt-4 flex items-center text-sm text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Agent Online
          </div>
        </div>
        <SidebarSeparator />
        <nav className="my-6 px-4">
          <Button
            variant={pathname === '/chat' ? 'secondary' : 'ghost'}
            className="w-full justify-start mb-2"
            asChild
          >
            <Link href="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </Link>
          </Button>
          <Button
            variant={pathname === '/insight' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            asChild
          >
            <Link href="/insight">
              <PieChart className="mr-2 h-4 w-4" />
              Insight
            </Link>
          </Button>
        </nav>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="p-4">
        <Button variant="outline" className="w-full" asChild>
          <a href="https://github.com/idityaGE/Social-Media-Performance-Analysis" target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

