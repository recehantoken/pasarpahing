
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string | null;
  image_url: string | null;
  created_at: string;
  category_name?: string;
};

type Category = {
  id: string;
  name: string;
};

export const AdminProducts = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category_id: '',
    image_url: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('id, name');
        
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);
        
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*');
        
        if (productsError) throw productsError;
        
        // Enhance products with category names
        const enhancedProducts = await Promise.all((productsData || []).map(async (product) => {
          if (product.category_id) {
            const category = categoriesData?.find(cat => cat.id === product.category_id);
            return {
              ...product,
              category_name: category?.name || 'Unknown'
            };
          }
          return {
            ...product,
            category_name: 'None'
          };
        }));
        
        setProducts(enhancedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load products and categories',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === 'price' ? parseFloat(value) : value
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: name === 'price' ? parseFloat(value) : value
      });
    }
  };

  const handleAddProduct = async () => {
    try {
      // Validate required fields
      if (!newProduct.name || !newProduct.price) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: 'Name and price are required',
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        // Add category name to the new product
        const category = categories.find(cat => cat.id === data[0].category_id);
        const newProductWithCategory = {
          ...data[0],
          category_name: category?.name || 'None'
        };
        
        setProducts([...products, newProductWithCategory]);
        setNewProduct({
          name: '',
          description: '',
          price: 0,
          category_id: '',
          image_url: '',
        });
        
        toast({
          title: 'Success',
          description: 'Product added successfully',
        });
      }
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to add product',
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    
    try {
      // Validate required fields
      if (!editingProduct.name || !editingProduct.price) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: 'Name and price are required',
        });
        return;
      }
      
      const { data, error } = await supabase
        .from('products')
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          category_id: editingProduct.category_id,
          image_url: editingProduct.image_url,
        })
        .eq('id', editingProduct.id)
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        // Update category name
        const category = categories.find(cat => cat.id === data[0].category_id);
        const updatedProduct = {
          ...data[0],
          category_name: category?.name || 'None'
        };
        
        // Update products state
        setProducts(products.map(p => 
          p.id === updatedProduct.id ? updatedProduct : p
        ));
        
        setEditingProduct(null);
        
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update product',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update products state
      setProducts(products.filter(p => p.id !== id));
      
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete product',
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="flex justify-center">
            <p>{t('common.loading')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.products')}</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('admin.addProduct')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('admin.addProduct')}</DialogTitle>
              <DialogDescription>
                Add a new product to your store
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newProduct.description || ''}
                  onChange={handleInputChange}
                  placeholder="Product description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={newProduct.price || ''}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <select
                  id="category_id"
                  name="category_id"
                  value={newProduct.category_id || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={newProduct.image_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('common.cancel')}</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddProduct}>
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.category_name}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setEditingProduct(product)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {editingProduct && (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('admin.editProduct')}</DialogTitle>
                                <DialogDescription>
                                  Edit product details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Name</Label>
                                  <Input
                                    id="edit-name"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={editingProduct.description || ''}
                                    onChange={handleInputChange}
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-price">Price</Label>
                                  <Input
                                    id="edit-price"
                                    name="price"
                                    type="number"
                                    value={editingProduct.price || ''}
                                    onChange={handleInputChange}
                                    step="0.01"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-category_id">Category</Label>
                                  <select
                                    id="edit-category_id"
                                    name="category_id"
                                    value={editingProduct.category_id || ''}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                  >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                      <option key={category.id} value={category.id}>
                                        {category.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-image_url">Image URL</Label>
                                  <Input
                                    id="edit-image_url"
                                    name="image_url"
                                    value={editingProduct.image_url || ''}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">{t('common.cancel')}</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handleUpdateProduct}>
                                  {t('common.save')}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
