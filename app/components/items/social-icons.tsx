
import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";


export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-4">
      <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Twitter className="h-5 w-5" />
        <span className="sr-only">Twitter</span>
      </Link>
      <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Github className="h-5 w-5" />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </Link>
      <Link href="#" className="text-ctp-red hover:text-ctp-blue transition-colors">
        <Instagram className="h-5 w-5" />
        <span className="sr-only">Instagram</span>
      </Link>
    </div>
  )
}