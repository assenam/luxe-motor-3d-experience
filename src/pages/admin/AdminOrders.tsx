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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, Eye, Car, User, CreditCard, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Order {
  id: string;
  user_id: string | null;
  vehicle_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
}

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  main_image: string | null;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [vehicles, setVehicles] = useState<Record<string, Vehicle>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch vehicles for orders
      const vehicleIds = ordersData
        ?.filter(o => o.vehicle_id)
        .map(o => o.vehicle_id) || [];

      if (vehicleIds.length > 0) {
        const { data: vehiclesData } = await supabase
          .from('vehicles')
          .select('id, brand, model, year, main_image')
          .in('id', vehicleIds);

        if (vehiclesData) {
          const vehiclesMap: Record<string, Vehicle> = {};
          vehiclesData.forEach(v => {
            vehiclesMap[v.id] = v;
          });
          setVehicles(vehiclesMap);
        }
      }

      setOrders(ordersData || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, status: newStatus } : o
      ));

      toast({
        title: "Statut mis à jour",
        description: "Le statut de la commande a été modifié"
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive"
      });
    }
  };

  const updatePaymentStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(o => 
        o.id === orderId ? { ...o, payment_status: newStatus } : o
      ));

      toast({
        title: "Statut de paiement mis à jour",
        description: "Le statut de paiement a été modifié"
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut de paiement",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string, type: 'order' | 'payment') => {
    const orderColors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const paymentColors: Record<string, string> = {
      pending: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800'
    };
    const orderLabels: Record<string, string> = {
      pending: 'En attente',
      processing: 'En cours',
      completed: 'Complétée',
      cancelled: 'Annulée'
    };
    const paymentLabels: Record<string, string> = {
      pending: 'En attente',
      paid: 'Payé',
      failed: 'Échoué',
      refunded: 'Remboursé'
    };

    const colors = type === 'order' ? orderColors : paymentColors;
    const labels = type === 'order' ? orderLabels : paymentLabels;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = `${o.customer_name} ${o.customer_email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Commandes</h1>
          <p className="text-muted-foreground">Gérez toutes les commandes clients</p>
        </div>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="processing">En cours</SelectItem>
                  <SelectItem value="completed">Complétées</SelectItem>
                  <SelectItem value="cancelled">Annulées</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                {filteredOrders.length} commande(s)
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredOrders.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                Aucune commande trouvée
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Paiement</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => {
                      const vehicle = order.vehicle_id ? vehicles[order.vehicle_id] : null;
                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            {format(new Date(order.created_at), 'dd MMM yyyy', { locale: fr })}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{order.customer_name}</p>
                              <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {vehicle ? (
                              <div className="flex items-center gap-2">
                                {vehicle.main_image && (
                                  <img
                                    src={vehicle.main_image}
                                    alt={`${vehicle.brand} ${vehicle.model}`}
                                    className="w-12 h-8 object-cover rounded"
                                  />
                                )}
                                <span className="text-sm">
                                  {vehicle.brand} {vehicle.model} {vehicle.year}
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {Number(order.total_amount).toLocaleString('fr-FR')} €
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status, 'order')}</TableCell>
                          <TableCell>{getStatusBadge(order.payment_status, 'payment')}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
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

        {/* Order Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de la commande</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <User className="w-4 h-4" />
                    Informations client
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nom</p>
                      <p className="font-medium">{selectedOrder.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{selectedOrder.customer_phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Adresse</p>
                      <p className="font-medium">{selectedOrder.customer_address || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Info */}
                {selectedOrder.vehicle_id && vehicles[selectedOrder.vehicle_id] && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <Car className="w-4 h-4" />
                      Véhicule
                    </h3>
                    <div className="flex items-center gap-4">
                      {vehicles[selectedOrder.vehicle_id].main_image && (
                        <img
                          src={vehicles[selectedOrder.vehicle_id].main_image!}
                          alt="Vehicle"
                          className="w-24 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {vehicles[selectedOrder.vehicle_id].brand} {vehicles[selectedOrder.vehicle_id].model}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Année: {vehicles[selectedOrder.vehicle_id].year}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <CreditCard className="w-4 h-4" />
                    Paiement
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Montant total</p>
                      <p className="text-xl font-bold">
                        {Number(selectedOrder.total_amount).toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Méthode</p>
                      <p className="font-medium">{selectedOrder.payment_method || 'Non spécifiée'}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4" />
                      Notes
                    </h3>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status Management */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut de la commande</label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) => {
                        updateOrderStatus(selectedOrder.id, value);
                        setSelectedOrder({ ...selectedOrder, status: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="processing">En cours</SelectItem>
                        <SelectItem value="completed">Complétée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Statut du paiement</label>
                    <Select
                      value={selectedOrder.payment_status}
                      onValueChange={(value) => {
                        updatePaymentStatus(selectedOrder.id, value);
                        setSelectedOrder({ ...selectedOrder, payment_status: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="paid">Payé</SelectItem>
                        <SelectItem value="failed">Échoué</SelectItem>
                        <SelectItem value="refunded">Remboursé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
