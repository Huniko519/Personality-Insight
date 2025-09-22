"use client"

import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { memo, useCallback, useMemo } from "react"

interface SocialShareProps {
  title?: string
  text?: string
  url?: string
}

// Memoized social share button component
const SocialShareButton = memo<{
  platform: string
  icon: React.ReactNode
  label: string
  className: string
  onClick: () => void
}>(({ platform, icon, label, className, onClick }) => (
  <Button
    size="sm"
    variant="outline"
    className={className}
    onClick={onClick}
  >
    {icon}
    {label}
  </Button>
))

SocialShareButton.displayName = 'SocialShareButton'

// Memoized share title component
const ShareTitle = memo(() => (
  <div className="text-sm font-medium text-rose-800 mb-1">
    Share this visualization:
  </div>
))

ShareTitle.displayName = 'ShareTitle'

export function SocialShare({
  title = "PersonaIQ",
  text = "Check out this personality visualization!",
  url,
}: SocialShareProps) {
  const { toast } = useToast()

  // Memoize the share URL
  const shareUrl = useMemo(() => 
    url || (typeof window !== "undefined" ? window.location.href : ""),
    [url]
  )

  // Memoize the share handler
  const handleShare = useCallback(async (platform: string) => {
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
  }, [shareUrl, text, toast])

  // Memoize individual share handlers
  const handleFacebookShare = useCallback(() => handleShare("facebook"), [handleShare])
  const handleTwitterShare = useCallback(() => handleShare("twitter"), [handleShare])
  const handleLinkedInShare = useCallback(() => handleShare("linkedin"), [handleShare])
  const handleCopyLink = useCallback(() => handleShare("copy"), [handleShare])

  // Memoize button configurations
  const shareButtons = useMemo(() => [
    {
      platform: "facebook",
      icon: <Facebook className="h-4 w-4 mr-2" />,
      label: "Facebook",
      className: "bg-[#1877f2] hover:bg-[#166fe5] text-white border-none",
      onClick: handleFacebookShare
    },
    {
      platform: "twitter",
      icon: <Twitter className="h-4 w-4 mr-2" />,
      label: "Twitter",
      className: "bg-[#1da1f2] hover:bg-[#1a91da] text-white border-none",
      onClick: handleTwitterShare
    },
    {
      platform: "linkedin",
      icon: <Linkedin className="h-4 w-4 mr-2" />,
      label: "LinkedIn",
      className: "bg-[#0a66c2] hover:bg-[#0958a7] text-white border-none",
      onClick: handleLinkedInShare
    },
    {
      platform: "copy",
      icon: <Link className="h-4 w-4 mr-2" />,
      label: "Copy Link",
      className: "bg-rose-600 hover:bg-rose-700 text-white border-none",
      onClick: handleCopyLink
    }
  ], [handleFacebookShare, handleTwitterShare, handleLinkedInShare, handleCopyLink])

  return (
    <div className="flex flex-col space-y-3">
      <ShareTitle />
      <div className="flex flex-wrap gap-2 justify-center">
        {shareButtons.map((button) => (
          <SocialShareButton
            key={button.platform}
            platform={button.platform}
            icon={button.icon}
            label={button.label}
            className={button.className}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(SocialShare)
