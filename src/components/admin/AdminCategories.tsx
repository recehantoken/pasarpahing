
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/product";

export const AdminCategories = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
    image_url: '',
  });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load categories',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        [name]: value
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      if (!newCategory.name) {
        toast({
          title: "Error",
          description: "Category name is required",
          variant: "destructive",
        });
        return;
      }
      
      const { data, error } = await supabase
        .from("categories")
        .insert({
          name: newCategory.name,
          description: newCategory.description || "",
          image_url: newCategory.image_url || "",
        });
      
      if (error) throw error;
      
      // Fetch the categories again to get the updated list
      const { data: updatedCategories, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (fetchError) throw fetchError;
        
      setCategories(updatedCategories || []);
      setNewCategory({
        name: '',
        description: '',
        image_url: '',
      });
      
      toast({
        title: 'Success',
        description: 'Category added successfully',
      });
      
    } catch (error: any) {
      console.error('Error adding category:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to add category',
      });
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.id) return;
    
    try {
      const { error } = await supabase
        .from("categories")
        .update({
          name: editingCategory.name,
          description: editingCategory.description || "",
          image_url: editingCategory.image_url || "",
        })
        .eq("id", editingCategory.id);
      
      if (error) throw error;
      
      // Fetch the categories again to get the updated list
      const { data: updatedCategories, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name');
        
      if (fetchError) throw fetchError;
        
      setCategories(updatedCategories || []);
      setEditingCategory(null);
      
      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });
      
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update category',
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setCategories(categories.filter(c => c.id !== id));
      
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete category',
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
        <h2 className="text-2xl font-bold">{t('admin.categories')}</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('admin.addCategory')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('admin.addCategory')}</DialogTitle>
              <DialogDescription>
                Add a new category to organize your products
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  placeholder="Category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newCategory.description || ''}
                  onChange={handleInputChange}
                  placeholder="Category description"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={newCategory.image_url || ''}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('common.cancel')}</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddCategory}>
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
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setEditingCategory(category)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          {editingCategory && (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('admin.editCategory')}</DialogTitle>
                                <DialogDescription>
                                  Edit category details
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Name</Label>
                                  <Input
                                    id="edit-name"
                                    name="name"
                                    value={editingCategory.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={editingCategory.description || ''}
                                    onChange={handleInputChange}
                                    rows={3}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-image_url">Image URL</Label>
                                  <Input
                                    id="edit-image_url"
                                    name="image_url"
                                    value={editingCategory.image_url || ''}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">{t('common.cancel')}</Button>
                                </DialogClose>
                                <Button type="submit" onClick={handleUpdateCategory}>
                                  {t('common.save')}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDeleteCategory(category.id)}
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
