import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="rounded-t-xl bg-neutral-900 bg-lime-95 mt-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Logo / Brand */}
          <div>
            <h1 className="text-xl font-semibold text-lime-600">
              Library Explorer
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              &copy; {new Date().getFullYear()} Library Explorer. All rights
              reserved.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-sm font-medium text-primary mb-2">
              Quick Links
            </h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="">
            <h2 className="text-sm font-medium text-primary mb-2">Follow Us</h2>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#">
                <Facebook className="w-5 h-5 hover:text-blue-600" />
              </a>
              <a href="#">
                <Twitter className="w-5 h-5 hover:text-sky-500" />
              </a>
              <a href="#">
                <Instagram className="w-5 h-5 hover:text-pink-500" />
              </a>
              <a href="#">
                <Github className="w-5 h-5 hover:text-gray-800" />
              </a>
            </div>
            <div className="mt-10 flex  justify-center md:justify-start gap-4">
              <div className="bg-neutral-800 w-sm p-3 rounded-md flex flex-row md:flex-col lg:flex-row gap-3">
                <Input placeholder="Enter email"></Input>
                <Button className="bg-lime-700 hover:bg-lime-600">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground text-center">
          Built with ❤️ using ShadCN UI + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
