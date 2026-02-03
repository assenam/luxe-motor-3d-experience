import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Plus, ExternalLink, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Receipt {
  id: string;
  order_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  transaction_id: string | null;
  receipt_url: string | null;
  notes: string | null;
  created_at: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
}

const AdminReceipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersMap, setOrdersMap] = useState<Record<string, Order>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [newReceipt, setNewReceipt] = useState({
    order_id: '',
    amount: 0,
    payment_method: '',
    transaction_id: '',
    receipt_url: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch receipts
      const { data: receiptsData, error: receiptsError } = await supabase
        .from('payment_receipts')
        .select('*')
        .order('created_at', { ascending: false });

      if (receiptsError) throw receiptsError;

      // Fetch all orders for the dropdown and mapping
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, total_amount')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const ordersMapping: Record<string, Order> = {};
      ordersData?.forEach(order => {
        ordersMapping[order.id] = order;
      });

      setReceipts(receiptsData || []);
      setOrders(ordersData || []);
      setOrdersMap(ordersMapping);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('payment_receipts')
        .insert([{
          order_id: newReceipt.order_id,
          amount: Number(newReceipt.amount),
          payment_method: newReceipt.payment_method,
          transaction_id: newReceipt.transaction_id || null,
          receipt_url: newReceipt.receipt_url || null,
          notes: newReceipt.notes || null
        }]);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Reçu créé avec succès"
      });

      setIsDialogOpen(false);
      setNewReceipt({
        order_id: '',
        amount: 0,
        payment_method: '',
        transaction_id: '',
        receipt_url: '',
        notes: ''
      });
      fetchData();
    } catch (error: any) {
      console.error('Error creating receipt:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le reçu",
        variant: "destructive"
      });
    }
  };

  const handleDeleteReceipt = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce reçu ?')) return;

    try {
      const { error } = await supabase
        .from('payment_receipts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setReceipts(receipts.filter(r => r.id !== id));
      toast({
        title: "Succès",
        description: "Reçu supprimé"
      });
    } catch (error) {
      console.error('Error deleting receipt:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le reçu",
        variant: "destructive"
      });
    }
  };

  const filteredReceipts = receipts.filter(receipt => {
    const order = ordersMap[receipt.order_id];
    if (!order) return false;
    return `${order.customer_name} ${order.customer_email}`.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reçus de paiement</h1>
            <p className="text-muted-foreground">Gérez les reçus et preuves de paiement</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Créer un reçu
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nouveau reçu de paiement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateReceipt} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order_id">Commande *</Label>
                  <Select
                    value={newReceipt.order_id}
                    onValueChange={(value) => {
                      const order = ordersMap[value];
                      setNewReceipt(prev => ({
                        ...prev,
                        order_id: value,
                        amount: order ? order.total_amount : 0
                      }));
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une commande" />
                    </SelectTrigger>
                    <SelectContent>
                      {orders.map(order => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.customer_name} - {Number(order.total_amount).toLocaleString('fr-FR')} €
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Montant (€) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newReceipt.amount}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_method">Méthode de paiement *</Label>
                  <Select
                    value={newReceipt.payment_method}
                    onValueChange={(value) => setNewReceipt(prev => ({ ...prev, payment_method: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                      <SelectItem value="card">Carte bancaire</SelectItem>
                      <SelectItem value="cash">Espèces</SelectItem>
                      <SelectItem value="check">Chèque</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction_id">ID de transaction</Label>
                  <Input
                    id="transaction_id"
                    value={newReceipt.transaction_id}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, transaction_id: e.target.value }))}
                    placeholder="Référence de la transaction"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt_url">Lien du reçu</Label>
                  <Input
                    id="receipt_url"
                    type="url"
                    value={newReceipt.receipt_url}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, receipt_url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newReceipt.notes}
                    onChange={(e) => setNewReceipt(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Créer le reçu
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredReceipts.length} reçu(s)
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredReceipts.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Aucun reçu trouvé
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Méthode</TableHead>
                      <TableHead>Référence</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReceipts.map((receipt) => {
                      const order = ordersMap[receipt.order_id];
                      const methodLabels: Record<string, string> = {
                        bank_transfer: 'Virement',
                        card: 'Carte',
                        cash: 'Espèces',
                        check: 'Chèque',
                        other: 'Autre'
                      };
                      
                      return (
                        <TableRow key={receipt.id}>
                          <TableCell>
                            {format(new Date(receipt.payment_date), 'dd MMM yyyy', { locale: fr })}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order?.customer_name || '-'}</p>
                              <p className="text-sm text-muted-foreground">{order?.customer_email || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">
                            {Number(receipt.amount).toLocaleString('fr-FR')} €
                          </TableCell>
                          <TableCell>
                            {methodLabels[receipt.payment_method] || receipt.payment_method}
                          </TableCell>
                          <TableCell>
                            {receipt.transaction_id || '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {receipt.receipt_url && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                >
                                  <a href={receipt.receipt_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteReceipt(receipt.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReceipts;
