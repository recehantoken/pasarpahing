import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  FileText, 
  Image, 
  Home, 
  ShoppingCart, 
  Info, 
  Mail, 
  HelpCircle, 
  Save,
  Truck,
  Package,
  Edit,
  Trash2,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState({
    name: "",
    price: "",
    description: ""
  });

  useEffect(() => {
    fetchSoldItems();
  }, []);

  const fetchSoldItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSoldItems(data || []);
    } catch (error) {
      console.error('Error fetching sold items:', error);
      toast.error('Failed to load sold items');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    toast.success("Content saved successfully", {
      description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page content has been updated.`
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setItemDetails({
      name: item.name || "",
      price: item.price?.toString() || "",
      description: item.description || ""
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (item) => {
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
      
      toast.success("Item updated successfully");
      setEditDialogOpen(false);
      fetchSoldItems();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
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
      
      toast.success("Item deleted successfully");
      setDeleteDialogOpen(false);
      fetchSoldItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Content Management
        </CardTitle>
        <CardDescription>
          Edit website content across different pages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-7 gap-2 w-full mb-6">
            <TabsTrigger value="home" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-1">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">Shipping</span>
            </TabsTrigger>
            <TabsTrigger value="sold-items" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Sold Items</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="space-y-6">
            <TabsContent value="home" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input id="hero-title" defaultValue="Welcome to Our Store" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Input id="hero-subtitle" defaultValue="Discover amazing products at great prices" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-image">Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input id="hero-image" defaultValue="/batikfloral.jpg" className="flex-1" />
                  <Button variant="outline" size="icon"><Image className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featured-products-title">Featured Products Title</Label>
                <Input id="featured-products-title" defaultValue="Featured Products" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-text">Call to Action Text</Label>
                <Textarea id="cta-text" defaultValue="Shop now and enjoy free shipping on all orders over $50!" />
              </div>
            </TabsContent>
            
            <TabsContent value="products" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="products-title">Products Page Title</Label>
                <Input id="products-title" defaultValue="Our Products" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="products-description">Products Page Description</Label>
                <Textarea id="products-description" defaultValue="Browse our collection of high-quality products." />
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">About Page Title</Label>
                <Input id="about-title" defaultValue="About Us" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">About Page Content</Label>
                <Textarea id="about-content" rows={8} defaultValue="Our company was founded in 2023 with a mission to provide high-quality products at affordable prices. We source our materials ethically and work with the best manufacturers to ensure quality in everything we sell." />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-title">Contact Page Title</Label>
                <Input id="contact-title" defaultValue="Contact Us" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-info">Contact Information</Label>
                <Textarea id="contact-info" rows={4} defaultValue="Email: support@example.com\nPhone: (555) 123-4567\nAddress: 123 Main St, Anytown, USA 12345" />
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faq-title">FAQ Page Title</Label>
                <Input id="faq-title" defaultValue="Frequently Asked Questions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faq-content">FAQ Content</Label>
                <Textarea id="faq-content" rows={8} defaultValue="Q: How long does shipping take?\nA: Shipping typically takes 3-5 business days within the continental US.\n\nQ: What is your return policy?\nA: We offer a 30-day return policy on all unused items." />
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-title">Shipping Page Title</Label>
                <Input id="shipping-title" defaultValue="Shipping Information" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-content">Shipping Policy Content</Label>
                <Textarea id="shipping-content" rows={8} defaultValue="We offer the following shipping options:\n\n- Standard Shipping (3-5 business days): $5.99\n- Express Shipping (1-2 business days): $12.99\n- Free shipping on all orders over $50" />
              </div>
            </TabsContent>
            
            <TabsContent value="sold-items" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Manage Sold Items</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={fetchSoldItems}
                  >
                    Refresh
                  </Button>
                </div>
                
                {loading ? (
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
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {soldItems.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                              No sold items found
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
                              <TableCell>
                                <div className="flex items-center">
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                  <span>Sold</span>
                                </div>
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
              </div>
            </TabsContent>
            
            {activeTab !== "sold-items" && (
              <Button onClick={handleSave} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>
        </Tabs>
      </CardContent>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Make changes to the sold item details.
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
              <Textarea
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
    </Card>
  );
};
