import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/common/Sidebar";
import { 
  Bell, 
  Check, 
  X, 
  Trash2, 
  Settings,
  Eye,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Calendar,
  Target,
  Sparkles,
  Filter,
  Search
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'performance',
      title: 'Content Performance Alert',
      message: 'Your fitness video reached 50K views! This is 25% above your average.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'trend',
      title: 'Trending Opportunity',
      message: 'New trending hashtag detected: #HealthyLifestyle2024',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI Content Suggestion',
      message: 'Azure AI has generated 3 new content ideas for your fitness domain.',
      time: '6 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'schedule',
      title: 'Post Scheduled',
      message: 'Your workout video has been scheduled for tomorrow at 7:00 PM.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 5,
      type: 'engagement',
      title: 'High Engagement Alert',
      message: 'Your latest post achieved 12.5% engagement rate!',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    performance: true,
    trends: true,
    ai: true,
    schedule: false,
    engagement: true,
    email: true,
    push: true,
    sms: false
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'performance': return <TrendingUp className="w-4 h-4" />;
      case 'trend': return <Target className="w-4 h-4" />;
      case 'ai': return <Sparkles className="w-4 h-4" />;
      case 'schedule': return <Calendar className="w-4 h-4" />;
      case 'engagement': return <Eye className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-trending/10 text-trending border-trending/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your content performance and opportunities
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <span>All</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* All Notifications */}
            <TabsContent value="all" className="space-y-4">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      You're all caught up! New notifications will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => (
                  <Card key={notification.id} className={`transition-colors ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                          <div className={notification.read ? 'text-muted-foreground' : 'text-primary'}>
                            {getNotificationIcon(notification.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{notification.title}</h3>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(notification.priority)}
                              >
                                {notification.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Unread Notifications */}
            <TabsContent value="unread" className="space-y-4">
              {notifications.filter(n => !n.read).length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Check className="w-12 h-12 mx-auto mb-4 text-success" />
                    <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">
                      You have no unread notifications.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <Card key={notification.id} className="border-primary/30 bg-primary/5">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <div className="text-primary">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={getPriorityColor(notification.priority)}
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>

            {/* Performance Notifications */}
            <TabsContent value="performance" className="space-y-4">
              {notifications.filter(n => n.type === 'performance' || n.type === 'engagement').length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No performance notifications</h3>
                    <p className="text-muted-foreground">
                      Performance alerts will appear here when your content achieves milestones.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                notifications
                  .filter(notification => notification.type === 'performance' || notification.type === 'engagement')
                  .map((notification) => (
                    <Card key={notification.id} className={`transition-colors ${!notification.read ? 'border-primary/30 bg-primary/5' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                            <div className={notification.read ? 'text-muted-foreground' : 'text-primary'}>
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={getPriorityColor(notification.priority)}
                                >
                                  {notification.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Performance Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your content reaches milestones
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.performance}
                          onCheckedChange={(checked) => handleSettingChange('performance', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Trending Opportunities</h4>
                          <p className="text-sm text-muted-foreground">
                            Discover new trending hashtags and topics
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.trends}
                          onCheckedChange={(checked) => handleSettingChange('trends', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">AI Suggestions</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive AI-powered content recommendations
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.ai}
                          onCheckedChange={(checked) => handleSettingChange('ai', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Schedule Reminders</h4>
                          <p className="text-sm text-muted-foreground">
                            Get reminded about scheduled posts
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.schedule}
                          onCheckedChange={(checked) => handleSettingChange('schedule', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Engagement Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Notifications about high engagement rates
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.engagement}
                          onCheckedChange={(checked) => handleSettingChange('engagement', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Delivery Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.email}
                          onCheckedChange={(checked) => handleSettingChange('email', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications in your browser
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.push}
                          onCheckedChange={(checked) => handleSettingChange('push', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via text message
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.sms}
                          onCheckedChange={(checked) => handleSettingChange('sms', checked)}
                        />
                      </div>
                    </div>
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

export default Notifications; 