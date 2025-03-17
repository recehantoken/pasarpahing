
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Check, X, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AdminShipping = () => {
  const [shippingMethods, setShippingMethods] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [baseCost, setBaseCost] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [currentId, setCurrentId] = useState("");
  
  const { toast } = useToast();
  const { t, language } = useLanguage();

  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const fetchShippingMethods = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("shipping_methods")
        .select("*")
        .order("name");
        
      if (error) throw error;
      
      setShippingMethods(data || []);
    } catch (error: any) {
      console.error("Error fetching shipping methods:", error);
      toast({
        variant: "destructive",
        title: language === 'id' ? "Gagal memuat metode pengiriman" : "Failed to load shipping methods",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setBaseCost("");
    setEstimatedDays("");
    setIsActive(true);
    setCurrentId("");
  };

  const handleEdit = (method: any) => {
    setName(method.name);
    setDescription(method.description || "");
    setBaseCost(String(method.base_cost));
    setEstimatedDays(method.estimated_days ? String(method.estimated_days) : "");
    setIsActive(!!method.is_active);
    setCurrentId(method.id);
    setIsEditing(true);
  };

  const handleAdd = async () => {
    try {
      if (!name || !baseCost) {
        toast({
          variant: "destructive",
          title: language === 'id' ? "Data tidak lengkap" : "Incomplete data",
          description: language === 'id' ? "Nama dan biaya dasar diperlukan" : "Name and base cost are required",
        });
        return;
      }
      
      const newMethod = {
        name,
        description: description || null,
        base_cost: parseFloat(baseCost),
        estimated_days: estimatedDays ? parseInt(estimatedDays) : null,
        is_active: isActive
      };
      
      const { data, error } = await supabase
        .from("shipping_methods")
        .insert(newMethod)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: language === 'id' ? "Metode pengiriman ditambahkan" : "Shipping method added",
        description: language === 'id' ? "Metode pengiriman baru telah ditambahkan" : "New shipping method has been added",
      });
      
      setShippingMethods([...shippingMethods, data]);
      resetForm();
      setIsAdding(false);
    } catch (error: any) {
      console.error("Error adding shipping method:", error);
      toast({
        variant: "destructive",
        title: language === 'id' ? "Gagal menambahkan metode pengiriman" : "Failed to add shipping method",
        description: error.message,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      if (!name || !baseCost) {
        toast({
          variant: "destructive",
          title: language === 'id' ? "Data tidak lengkap" : "Incomplete data",
          description: language === 'id' ? "Nama dan biaya dasar diperlukan" : "Name and base cost are required",
        });
        return;
      }
      
      const updatedMethod = {
        name,
        description: description || null,
        base_cost: parseFloat(baseCost),
        estimated_days: estimatedDays ? parseInt(estimatedDays) : null,
        is_active: isActive
      };
      
      const { error } = await supabase
        .from("shipping_methods")
        .update(updatedMethod)
        .eq("id", currentId);
        
      if (error) throw error;
      
      toast({
        title: language === 'id' ? "Metode pengiriman diperbarui" : "Shipping method updated",
        description: language === 'id' ? "Perubahan telah disimpan" : "Changes have been saved",
      });
      
      // Update local state
      setShippingMethods(
        shippingMethods.map(method => 
          method.id === currentId ? { ...method, ...updatedMethod } : method
        )
      );
      
      resetForm();
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error updating shipping method:", error);
      toast({
        variant: "destructive",
        title: language === 'id' ? "Gagal memperbarui metode pengiriman" : "Failed to update shipping method",
        description: error.message,
      });
    }
  };

  const toggleActive = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("shipping_methods")
        .update({ is_active: !currentValue })
        .eq("id", id);
        
      if (error) throw error;
      
      // Update local state
      setShippingMethods(
        shippingMethods.map(method => 
          method.id === id ? { ...method, is_active: !currentValue } : method
        )
      );
      
      toast({
        title: language === 'id' ? "Status diperbarui" : "Status updated",
        description: currentValue 
          ? (language === 'id' ? "Metode pengiriman telah dinonaktifkan" : "Shipping method has been deactivated") 
          : (language === 'id' ? "Metode pengiriman telah diaktifkan" : "Shipping method has been activated"),
      });
    } catch (error: any) {
      console.error("Error toggling active status:", error);
      toast({
        variant: "destructive",
        title: language === 'id' ? "Gagal memperbarui status" : "Failed to update status",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{language === 'id' ? 'Metode Pengiriman' : 'Shipping Methods'}</CardTitle>
            <CardDescription>
              {language === 'id' 
                ? 'Kelola metode pengiriman yang tersedia untuk pelanggan' 
                : 'Manage shipping methods available to customers'}
            </CardDescription>
          </div>
          <Dialog open={isAdding} onOpenChange={setIsAdding}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => resetForm()}>
                <PlusCircle className="h-4 w-4 mr-2" />
                {language === 'id' ? 'Tambah Metode' : 'Add Method'}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{language === 'id' ? 'Tambah Metode Pengiriman' : 'Add Shipping Method'}</DialogTitle>
                <DialogDescription>
                  {language === 'id'
                    ? 'Buat metode pengiriman baru untuk pelanggan'
                    : 'Create a new shipping method for customers'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">{language === 'id' ? 'Nama' : 'Name'}</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder={language === 'id' ? 'Masukkan nama' : 'Enter name'}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">{language === 'id' ? 'Deskripsi' : 'Description'}</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder={language === 'id' ? 'Masukkan deskripsi' : 'Enter description'}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="baseCost">{language === 'id' ? 'Biaya Dasar ($)' : 'Base Cost ($)'}</Label>
                  <Input 
                    id="baseCost" 
                    value={baseCost} 
                    onChange={(e) => setBaseCost(e.target.value)} 
                    type="number" 
                    min="0" 
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="estimatedDays">{language === 'id' ? 'Perkiraan Hari' : 'Estimated Days'}</Label>
                  <Input 
                    id="estimatedDays" 
                    value={estimatedDays} 
                    onChange={(e) => setEstimatedDays(e.target.value)} 
                    type="number" 
                    min="1"
                    placeholder={language === 'id' ? 'Masukkan perkiraan hari' : 'Enter estimated days'}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isActive" 
                    checked={isActive} 
                    onCheckedChange={setIsActive} 
                  />
                  <Label htmlFor="isActive">{language === 'id' ? 'Aktif' : 'Active'}</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </Button>
                <Button onClick={handleAdd}>
                  {language === 'id' ? 'Simpan' : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">{language === 'id' ? 'Memuat...' : 'Loading...'}</span>
            </div>
          ) : shippingMethods.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {language === 'id' 
                  ? 'Tidak ada metode pengiriman yang ditemukan' 
                  : 'No shipping methods found'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'id' ? 'Nama' : 'Name'}</TableHead>
                  <TableHead>{language === 'id' ? 'Deskripsi' : 'Description'}</TableHead>
                  <TableHead>{language === 'id' ? 'Biaya Dasar' : 'Base Cost'}</TableHead>
                  <TableHead>{language === 'id' ? 'Perkiraan Hari' : 'Est. Days'}</TableHead>
                  <TableHead>{language === 'id' ? 'Status' : 'Status'}</TableHead>
                  <TableHead className="text-right">{language === 'id' ? 'Tindakan' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.description || '-'}</TableCell>
                    <TableCell>${method.base_cost.toFixed(2)}</TableCell>
                    <TableCell>{method.estimated_days || '-'}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          method.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500"
                            : "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500"
                        }`}
                      >
                        {method.is_active 
                          ? (language === 'id' ? 'Aktif' : 'Active') 
                          : (language === 'id' ? 'Nonaktif' : 'Inactive')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(method.id, !!method.is_active)}
                      >
                        {method.is_active ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Dialog open={isEditing} onOpenChange={setIsEditing}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(method)}
                          >
                            {language === 'id' ? 'Edit' : 'Edit'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{language === 'id' ? 'Edit Metode Pengiriman' : 'Edit Shipping Method'}</DialogTitle>
                            <DialogDescription>
                              {language === 'id'
                                ? 'Ubah detail metode pengiriman'
                                : 'Update shipping method details'}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-name">{language === 'id' ? 'Nama' : 'Name'}</Label>
                              <Input 
                                id="edit-name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-description">{language === 'id' ? 'Deskripsi' : 'Description'}</Label>
                              <Textarea 
                                id="edit-description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-baseCost">{language === 'id' ? 'Biaya Dasar ($)' : 'Base Cost ($)'}</Label>
                              <Input 
                                id="edit-baseCost" 
                                value={baseCost} 
                                onChange={(e) => setBaseCost(e.target.value)} 
                                type="number" 
                                min="0" 
                                step="0.01"
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="edit-estimatedDays">{language === 'id' ? 'Perkiraan Hari' : 'Estimated Days'}</Label>
                              <Input 
                                id="edit-estimatedDays" 
                                value={estimatedDays} 
                                onChange={(e) => setEstimatedDays(e.target.value)} 
                                type="number" 
                                min="1"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="edit-isActive" 
                                checked={isActive} 
                                onCheckedChange={setIsActive} 
                              />
                              <Label htmlFor="edit-isActive">{language === 'id' ? 'Aktif' : 'Active'}</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              {language === 'id' ? 'Batal' : 'Cancel'}
                            </Button>
                            <Button onClick={handleUpdate}>
                              {language === 'id' ? 'Simpan' : 'Save'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
