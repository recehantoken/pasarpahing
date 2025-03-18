import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product, Category } from "@/types/product";

export const AdminProducts = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    currency: 'USD', // Added currency field
    description: '',
    image_url: '',
    category_id: '',
    is_new: false,
    is_flash_sale: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Category[];
    }
  });

  const handleImageUpload = async (file: File): Promise<string> => {
    if (file.size > 500 * 1024) {
      throw new Error("Image size must be less than 500KB");
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  };

  const formatPrice = (price: number, currency: string) => {
    return currency === 'USD' 
      ? `$${price.toFixed(2)}`
      : `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handleAddProduct = async () => {
    try {
      if (!newProduct.name || !newProduct.price) {
        toast.error("Product name and price are required");
        return;
      }
      
      let imageUrl = newProduct.image_url;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      if (!newProduct.category_id && categories && categories.length > 0) {
        setNewProduct({...newProduct, category_id: categories[0].id});
      }
      
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: newProduct.name,
            price: newProduct.price,
            currency: newProduct.currency, // Added currency to insert
            description: newProduct.description || null,
            image_url: imageUrl || null,
            category_id: newProduct.category_id || null,
            is_new: newProduct.is_new,
            is_flash_sale: newProduct.is_flash_sale,
            created_by: 'admin'
          }
        ])
        .select();

      if (error) throw error;
      
      toast.success('Product added successfully');
      setIsAddDialogOpen(false);
      setNewProduct({
        name: '',
        price: 0,
        currency: 'USD',
        description: '',
        image_url: '',
        category_id: '',
        is_new: false,
        is_flash_sale: false
      });
      setImageFile(null);
      refetchProducts();
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product: ' + (error.message || 'Unknown error'));
    }
  };

  const handleEditProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      let imageUrl = selectedProduct.image_url;
      if (editImageFile) {
        imageUrl = await handleImageUpload(editImageFile);
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: selectedProduct.name,
          price: selectedProduct.price,
          currency: selectedProduct.currency || 'USD', // Added currency to update
          description: selectedProduct.description,
          image_url: imageUrl,
          category_id: selectedProduct.category_id,
          is_new: selectedProduct.is_new,
          is_flash_sale: selectedProduct.is_flash_sale
        })
        .eq('id', selectedProduct.id);

      if (error) throw error;
      
      toast.success('Product updated successfully');
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      setEditImageFile(null);
      refetchProducts();
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', selectedProduct.id);

      if (error) throw error;
      
      toast.success('Product deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
      refetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product: ' + (error.message || 'Unknown error'));
    }
  };

  if (productsLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add Product</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image_url ? (
                      <Avatar className="h-10 w-10">
                        <img src={product.image_url} alt={product.name} />
                      </Avatar>
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">No img</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{formatPrice(product.price, product.currency || 'USD')}</TableCell>
                  <TableCell>{product.categories?.name}</TableCell>
                  <TableCell>
                    {product.is_new && <span className="mr-2 text-blue-500">New</span>}
                    {product.is_flash_sale && <span className="text-red-500">Flash Sale</span>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your store.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name*</Label>
              <Input 
                id="name" 
                value={newProduct.name} 
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price*</Label>
              <div className="col-span-3 flex gap-2">
                <Input 
                  id="price" 
                  type="number"
                  value={newProduct.price} 
                  onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  className="flex-grow" 
                />
                <Select
                  value={newProduct.currency}
                  onValueChange={(value) => setNewProduct({...newProduct, currency: value})}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="IDR">IDR (Rp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea 
                id="description" 
                value={newProduct.description} 
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Image</Label>
              <Input 
                id="image" 
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="col-span-3" 
              />
              <p className="col-span-4 text-sm text-gray-500 text-center">
                Max file size: 500KB
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select 
                value={newProduct.category_id}
                onValueChange={(value) => setNewProduct({...newProduct, category_id: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">Status</div>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_new" 
                    checked={newProduct.is_new}
                    onCheckedChange={(checked) => 
                      setNewProduct({...newProduct, is_new: checked === true})
                    }
                  />
                  <Label htmlFor="is_new">Mark as New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="is_flash_sale" 
                    checked={newProduct.is_flash_sale}
                    onCheckedChange={(checked) => 
                      setNewProduct({...newProduct, is_flash_sale: checked === true})
                    }
                  />
                  <Label htmlFor="is_flash_sale">Flash Sale</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input 
                  id="edit-name" 
                  value={selectedProduct.name} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <div className="col-span-3 flex gap-2">
                  <Input 
                    id="edit-price" 
                    type="number"
                    value={selectedProduct.price} 
                    onChange={(e) => setSelectedProduct({...selectedProduct, price: parseFloat(e.target.value)})}
                    className="flex-grow" 
                  />
                  <Select
                    value={selectedProduct.currency || 'USD'}
                    onValueChange={(value) => setSelectedProduct({...selectedProduct, currency: value})}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="IDR">IDR (Rp)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={selectedProduct.description || ''} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">Image</Label>
                <Input 
                  id="edit-image" 
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                  className="col-span-3" 
                />
                {selectedProduct.image_url && (
                  <div className="col-span-4 flex justify-center">
                    <img 
                      src={selectedProduct.image_url} 
                      alt="Current product" 
                      className="max-h-32 object-contain"
                    />
                  </div>
                )}
                <p className="col-span-4 text-sm text-gray-500 text-center">
                  Max file size: 500KB
                </p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">Category</Label>
                <Select 
                  value={selectedProduct.category_id || ''}
                  onValueChange={(value) => setSelectedProduct({...selectedProduct, category_id: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Status</div>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-is_new" 
                      checked={selectedProduct.is_new || false}
                      onCheckedChange={(checked) => 
                        setSelectedProduct({...selectedProduct, is_new: checked === true})
                      }
                    />
                    <Label htmlFor="edit-is_new">Mark as New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-is_flash_sale" 
                      checked={selectedProduct.is_flash_sale || false}
                      onCheckedChange={(checked) => 
                        setSelectedProduct({...selectedProduct, is_flash_sale: checked === true})
                      }
                    />
                    <Label htmlFor="edit-is_flash_sale">Flash Sale</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="py-4">
              <p><strong>Product:</strong> {selectedProduct.name}</p>
              <p><strong>Price:</strong> {formatPrice(selectedProduct.price, selectedProduct.currency || 'USD')}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>Delete Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};