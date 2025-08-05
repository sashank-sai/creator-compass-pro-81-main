import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import AuthModal from "./AuthModal";

interface HeaderProps {
  isLanding?: boolean;
}

const Header = ({ isLanding = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">IC</span>
              </div>
              <span className="text-xl font-bold gradient-text">ICCAP</span>
            </div>

            {/* Desktop Navigation */}
            {isLanding && (
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </nav>
            )}

            {/* Desktop Auth Buttons */}
            {isLanding && (
              <div className="hidden md:flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => openAuth('login')}
                  className="text-muted-foreground hover:text-primary"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={() => openAuth('signup')}
                  className="btn-hero"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Start Free Trial
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isLanding && (
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {isLanding && isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
                <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                  <Button 
                    variant="ghost" 
                    onClick={() => openAuth('login')}
                    className="justify-start text-muted-foreground hover:text-primary"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    onClick={() => openAuth('signup')}
                    className="btn-hero justify-start"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Start Free Trial
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Header;