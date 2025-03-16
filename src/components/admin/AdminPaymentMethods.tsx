
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  details: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BankAccount {
  bank_name: string;
  account_name: string;
  account_number: string;
  routing_number?: string;
  swift_code?: string;
}

interface CryptoWallet {
  currency: string;
  address: string;
  network?: string;
}

export const AdminPaymentMethods = () => {
  const [activeTab, setActiveTab] = useState("payment-methods");
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [isEditMethodOpen, setIsEditMethodOpen] = useState(false);
  const [isDeleteMethodOpen, setIsDeleteMethodOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    name: '',
    type: 'bank',
    details: { bank_name: '', account_name: '', account_number: '' },
    is_active: true
  });

  const { data: paymentMethods, isLoading, refetch } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as PaymentMethod[];
    }
  });

  const handleAddMethod = async () => {
    try {
      if (!newMethod.name) {
        toast.error("Method name is required");
        return;
      }

      // Validate method details
      if (newMethod.type === 'bank') {
        const details = newMethod.details as BankAccount;
        if (!details.bank_name || !details.account_name || !details.account_number) {
          toast.error("Bank name, account name, and account number are required");
          return;
        }
      } else if (newMethod.type === 'crypto') {
        const details = newMethod.details as CryptoWallet;
        if (!details.currency || !details.address) {
          toast.error("Cryptocurrency and wallet address are required");
          return;
        }
      }

      const { error } = await supabase
        .from('payment_methods')
        .insert({
          name: newMethod.name,
          type: newMethod.type,
          details: newMethod.details,
          is_active: newMethod.is_active !== undefined ? newMethod.is_active : true
        });

      if (error) throw error;
      
      toast.success('Payment method added successfully');
      setIsAddMethodOpen(false);
      setNewMethod({
        name: '',
        type: 'bank',
        details: { bank_name: '', account_name: '', account_number: '' },
        is_active: true
      });
      refetch();
    } catch (error: any) {
      console.error('Error adding payment method:', error);
      toast.error(error.message || 'Failed to add payment method');
    }
  };

  const handleEditMethod = async () => {
    if (!selectedMethod) return;
    
    try {
      // Validate method details
      if (selectedMethod.type === 'bank') {
        const details = selectedMethod.details as BankAccount;
        if (!details.bank_name || !details.account_name || !details.account_number) {
          toast.error("Bank name, account name, and account number are required");
          return;
        }
      } else if (selectedMethod.type === 'crypto') {
        const details = selectedMethod.details as CryptoWallet;
        if (!details.currency || !details.address) {
          toast.error("Cryptocurrency and wallet address are required");
          return;
        }
      }

      const { error } = await supabase
        .from('payment_methods')
        .update({
          name: selectedMethod.name,
          type: selectedMethod.type,
          details: selectedMethod.details,
          is_active: selectedMethod.is_active
        })
        .eq('id', selectedMethod.id);

      if (error) throw error;
      
      toast.success('Payment method updated successfully');
      setIsEditMethodOpen(false);
      setSelectedMethod(null);
      refetch();
    } catch (error: any) {
      console.error('Error updating payment method:', error);
      toast.error(error.message || 'Failed to update payment method');
    }
  };

  const handleDeleteMethod = async () => {
    if (!selectedMethod) return;
    
    try {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', selectedMethod.id);

      if (error) throw error;
      
      toast.success('Payment method deleted successfully');
      setIsDeleteMethodOpen(false);
      setSelectedMethod(null);
      refetch();
    } catch (error: any) {
      console.error('Error deleting payment method:', error);
      toast.error(error.message || 'Failed to delete payment method');
    }
  };

  const handleMethodTypeChange = (type: string) => {
    if (type === 'bank') {
      setNewMethod({
        ...newMethod,
        type,
        details: { bank_name: '', account_name: '', account_number: '' }
      });
    } else if (type === 'crypto') {
      setNewMethod({
        ...newMethod,
        type,
        details: { currency: 'BTC', address: '' }
      });
    }
  };

  const handleEditMethodTypeChange = (type: string) => {
    if (!selectedMethod) return;
    
    if (type === 'bank' && selectedMethod.type !== 'bank') {
      setSelectedMethod({
        ...selectedMethod,
        type,
        details: { bank_name: '', account_name: '', account_number: '' }
      });
    } else if (type === 'crypto' && selectedMethod.type !== 'crypto') {
      setSelectedMethod({
        ...selectedMethod,
        type,
        details: { currency: 'BTC', address: '' }
      });
    } else {
      setSelectedMethod({
        ...selectedMethod,
        type
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Settings</CardTitle>
        <CardDescription>
          Configure payment methods and options for your store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
            <TabsTrigger value="crypto-wallets">Crypto Wallets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment-methods">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <Button onClick={() => setIsAddMethodOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Method
              </Button>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div>
                {paymentMethods?.length === 0 ? (
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <p className="text-muted-foreground">No payment methods available</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setIsAddMethodOpen(true)}
                    >
                      Add Your First Payment Method
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentMethods?.map((method) => (
                        <TableRow key={method.id}>
                          <TableCell>{method.name}</TableCell>
                          <TableCell className="capitalize">{method.type}</TableCell>
                          <TableCell>
                            {method.is_active ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Inactive
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedMethod(method);
                                  setIsEditMethodOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  setSelectedMethod(method);
                                  setIsDeleteMethodOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="bank-accounts">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Bank Account Configuration</h3>
              <p className="text-muted-foreground mb-6">
                Configure bank accounts for receiving payments. These details will be shown to customers during checkout.
              </p>
              
              {paymentMethods?.filter(m => m.type === 'bank' && m.is_active).length === 0 ? (
                <div className="rounded-md border border-dashed p-8 text-center">
                  <p className="text-muted-foreground">No bank accounts configured</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setNewMethod({
                        name: '',
                        type: 'bank',
                        details: { bank_name: '', account_name: '', account_number: '' },
                        is_active: true
                      });
                      setIsAddMethodOpen(true);
                    }}
                  >
                    Add Bank Account
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods
                    ?.filter(m => m.type === 'bank' && m.is_active)
                    .map((method) => {
                      const details = method.details as BankAccount;
                      return (
                        <div key={method.id} className="rounded-md border p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{method.name}</h4>
                              <p className="text-sm text-muted-foreground">{details.bank_name}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedMethod(method);
                                setIsEditMethodOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                            <div><strong>Account Name:</strong> {details.account_name}</div>
                            <div><strong>Account Number:</strong> {details.account_number}</div>
                            {details.routing_number && (
                              <div><strong>Routing Number:</strong> {details.routing_number}</div>
                            )}
                            {details.swift_code && (
                              <div><strong>SWIFT Code:</strong> {details.swift_code}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNewMethod({
                        name: '',
                        type: 'bank',
                        details: { bank_name: '', account_name: '', account_number: '' },
                        is_active: true
                      });
                      setIsAddMethodOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Bank Account
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="crypto-wallets">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Cryptocurrency Wallet Configuration</h3>
              <p className="text-muted-foreground mb-6">
                Configure cryptocurrency wallets for receiving payments. These wallet addresses will be shown to customers during checkout.
              </p>
              
              {paymentMethods?.filter(m => m.type === 'crypto' && m.is_active).length === 0 ? (
                <div className="rounded-md border border-dashed p-8 text-center">
                  <p className="text-muted-foreground">No cryptocurrency wallets configured</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setNewMethod({
                        name: '',
                        type: 'crypto',
                        details: { currency: 'BTC', address: '' },
                        is_active: true
                      });
                      setIsAddMethodOpen(true);
                    }}
                  >
                    Add Crypto Wallet
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods
                    ?.filter(m => m.type === 'crypto' && m.is_active)
                    .map((method) => {
                      const details = method.details as CryptoWallet;
                      return (
                        <div key={method.id} className="rounded-md border p-4">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{method.name}</h4>
                              <p className="text-sm text-muted-foreground">{details.currency}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedMethod(method);
                                setIsEditMethodOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className="mt-4 space-y-2 text-sm">
                            <div><strong>Address:</strong> {details.address}</div>
                            {details.network && (
                              <div><strong>Network:</strong> {details.network}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNewMethod({
                        name: '',
                        type: 'crypto',
                        details: { currency: 'BTC', address: '' },
                        is_active: true
                      });
                      setIsAddMethodOpen(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Crypto Wallet
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Add Payment Method Dialog */}
      <Dialog open={isAddMethodOpen} onOpenChange={setIsAddMethodOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new payment method to your store.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method-name" className="text-right">Name*</Label>
              <Input 
                id="method-name" 
                value={newMethod.name} 
                onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                className="col-span-3" 
                placeholder="Bank Transfer (BCA)"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="method-type" className="text-right">Type*</Label>
              <Select 
                value={newMethod.type} 
                onValueChange={handleMethodTypeChange}
              >
                <SelectTrigger id="method-type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newMethod.type === 'bank' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bank-name" className="text-right">Bank Name*</Label>
                  <Input 
                    id="bank-name" 
                    value={(newMethod.details as BankAccount)?.bank_name || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, bank_name: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="Bank of America"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account-name" className="text-right">Account Name*</Label>
                  <Input 
                    id="account-name" 
                    value={(newMethod.details as BankAccount)?.account_name || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, account_name: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="account-number" className="text-right">Account Number*</Label>
                  <Input 
                    id="account-number" 
                    value={(newMethod.details as BankAccount)?.account_number || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, account_number: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="123456789"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="routing-number" className="text-right">Routing Number</Label>
                  <Input 
                    id="routing-number" 
                    value={(newMethod.details as BankAccount)?.routing_number || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, routing_number: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="987654321"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="swift-code" className="text-right">SWIFT Code</Label>
                  <Input 
                    id="swift-code" 
                    value={(newMethod.details as BankAccount)?.swift_code || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, swift_code: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="BOFAUS3N"
                  />
                </div>
              </>
            )}
            
            {newMethod.type === 'crypto' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="crypto-currency" className="text-right">Currency*</Label>
                  <Select 
                    value={(newMethod.details as CryptoWallet)?.currency || 'BTC'} 
                    onValueChange={(value) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, currency: value}
                    })}
                  >
                    <SelectTrigger id="crypto-currency" className="col-span-3">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT">Tether (USDT)</SelectItem>
                      <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                      <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                      <SelectItem value="XRP">XRP (XRP)</SelectItem>
                      <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                      <SelectItem value="SOL">Solana (SOL)</SelectItem>
                      <SelectItem value="DOGE">Dogecoin (DOGE)</SelectItem>
                      <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="wallet-address" className="text-right">Wallet Address*</Label>
                  <Input 
                    id="wallet-address" 
                    value={(newMethod.details as CryptoWallet)?.address || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, address: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="0x0123..."
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="network" className="text-right">Network</Label>
                  <Input 
                    id="network" 
                    value={(newMethod.details as CryptoWallet)?.network || ''} 
                    onChange={(e) => setNewMethod({
                      ...newMethod, 
                      details: {...newMethod.details, network: e.target.value}
                    })}
                    className="col-span-3" 
                    placeholder="e.g. Ethereum Mainnet, BSC, etc."
                  />
                </div>
              </>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">Status</div>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  checked={newMethod.is_active} 
                  onCheckedChange={(checked) => setNewMethod({
                    ...newMethod, 
                    is_active: checked
                  })}
                />
                <Label>Active</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMethodOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMethod}>Add Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Payment Method Dialog */}
      <Dialog open={isEditMethodOpen} onOpenChange={setIsEditMethodOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
            <DialogDescription>
              Update payment method details.
            </DialogDescription>
          </DialogHeader>
          {selectedMethod && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-method-name" className="text-right">Name*</Label>
                <Input 
                  id="edit-method-name" 
                  value={selectedMethod.name} 
                  onChange={(e) => setSelectedMethod({...selectedMethod, name: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-method-type" className="text-right">Type*</Label>
                <Select 
                  value={selectedMethod.type} 
                  onValueChange={handleEditMethodTypeChange}
                >
                  <SelectTrigger id="edit-method-type" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedMethod.type === 'bank' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-bank-name" className="text-right">Bank Name*</Label>
                    <Input 
                      id="edit-bank-name" 
                      value={(selectedMethod.details as BankAccount)?.bank_name || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, bank_name: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-account-name" className="text-right">Account Name*</Label>
                    <Input 
                      id="edit-account-name" 
                      value={(selectedMethod.details as BankAccount)?.account_name || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, account_name: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-account-number" className="text-right">Account Number*</Label>
                    <Input 
                      id="edit-account-number" 
                      value={(selectedMethod.details as BankAccount)?.account_number || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, account_number: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-routing-number" className="text-right">Routing Number</Label>
                    <Input 
                      id="edit-routing-number" 
                      value={(selectedMethod.details as BankAccount)?.routing_number || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, routing_number: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-swift-code" className="text-right">SWIFT Code</Label>
                    <Input 
                      id="edit-swift-code" 
                      value={(selectedMethod.details as BankAccount)?.swift_code || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, swift_code: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                </>
              )}
              
              {selectedMethod.type === 'crypto' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-crypto-currency" className="text-right">Currency*</Label>
                    <Select 
                      value={(selectedMethod.details as CryptoWallet)?.currency || 'BTC'} 
                      onValueChange={(value) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, currency: value}
                      })}
                    >
                      <SelectTrigger id="edit-crypto-currency" className="col-span-3">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                        <SelectItem value="USDT">Tether (USDT)</SelectItem>
                        <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
                        <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                        <SelectItem value="XRP">XRP (XRP)</SelectItem>
                        <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                        <SelectItem value="SOL">Solana (SOL)</SelectItem>
                        <SelectItem value="DOGE">Dogecoin (DOGE)</SelectItem>
                        <SelectItem value="DOT">Polkadot (DOT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-wallet-address" className="text-right">Wallet Address*</Label>
                    <Input 
                      id="edit-wallet-address" 
                      value={(selectedMethod.details as CryptoWallet)?.address || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, address: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-network" className="text-right">Network</Label>
                    <Input 
                      id="edit-network" 
                      value={(selectedMethod.details as CryptoWallet)?.network || ''} 
                      onChange={(e) => setSelectedMethod({
                        ...selectedMethod, 
                        details: {...selectedMethod.details, network: e.target.value}
                      })}
                      className="col-span-3" 
                    />
                  </div>
                </>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">Status</div>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch 
                    checked={selectedMethod.is_active} 
                    onCheckedChange={(checked) => setSelectedMethod({
                      ...selectedMethod, 
                      is_active: checked
                    })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditMethodOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMethod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Payment Method Dialog */}
      <Dialog open={isDeleteMethodOpen} onOpenChange={setIsDeleteMethodOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Payment Method</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedMethod && (
            <div className="py-4">
              <p><strong>Method:</strong> {selectedMethod.name}</p>
              <p><strong>Type:</strong> {selectedMethod.type}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteMethodOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteMethod}>Delete Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
