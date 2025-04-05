import Link from "next/link"
import { Heart, Twitter, Linkedin, Github } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-gray-100 py-8 mt-16">
      <div className="container mx-auto width_90pct">
        <div className="grid grid-cols-1 md:grid-cols-3 space-between gap-8">

          <div className="space-y-4">
            <Link href="/">
              <Image src="/logo.png" alt="logo"  width={54} height={30} />
            </Link>
            <p className="text-gray-500 text-sm">Connect, collaborate, and grow with the community.</p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/kore4lyf" className="text-gray-400 hover:text-green-500">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com/ln/kore4lyf" className="text-gray-400 hover:text-green-500">
                <Linkedin size={20} />
              </Link>
              <Link href="https://github.com/kore4lyf" className="text-gray-400 hover:text-green-500">
                <Github size={20} />
              </Link>
            </div>
          </div>


          <div>
            <h3 className="font-medium mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/create" className="text-gray-500 hover:text-green-500">
                  Create
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-green-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-green-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-green-500">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-500 text-sm">© {currentYear} Pitchit. All rights reserved.</p>
          <p className="text-gray-500 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-red-500" /> by KoRe
          </p>
        </div>
      </div>
    </footer>
  )
}