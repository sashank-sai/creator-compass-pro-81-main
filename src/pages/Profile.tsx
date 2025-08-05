import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/common/Sidebar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Camera, 
  Save, 
  Edit,
  Shield,
  Bell,
  Palette,
  Download,
  Trash2,
  Plus,
  Calendar,
  Target,
  TrendingUp
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    website: "https://johndoe.com",
    bio: "Content creator passionate about fitness, technology, and lifestyle. Helping others achieve their goals through engaging content.",
    avatar: "/placeholder-avatar.jpg",
    timezone: "America/New_York",
    language: "English",
    contentDomains: ["fitness", "technology", "lifestyle"],
    platforms: ["instagram", "youtube", "tiktok"]
  });

  const contentDomains = [
    { id: "fitness", name: "Fitness & Wellness", emoji: "💪" },
    { id: "technology", name: "Technology", emoji: "💻" },
    { id: "lifestyle", name: "Lifestyle", emoji: "👗" },
    { id: "food", name: "Food & Cooking", emoji: "🍽" },
    { id: "education", name: "Education", emoji: "🎓" },
    { id: "business", name: "Business", emoji: "💼" },
    { id: "entertainment", name: "Entertainment", emoji: "🎭" },
    { id: "health", name: "Health", emoji: "🏥" }
  ];

  const platforms = [
    { id: "instagram", name: "Instagram", color: "#E4405F" },
    { id: "youtube", name: "YouTube", color: "#FF0000" },
    { id: "tiktok", name: "TikTok", color: "#000000" },
    { id: "twitter", name: "Twitter", color: "#1DA1F2" },
    { id: "linkedin", name: "LinkedIn", color: "#0077B5" },
    { id: "pinterest", name: "Pinterest", color: "#E60023" }
  ];

  const stats = [
    { label: "Total Posts", value: "1,247", icon: Calendar },
    { label: "Avg. Engagement", value: "8.7%", icon: Target },
    { label: "Total Views", value: "2.4M", icon: TrendingUp },
    { label: "Followers", value: "127K", icon: User }
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile data saved:', profileData);
  };

  const handleDomainToggle = (domainId: string) => {
    setProfileData(prev => ({
      ...prev,
      contentDomains: prev.contentDomains.includes(domainId)
        ? prev.contentDomains.filter(id => id !== domainId)
        : [...prev.contentDomains, domainId]
    }));
  };

  const handlePlatformToggle = (platformId: string) => {
    setProfileData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter(id => id !== platformId)
        : [...prev.platforms, platformId]
    }));
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="data">Data & Export</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Basic Information</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Content Domains</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {contentDomains.map((domain) => (
                          <div
                            key={domain.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              profileData.contentDomains.includes(domain.id)
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            } ${!isEditing ? 'cursor-default' : ''}`}
                            onClick={() => isEditing && handleDomainToggle(domain.id)}
                          >
                            <div className="text-2xl mb-1">{domain.emoji}</div>
                            <div className="text-sm font-medium">{domain.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Connected Platforms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {platforms.map((platform) => (
                          <div
                            key={platform.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              profileData.platforms.includes(platform.id)
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            } ${!isEditing ? 'cursor-default' : ''}`}
                            onClick={() => isEditing && handlePlatformToggle(platform.id)}
                          >
                            <div 
                              className="w-4 h-4 rounded-full mb-2"
                              style={{ backgroundColor: platform.color }}
                            />
                            <div className="text-sm font-medium">{platform.name}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stats & Avatar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {isEditing && (
                          <Button size="sm" className="absolute bottom-0 right-0">
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click to upload a new photo
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <IconComponent className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm text-muted-foreground">{stat.label}</span>
                            </div>
                            <span className="font-semibold">{stat.value}</span>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={profileData.timezone} onValueChange={(value) => handleInputChange('timezone', value)} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={profileData.language} onValueChange={(value) => handleInputChange('language', value)} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>
                    <Shield className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data & Export Tab */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Export Your Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Download all your content, analytics, and account data
                      </p>
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile; 