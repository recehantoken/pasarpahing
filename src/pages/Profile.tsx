import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext"; // Added for translations
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Header } from "@/components/layout/Header";
import { ProfilePictureUpload } from "@/components/ProfilePictureUpload";
import { LogOut } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage(); // Added for translations
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    avatar_url: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // Added for password change
  const [isChangingPassword, setIsChangingPassword] = useState(false); // Added for password change
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProfile({
            first_name: data.first_name,
            last_name: data.last_name,
            avatar_url: data.avatar_url
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t('common.error'),
          description: error.message || t('profile.errorLoading'),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast, t]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url, // Ensure avatar_url is updated
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: t('profile.updated'),
        description: t('profile.updatedDescription'),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('profile.errorUpdating'),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (url: string) => {
    setProfile((prev) => ({
      ...prev,
      avatar_url: url
    }));
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
    toast({
      title: t('auth.loggedOut'),
      description: t('profile.signOutSuccess'),
    });
  };

  const handlePasswordChange = async () => {
    if (!user || !newPassword) return;

    setIsChangingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: t('profile.passwordUpdated'),
        description: t('profile.passwordUpdatedDescription'),
      });
      setNewPassword(""); // Clear the input after success
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || t('profile.errorPassword'),
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center text-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {t('profile.title')}
            </h1>
            <Button 
              variant="outline" 
              className="border-primary/20 text-primary hover:bg-primary/10" 
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              {t('nav.logout')}
            </Button>
          </div>
          
          <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t('profile.picture')}</CardTitle>
              <CardDescription>
                {t('profile.pictureDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              {user && (
                <ProfilePictureUpload
                  user={user}
                  avatarUrl={profile.avatar_url}
                  onAvatarChange={handleAvatarChange}
                />
              )}
            </CardContent>
          </Card>
          
          <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t('profile.personalInfo')}</CardTitle>
              <CardDescription>
                {t('profile.personalInfoDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">{t('auth.firstName')}</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={profile.first_name || ""}
                  onChange={handleChange}
                  placeholder={t('auth.firstName')}
                  className="border-primary/20 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">{t('auth.lastName')}</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={profile.last_name || ""}
                  onChange={handleChange}
                  placeholder={t('auth.lastName')}
                  className="border-primary/20 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/70 border-primary/20"
                />
                <p className="text-sm text-muted-foreground">
                  {t('profile.emailLocked')}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? t('common.saving') : t('common.save')}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t('profile.changePassword')}</CardTitle>
              <CardDescription>
                {t('profile.changePasswordDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new_password">{t('auth.password')}</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('profile.newPasswordPlaceholder')}
                  className="border-primary/20 focus:border-primary/50"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePasswordChange} 
                disabled={isChangingPassword || !newPassword} 
                className="bg-primary hover:bg-primary/90"
              >
                {isChangingPassword ? t('common.saving') : t('profile.changePasswordButton')}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t('profile.theme')}</CardTitle>
              <CardDescription>
                {t('profile.themeDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{t('profile.darkMode')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('profile.darkModeDescription')}
                </p>
              </div>
              <ThemeSwitcher />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;