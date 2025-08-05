import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Compass, 
  Calendar, 
  BarChart3, 
  Bell,
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Domain Explorer', href: '/domain-explorer', icon: Compass },
    { name: 'Content Planner', href: '/content-planner', icon: Calendar },
    { name: 'Analytics Hub', href: '/analytics', icon: BarChart3 },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Here you would typically clear authentication tokens
    // For now, we'll just show a toast and redirect
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    
    // Redirect to landing page
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border w-64">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-6 border-b border-border">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">IC</span>
        </div>
        <span className="text-xl font-bold gradient-text">ICCAP</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-3">
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <NavLink to="/notifications" className="flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </NavLink>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <NavLink to="/profile" className="flex items-center justify-center">
              <User className="w-4 h-4" />
            </NavLink>
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;