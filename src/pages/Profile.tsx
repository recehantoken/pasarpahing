
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { ProfilePictureUpload } from "@/components/ProfilePictureUpload";
import { LogOut, Package, Edit, Trash2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

type SoldItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  currency: string;
};

const Profile = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    avatar_url: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [soldItems, setSoldItems] = useState<SoldItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SoldItem | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    name: "",
    price: "",
    description: ""
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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
        
        // Fetch user's sold items
        fetchSoldItems();
        
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
  
  const fetchSoldItems = async () => {
    if (!user) return;
    
    setLoadingItems(true);
    try {
      // Fetch products created by this user
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, description, currency')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSoldItems(data as SoldItem[] || []);
    } catch (error: any) {
      console.error('Error fetching sold items:', error);
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: "Failed to load your items",
      });
    } finally {
      setLoadingItems(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          avatar_url: profile.avatar_url,
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
      setNewPassword("");
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
  
  const handleEdit = (item: SoldItem) => {
    setSelectedItem(item);
    setItemDetails({
      name: item.name || "",
      price: item.price?.toString() || "",
      description: item.description || ""
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (item: SoldItem) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const confirmEdit = async () => {
    if (!selectedItem) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: itemDetails.name,
          price: parseFloat(itemDetails.price),
          description: itemDetails.description
        })
        .eq('id', selectedItem.id);

      if (error) throw error;
      
      toast({
        title: "Item updated",
        description: "Your item has been updated successfully.",
      });
      setEditDialogOpen(false);
      fetchSoldItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || "Failed to update item",
      });
    }
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedItem.id);

      if (error) throw error;
      
      toast({
        title: "Item deleted",
        description: "Your item has been deleted successfully.",
      });
      setDeleteDialogOpen(false);
      fetchSoldItems();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: error.message || "Failed to delete item",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark:bg-sidebar">
        <div className="text-center text-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-16 dark:bg-sidebar">
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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="my-items">My Items</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 mt-6">
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
            </TabsContent>
            
            <TabsContent value="my-items" className="mt-6">
              <Card className="border border-primary/20 shadow-lg mb-6 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    My Items
                  </CardTitle>
                  <CardDescription>
                    View, edit or remove items you've posted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingItems ? (
                    <div className="flex justify-center py-8">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {soldItems.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center py-6">
                                You haven't posted any items yet
                              </TableCell>
                            </TableRow>
                          ) : (
                            soldItems.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                  {item.name || 'Unnamed product'}
                                </TableCell>
                                <TableCell>
                                  {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: item.currency || 'USD'
                                  }).format(item.price || 0)}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleEdit(item)}
                                    >
                                      <Edit className="h-4 w-4" />
                                      <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      onClick={() => handleDelete(item)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Delete</span>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => navigate("/sell")} 
                    className="bg-primary hover:bg-primary/90"
                  >
                    Add New Item
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
      
      {/* Edit Item Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to your item details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-name" className="text-right">
                Name
              </Label>
              <Input
                id="item-name"
                value={itemDetails.name}
                onChange={(e) => setItemDetails({...itemDetails, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-price" className="text-right">
                Price
              </Label>
              <Input
                id="item-price"
                type="number"
                step="0.01"
                value={itemDetails.price}
                onChange={(e) => setItemDetails({...itemDetails, price: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item-description" className="text-right">
                Description
              </Label>
              <Input
                id="item-description"
                value={itemDetails.description}
                onChange={(e) => setItemDetails({...itemDetails, description: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
