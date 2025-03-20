import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Category } from "@/types/product";

export const AdminCategories = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({ name: '', description: '', image_url: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        toast({ variant: 'destructive', title: t('common.error'), description: t('admin.categoriesLoadError') });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleAddCategory = async () => {
    try {
      if (!newCategory.name) {
        toast({ title: t('common.error'), description: t('admin.categoryNameRequired'), variant: "destructive" });
        return;
      }
      const { error } = await supabase.from("categories").insert({ name: newCategory.name, description: newCategory.description || "", image_url: newCategory.image_url || "" });
      if (error) throw error;
      const { data: updatedCategories } = await supabase.from('categories').select('*').order('name');
      setCategories(updatedCategories || []);
      setNewCategory({ name: '', description: '', image_url: '' });
      toast({ title: t('common.success'), description: t('admin.categoryAdded') });
    } catch (error: any) {
      toast({ variant: 'destructive', title: t('common.error'), description: t('admin.categoryAddError') });
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.id) return;
    try {
      const { error } = await supabase.from("categories").update({ name: editingCategory.name, description: editingCategory.description || "", image_url: editingCategory.image_url || "" }).eq("id", editingCategory.id);
      if (error) throw error;
      const { data: updatedCategories } = await supabase.from('categories').select('*').order('name');
      setCategories(updatedCategories || []);
      setEditingCategory(null);
      toast({ title: t('common.success'), description: t('admin.categoryUpdated') });
    } catch (error: any) {
      toast({ variant: 'destructive', title: t('common.error'), description: t('admin.categoryUpdateError') });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm(t('admin.categoryDeleteConfirm'))) return;
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      setCategories(categories.filter(c => c.id !== id));
      toast({ title: t('common.success'), description: t('admin.categoryDeleted') });
    } catch (error: any) {
      toast({ variant: 'destructive', title: t('common.error'), description: t('admin.categoryDeleteError') });
    }
  };

  if (isLoading) return <Card><CardContent className="py-10"><div className="flex justify-center"><p>{t('common.loading')}</p></div></CardContent></Card>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('admin.categories')}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />{t('admin.addCategory')}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('admin.addCategory')}</DialogTitle>
              <DialogDescription>{t('admin.addCategoryDescription')}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('admin.productName')}</Label>
                <Input id="name" name="name" value={newCategory.name} onChange={handleInputChange} placeholder={t('admin.categoryNamePlaceholder')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">{t('admin.productDescription')}</Label>
                <Textarea id="description" name="description" value={newCategory.description || ''} onChange={handleInputChange} placeholder={t('admin.categoryDescPlaceholder')} rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">{t('admin.productImage')}</Label>
                <Input id="image_url" name="image_url" value={newCategory.image_url || ''} onChange={handleInputChange} placeholder={t('admin.imageUrlPlaceholder')} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">{t('common.cancel')}</Button></DialogClose>
              <Button type="submit" onClick={handleAddCategory}>{t('common.save')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.productName')}</TableHead>
                <TableHead>{t('admin.productDescription')}</TableHead>
                <TableHead className="w-[100px]">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow><TableCell colSpan={3} className="text-center py-4">{t('admin.noCategories')}</TableCell></TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setEditingCategory(category)}><Pencil className="h-4 w-4" /></Button>
                          </DialogTrigger>
                          {editingCategory && (
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{t('admin.editCategory')}</DialogTitle>
                                <DialogDescription>{t('admin.editCategoryDescription')}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">{t('admin.productName')}</Label>
                                  <Input id="edit-name" name="name" value={editingCategory.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-description">{t('admin.productDescription')}</Label>
                                  <Textarea id="edit-description" name="description" value={editingCategory.description || ''} onChange={handleInputChange} rows={3} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-image_url">{t('admin.productImage')}</Label>
                                  <Input id="edit-image_url" name="image_url" value={editingCategory.image_url || ''} onChange={handleInputChange} />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild><Button variant="outline">{t('common.cancel')}</Button></DialogClose>
                                <Button type="submit" onClick={handleUpdateCategory}>{t('common.save')}</Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteCategory(category.id)}><Trash className="h-4 w-4" /></Button>
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