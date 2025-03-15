import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Define Product type
type Product = {
  id: string;
  created_at?: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category_id?: string | null;
  created_by?: string;
  is_flash_sale?: boolean;
  is_new?: boolean;
};

export const AdminProducts = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; }[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category_id: null,
    is_flash_sale: false,
    is_new: true,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      if (error) {
        console.error("Error fetching products:", error);
        toast({
          title: t('common.error'),
          description: "Failed to fetch products",
          variant: "destructive",
        });
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: t('common.error'),
        description: "Failed to fetch products",
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: t('common.error'),
          description: "Failed to fetch categories",
          variant: "destructive",
        });
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: t('common.error'),
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSelectCategory = (value: string) => {
    setNewProduct(prevState => ({
      ...prevState,
      category_id: value === "null" ? null : value,
    }));
  };

  const handleAddProduct = async () => {
    try {
      // Ensure required fields are provided
      if (!newProduct.name || !newProduct.price) {
        toast({
          title: "Error",
          description: "Product name and price are required",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description || "",
          image_url: newProduct.image_url || "",
          category_id: newProduct.category_id || null,
          created_by: user?.id || "",
          is_flash_sale: newProduct.is_flash_sale || false,
          is_new: newProduct.is_new || true,
        });
        
      if (error) {
        console.error("Error adding product:", error);
        toast({
          title: t('common.error'),
          description: "Failed to add product",
          variant: "destructive",
        });
      } else {
        fetchProducts();
        setNewProduct({
          id: '',
          name: '',
          price: 0,
          description: '',
          image_url: '',
          category_id: null,
          is_flash_sale: false,
          is_new: true,
        });
        setOpen(false);
        toast({
          title: t('common.success'),
          description: "Product added successfully",
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: t('common.error'),
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      // Ensure required fields are provided
      if (!product.name || !product.price) {
        toast({
          title: "Error",
          description: "Product name and price are required",
          variant: "destructive", 
        });
        return;
      }
      
      const { data, error } = await supabase
        .from("products")
        .update({
          name: product.name,
          price: product.price,
          description: product.description || "",
          image_url: product.image_url || "",
          category_id: product.category_id || null,
          is_flash_sale: product.is_flash_sale || false,
          is_new: product.is_new || false,
        })
        .eq("id", product.id);
        
      if (error) {
        console.error("Error updating product:", error);
        toast({
          title: t('common.error'),
          description: "Failed to update product",
          variant: "destructive",
        });
      } else {
        fetchProducts();
        setSelectedProduct(null);
        toast({
          title: t('common.success'),
          description: "Product updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: t('common.error'),
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Error deleting product:", error);
        toast({
          title: t('common.error'),
          description: "Failed to delete product",
          variant: "destructive",
        });
      } else {
        fetchProducts();
        toast({
          title: t('common.success'),
          description: "Product deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: t('common.error'),
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.products')}</CardTitle>
        <CardDescription>
          {t('admin.products')} management and configuration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="products">
          <TabsList className="mb-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">{t('admin.addProduct')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <Table>
              <TableCaption>A list of your products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      {categories.find(cat => cat.id === product.category_id)?.name || 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t('common.edit')}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        {t('common.delete')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="add-product" className="space-y-4">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>{t('admin.addProduct')}</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t('admin.addProduct')}</DialogTitle>
                  <DialogDescription>
                    Create a new product.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={newProduct.name} 
                      onChange={handleInputChange}
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      type="number"
                      id="price"
                      name="price"
                      value={newProduct.price}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        handleInputChange({
                          ...e,
                          target: {
                            ...e.target,
                            value: isNaN(value) ? '' : value.toString(),
                          },
                        } as any);
                      }}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input 
                      id="description" 
                      name="description"
                      value={newProduct.description || ''}
                      onChange={handleInputChange}
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image_url" className="text-right">
                      Image URL
                    </Label>
                    <Input 
                      id="image_url" 
                      name="image_url"
                      value={newProduct.image_url || ''}
                      onChange={handleInputChange}
                      className="col-span-3" 
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category_id" className="text-right">
                      Category
                    </Label>
                    <Select onValueChange={handleSelectCategory}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">No Category</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="is_flash_sale" className="text-right">
                      Is Flash Sale
                    </Label>
                    <Checkbox 
                      id="is_flash_sale"
                      name="is_flash_sale"
                      checked={newProduct.is_flash_sale || false}
                      onCheckedChange={(checked) => {
                        setNewProduct(prevState => ({
                          ...prevState,
                          is_flash_sale: checked || false,
                        }));
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="is_new" className="text-right">
                      Is New
                    </Label>
                    <Checkbox 
                      id="is_new"
                      name="is_new"
                      checked={newProduct.is_new || true}
                      onCheckedChange={(checked) => {
                        setNewProduct(prevState => ({
                          ...prevState,
                          is_new: checked === null ? true : checked,
                        }));
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      {t('common.cancel')}
                    </Button>
                  </DialogClose>
                  <Button type="submit" onClick={handleAddProduct}>
                    {t('common.save')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Edit Product Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('admin.editProduct')}</DialogTitle>
            <DialogDescription>
              Edit the selected product.
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <EditProductForm 
              product={selectedProduct} 
              categories={categories}
              onUpdate={handleUpdateProduct} 
              onDelete={handleDeleteProduct}
              onCancel={() => setSelectedProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

type EditProductFormProps = {
  product: Product;
  categories: { id: string; name: string; }[];
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ product, categories, onUpdate, onDelete, onCancel }) => {
  const { t } = useLanguage();
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedProduct(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSelectCategory = (value: string) => {
    setEditedProduct(prevState => ({
      ...prevState,
      category_id: value === "null" ? null : value,
    }));
  };

  const handleSave = () => {
    onUpdate(editedProduct);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input 
          id="name" 
          name="name"
          value={editedProduct.name} 
          onChange={handleInputChange}
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={editedProduct.price}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            handleInputChange({
              ...e,
              target: {
                ...e.target,
                value: isNaN(value) ? '' : value.toString(),
              },
            } as any);
          }}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input 
          id="description" 
          name="description"
          value={editedProduct.description || ''}
          onChange={handleInputChange}
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="image_url" className="text-right">
          Image URL
        </Label>
        <Input 
          id="image_url" 
          name="image_url"
          value={editedProduct.image_url || ''}
          onChange={handleInputChange}
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category_id" className="text-right">
          Category
        </Label>
        <Select value={editedProduct.category_id || "null"} onValueChange={handleSelectCategory}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">No Category</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_flash_sale" className="text-right">
          Is Flash Sale
        </Label>
        <Checkbox 
          id="is_flash_sale"
          name="is_flash_sale"
          checked={editedProduct.is_flash_sale || false}
          onCheckedChange={(checked) => {
            setEditedProduct(prevState => ({
              ...prevState,
              is_flash_sale: checked || false,
            }));
          }}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="is_new" className="text-right">
          Is New
        </Label>
        <Checkbox 
          id="is_new"
          name="is_new"
          checked={editedProduct.is_new || true}
          onCheckedChange={(checked) => {
            setEditedProduct(prevState => ({
              ...prevState,
              is_new: checked === null ? true : checked,
            }));
          }}
        />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        </DialogClose>
        <Button type="button" variant="destructive" onClick={() => onDelete(product.id)}>
          {t('common.delete')}
        </Button>
        <Button type="submit" onClick={handleSave}>
          {t('common.save')}
        </Button>
      </DialogFooter>
    </div>
  );
};
