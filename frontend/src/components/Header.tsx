import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products & Solutions", path: "/products" },
    { name: "Gallery", path: "/gallery" },
    { name: "Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-elegant">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Skywatt Electric Energy Logo"
                className="h-14 w-14 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-wide text-gray-600 leading-tight">
                SKYWATT ELECTRIC ENERGY
              </h1>
              <p className="text-sm text-green-600 font-medium italic leading-none">
                The Solutions Provider
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={
                    isActive(link.path)
                      ? "bg-gradient-solar font-semibold shadow-solar"
                      : "hover:bg-muted"
                  }
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(link.path)
                      ? "bg-gradient-solar font-semibold shadow-solar"
                      : ""
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
