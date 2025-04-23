"use client"

import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface SocialShareProps {
  title?: string
  text?: string
  url?: string
}

export function SocialShare({
  title = "PersonaIQ",
  text = "Check out this personality visualization!",
  url,
}: SocialShareProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const { toast } = useToast()

  const handleShare = async (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl)
          toast({
            title: "Link copied!",
            description: "The link has been copied to your clipboard.",
          })
          return
        } catch (err) {
          toast({
            title: "Failed to copy",
            description: "Please try again or copy the URL manually.",
            variant: "destructive",
          })
          return
        }
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="flex flex-col space-y-3">
      <div className="text-sm font-medium text-rose-800 mb-1">Share this visualization:</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          size="sm"
          variant="outline"
          className="bg-[#1877f2] hover:bg-[#166fe5] text-white border-none"
          onClick={() => handleShare("facebook")}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-[#1da1f2] hover:bg-[#1a91da] text-white border-none"
          onClick={() => handleShare("twitter")}
        >
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-[#0a66c2] hover:bg-[#0958a7] text-white border-none"
          onClick={() => handleShare("linkedin")}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-rose-600 hover:bg-rose-700 text-white border-none"
          onClick={() => handleShare("copy")}
        >
          <Link className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
    </div>
  )
}

export default SocialShare
