
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Edit, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ShippingMethod {
  id: string;
  name: string;
  description: string | null;
  base_cost: number;
  estimated_days: number | null;
  is_active: boolean | null;
  available_to: string[];
}

export const AdminShipping = () => {
  const { t } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(null);
  const [newShippingMethod, setNewShippingMethod] = useState<Partial<ShippingMethod>>({
    name: '',
    description: '',
    base_cost: 0,
    estimated_days: 3,
    is_active: true,
    available_to: ['admin', 'user']
  });

  const { data: shippingMethods, isLoading, refetch } = useQuery({
    queryKey: ['shipping-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shipping_methods')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      // Transform data to include available_to field
      return (data || []).map(method => ({
        ...method,
        available_to: method.available_to || ['admin', 'user']
      })) as ShippingMethod[];
    }
  });

  const handleAddShippingMethod = async () => {
    try {
      const { error } = await supabase
        .from('shipping_methods')
        .insert({
          name: newShippingMethod.name || '',
          description: newShippingMethod.description || '',
          base_cost: newShippingMethod.base_cost || 0,
          estimated_days: newShippingMethod.estimated_days || null,
          is_active: newShippingMethod.is_active !== undefined ? newShippingMethod.is_active : true,
          available_to: newShippingMethod.available_to || ['admin', 'user']
        });

      if (error) throw error;
      
      toast.success("Shipping method added successfully");
      setIsAddDialogOpen(false);
      setNewShippingMethod({
        name: '',
        description: '',
        base_cost: 0,
        estimated_days: 3,
        is_active: true,
        available_to: ['admin', 'user']
      });
      refetch();
    } catch (error: any) {
      console.error("Error adding shipping method:", error);
      toast.error(error.message || "Failed to add shipping method");
    }
  };

  const handleEditShippingMethod = async () => {
    if (!selectedMethod) return;
    
    try {
      const { error } = await supabase
        .from('shipping_methods')
        .update({
          name: selectedMethod.name,
          description: selectedMethod.description,
          base_cost: selectedMethod.base_cost,
          estimated_days: selectedMethod.estimated_days,
          is_active: selectedMethod.is_active,
          available_to: selectedMethod.available_to
        })
        .eq('id', selectedMethod.id);

      if (error) throw error;
      
      toast.success("Shipping method updated successfully");
      setIsEditDialogOpen(false);
      setSelectedMethod(null);
      refetch();
    } catch (error: any) {
      console.error("Error updating shipping method:", error);
      toast.error(error.message || "Failed to update shipping method");
    }
  };

  const handleDeleteShippingMethod = async () => {
    if (!selectedMethod) return;
    
    try {
      const { error } = await supabase
        .from('shipping_methods')
        .delete()
        .eq('id', selectedMethod.id);

      if (error) throw error;
      
      toast.success("Shipping method deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedMethod(null);
      refetch();
    } catch (error: any) {
      console.error("Error deleting shipping method:", error);
      toast.error(error.message || "Failed to delete shipping method");
    }
  };

  const toggleAvailability = (method: ShippingMethod, type: 'admin' | 'user') => {
    const updatedMethod = { ...method };
    
    if (updatedMethod.available_to.includes(type)) {
      updatedMethod.available_to = updatedMethod.available_to.filter(t => t !== type);
    } else {
      updatedMethod.available_to.push(type);
    }
    
    setSelectedMethod(updatedMethod);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('admin.shipping')}</CardTitle>
        <CardDescription>
          Configure shipping methods and availability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-between items-center">
          <h3 className="text-lg font-medium">Shipping Methods</h3>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Method
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {shippingMethods?.length === 0 ? (
              <div className="rounded-md border border-dashed p-8 text-center">
                <p className="text-muted-foreground">No shipping methods available</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Add Your First Shipping Method
                </Button>
              </div>
            ) : (
              shippingMethods?.map((method) => (
                <div key={method.id} className="rounded-md border p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium flex items-center">
                        {method.name}
                        {!method.is_active && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {method.description || "No description provided"}
                      </p>
                      <div className="mt-2 text-sm">
                        <div><strong>Cost:</strong> ${method.base_cost}</div>
                        {method.estimated_days && (
                          <div><strong>Estimated Delivery:</strong> {method.estimated_days} days</div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setSelectedMethod(method);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => {
                          setSelectedMethod(method);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <h4 className="text-sm font-medium mb-2">Available To:</h4>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`admin-${method.id}`}
                          checked={method.available_to?.includes('admin') ?? true}
                          onChange={() => {
                            const updatedMethod = { ...method };
                            if (updatedMethod.available_to?.includes('admin')) {
                              updatedMethod.available_to = updatedMethod.available_to.filter(t => t !== 'admin');
                            } else {
                              updatedMethod.available_to = [...(updatedMethod.available_to || []), 'admin'];
                            }
                            
                            // Update the shipping method in the database
                            supabase
                              .from('shipping_methods')
                              .update({ available_to: updatedMethod.available_to })
                              .eq('id', method.id)
                              .then(({ error }) => {
                                if (error) {
                                  toast.error(`Failed to update availability: ${error.message}`);
                                } else {
                                  refetch();
                                }
                              });
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`admin-${method.id}`}>Administrators</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`user-${method.id}`}
                          checked={method.available_to?.includes('user') ?? true}
                          onChange={() => {
                            const updatedMethod = { ...method };
                            if (updatedMethod.available_to?.includes('user')) {
                              updatedMethod.available_to = updatedMethod.available_to.filter(t => t !== 'user');
                            } else {
                              updatedMethod.available_to = [...(updatedMethod.available_to || []), 'user'];
                            }
                            
                            // Update the shipping method in the database
                            supabase
                              .from('shipping_methods')
                              .update({ available_to: updatedMethod.available_to })
                              .eq('id', method.id)
                              .then(({ error }) => {
                                if (error) {
                                  toast.error(`Failed to update availability: ${error.message}`);
                                } else {
                                  refetch();
                                }
                              });
                          }}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`user-${method.id}`}>Regular Users</Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>

      {/* Add Shipping Method Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Shipping Method</DialogTitle>
            <DialogDescription>
              Create a new shipping method for your customers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input 
                id="name" 
                value={newShippingMethod.name} 
                onChange={(e) => setNewShippingMethod({...newShippingMethod, name: e.target.value})}
                className="col-span-3" 
                placeholder="Express Shipping"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea 
                id="description" 
                value={newShippingMethod.description || ''} 
                onChange={(e) => setNewShippingMethod({...newShippingMethod, description: e.target.value})}
                className="col-span-3" 
                placeholder="Fast delivery within 2-3 business days"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">Cost ($)</Label>
              <Input 
                id="cost" 
                type="number"
                step="0.01"
                min="0"
                value={newShippingMethod.base_cost} 
                onChange={(e) => setNewShippingMethod({
                  ...newShippingMethod, 
                  base_cost: parseFloat(e.target.value) || 0
                })}
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="days" className="text-right">Est. Days</Label>
              <Input 
                id="days" 
                type="number"
                min="1"
                value={newShippingMethod.estimated_days || ''} 
                onChange={(e) => setNewShippingMethod({
                  ...newShippingMethod, 
                  estimated_days: parseInt(e.target.value) || null
                })}
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">Status</div>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  checked={newShippingMethod.is_active} 
                  onCheckedChange={(checked) => setNewShippingMethod({
                    ...newShippingMethod, 
                    is_active: checked
                  })}
                />
                <Label>Active</Label>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">Available To</div>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available-admin"
                    checked={newShippingMethod.available_to?.includes('admin') ?? true}
                    onChange={() => {
                      const current = newShippingMethod.available_to || [];
                      setNewShippingMethod({
                        ...newShippingMethod, 
                        available_to: current.includes('admin') 
                          ? current.filter(t => t !== 'admin')
                          : [...current, 'admin']
                      });
                    }}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="available-admin">Administrators</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available-user"
                    checked={newShippingMethod.available_to?.includes('user') ?? true}
                    onChange={() => {
                      const current = newShippingMethod.available_to || [];
                      setNewShippingMethod({
                        ...newShippingMethod, 
                        available_to: current.includes('user') 
                          ? current.filter(t => t !== 'user')
                          : [...current, 'user']
                      });
                    }}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="available-user">Regular Users</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddShippingMethod}>Add Shipping Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Shipping Method Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shipping Method</DialogTitle>
            <DialogDescription>
              Update shipping method details.
            </DialogDescription>
          </DialogHeader>
          {selectedMethod && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input 
                  id="edit-name" 
                  value={selectedMethod.name} 
                  onChange={(e) => setSelectedMethod({...selectedMethod, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={selectedMethod.description || ''} 
                  onChange={(e) => setSelectedMethod({...selectedMethod, description: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cost" className="text-right">Cost ($)</Label>
                <Input 
                  id="edit-cost" 
                  type="number"
                  step="0.01"
                  min="0"
                  value={selectedMethod.base_cost} 
                  onChange={(e) => setSelectedMethod({
                    ...selectedMethod, 
                    base_cost: parseFloat(e.target.value)
                  })}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-days" className="text-right">Est. Days</Label>
                <Input 
                  id="edit-days" 
                  type="number"
                  min="1"
                  value={selectedMethod.estimated_days || ''} 
                  onChange={(e) => setSelectedMethod({
                    ...selectedMethod, 
                    estimated_days: e.target.value ? parseInt(e.target.value) : null
                  })}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Status</div>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch 
                    checked={selectedMethod.is_active || false} 
                    onCheckedChange={(checked) => setSelectedMethod({
                      ...selectedMethod, 
                      is_active: checked
                    })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <div className="text-right pt-2">Available To</div>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-available-admin"
                      checked={selectedMethod.available_to?.includes('admin') ?? true}
                      onChange={() => toggleAvailability(selectedMethod, 'admin')}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="edit-available-admin">Administrators</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-available-user"
                      checked={selectedMethod.available_to?.includes('user') ?? true}
                      onChange={() => toggleAvailability(selectedMethod, 'user')}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="edit-available-user">Regular Users</Label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditShippingMethod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Shipping Method Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Shipping Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this shipping method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedMethod && (
            <div className="py-4">
              <p><strong>Method:</strong> {selectedMethod.name}</p>
              <p><strong>Cost:</strong> ${selectedMethod.base_cost}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteShippingMethod}>Delete Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
