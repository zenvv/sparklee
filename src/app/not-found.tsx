"use client"

import { Button } from '@/components/ui/button'
import { Frown, HeartCrack } from 'lucide-react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center">
        <main className="flex-1 flex flex-col gap-24 items-center justify-center">
          <span className='flex flex-col items-center gap-2 text-muted-foreground'>

            <span className='flex items-center gap-2'>
            <h2 className="text-6xl font-bold">Oh no!</h2>
            <HeartCrack size={48}/>
            </span>
            <p className="text-lg opacity-70">Sorry, this page was not found...</p>
          </span>
        <Button>
          <Link href="/">Return Home</Link>
        </Button>
    </main>
    </div>
  )
}