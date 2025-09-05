"use client"

import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
  excerpt: string
}

export function ShareButton({ title, excerpt }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-white"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}