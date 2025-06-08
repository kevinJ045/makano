
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaTelegram, FaTelegramPlane } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";


export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-4">
      <Link href="https://x.com/" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link href="https://github.com/kevinj045" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link href="https://linkedin.com/" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </Link>
      <Link href="https://t.me/bushyice" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <PiTelegramLogo className="h-5 w-5" />
        <span className="sr-only">Telegram</span>
      </Link>
      <Link href="https://instagram.com/bushyice" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Instagram className="h-5 w-5" />
        <span className="sr-only">Instagram</span>
      </Link>
    </div>
  )
}