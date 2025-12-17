import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, RefreshCw, Bus, Users, Tags, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function VehicleManagement() {
  const [activeTab, setActiveTab] = useState('vehicles');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold tracking-tight">Vehicle Management</h2>
            <p className="text-muted-foreground">Manage your fleet, operators, and vehicle categories.</p>
        </div>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="vehicles" className="flex items-center gap-2">
            <Bus className="w-4 h-4" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger value="operators" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Operators
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tags className="w-4 h-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          <VehiclesList />
        </TabsContent>
        <TabsContent value="operators" className="space-y-4">
          <OperatorsList />
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <CategoriesList />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function VehiclesList() {
    const { toast } = useToast();
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<any>(null);

    const fetchVehicles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('vehicles')
            .select('*, operator:operators(business_name, contact_number)')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching vehicles:', error);
            toast({ title: 'Error', description: 'Failed to fetch vehicles', variant: 'destructive' });
        } else {
            setVehicles(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle?')) return;

        const { error } = await supabase.from('vehicles').delete().eq('id', id);
        
        if (error) {
            toast({ title: 'Error', description: 'Failed to delete vehicle', variant: 'destructive' });
        } else {
            toast({ title: 'Success', description: 'Vehicle deleted successfully' });
            fetchVehicles();
        }
    };

    const handleEdit = (vehicle: any) => {
        setEditingVehicle(vehicle);
        setIsDialogOpen(true);
    };

    const handleAddNew = () => {
        setEditingVehicle(null);
        setIsDialogOpen(true);
    };

    const handleFormSuccess = () => {
        setIsDialogOpen(false);
        fetchVehicles();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button onClick={handleAddNew}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Vehicle
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Layout</TableHead>
                            <TableHead>Operator</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                                    <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : vehicles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">No vehicles found.</TableCell>
                            </TableRow>
                        ) : (
                            vehicles.map((v) => (
                                <TableRow key={v.id}>
                                    <TableCell className="font-medium">{v.name}</TableCell>
                                    <TableCell className="capitalize">{v.type}</TableCell>
                                    <TableCell>{v.is_ac ? 'AC' : 'Non-AC'}</TableCell>
                                    <TableCell>{v.seating_capacity} Seats</TableCell>
                                    <TableCell>{v.bus_layout || '2x2'}</TableCell>
                                    <TableCell>{v.operator?.business_name || '-'}</TableCell>
                                    <TableCell>
                                        {v.agent_contact_number ? (
                                            <a href={`tel:${v.agent_contact_number}`} className="flex items-center gap-1 hover:underline text-primary">
                                                <Users className="w-3 h-3" />
                                                {v.agent_contact_number}
                                            </a>
                                        ) : v.operator?.contact_number ? (
                                            <a href={`tel:${v.operator.contact_number}`} className="flex items-center gap-1 hover:underline text-primary">
                                                <Bus className="w-3 h-3" />
                                                {v.operator.contact_number}
                                            </a>
                                        ) : '-'}
                                    </TableCell>
                                    <TableCell>{v.price_display}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            v.availability_status === 'available' ? 'default' :
                                            v.availability_status === 'limited' ? 'secondary' : 'destructive'
                                        }>
                                            {v.availability_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(v)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(v.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <VehicleDialog 
                open={isDialogOpen} 
                onOpenChange={setIsDialogOpen} 
                vehicle={editingVehicle}
                onSuccess={handleFormSuccess}
            />
        </div>
    );
}

function VehicleDialog({ open, onOpenChange, vehicle, onSuccess }: { 
    open: boolean; 
    onOpenChange: (open: boolean) => void; 
    vehicle?: any; 
    onSuccess: () => void;
}) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [operators, setOperators] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        type: 'bus',
        is_ac: true,
        seating_capacity: '',
        price_display: '',
        amenities: '',
        images: '',
        description: '',
        availability_status: 'available',
        bus_layout: '2x2',
        operator_id: '',
        agent_contact_number: ''
    });

    useEffect(() => {
        const fetchOperators = async () => {
            const { data } = await supabase.from('operators').select('id, business_name');
            if (data) setOperators(data);
        };
        fetchOperators();
    }, []);

    useEffect(() => {
        if (vehicle) {
            setFormData({
                name: vehicle.name || '',
                type: vehicle.type || 'bus',
                is_ac: vehicle.is_ac ?? true,
                seating_capacity: vehicle.seating_capacity?.toString() || '',
                price_display: vehicle.price_display || '',
                amenities: (vehicle.amenities || []).join(', '),
                images: (vehicle.images || []).join(', '),
                description: vehicle.description || '',
                availability_status: vehicle.availability_status || 'available',
                bus_layout: vehicle.bus_layout || '2x2',
                operator_id: vehicle.operator_id || '',
                agent_contact_number: vehicle.agent_contact_number || ''
            });
        } else {
            setFormData({
                name: '',
                type: 'bus',
                is_ac: true,
                seating_capacity: '',
                price_display: '',
                amenities: '',
                images: '/images/bus-1.jpg',
                description: '',
                availability_status: 'available',
                bus_layout: '2x2',
                operator_id: '',
                agent_contact_number: ''
            });
        }
    }, [vehicle, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                seating_capacity: parseInt(formData.seating_capacity) || 0,
                amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
                images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
                operator_id: (formData.operator_id === 'none' || !formData.operator_id) ? null : formData.operator_id,
                agent_contact_number: formData.agent_contact_number || null
            };

            if (vehicle?.id) {
                const { error } = await supabase
                    .from('vehicles')
                    .update(payload)
                    .eq('id', vehicle.id);
                if (error) throw error;
                toast({ title: 'Success', description: 'Vehicle updated successfully' });
            } else {
                const { error } = await supabase
                    .from('vehicles')
                    .insert([payload]);
                if (error) throw error;
                toast({ title: 'Success', description: 'Vehicle created successfully' });
            }
            onSuccess();
        } catch (error: any) {
            console.error('Error saving vehicle:', error);
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Vehicle Name</Label>
                            <Input 
                                id="name" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select 
                                value={formData.type} 
                                onValueChange={val => setFormData({...formData, type: val})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bus">Bus</SelectItem>
                                    <SelectItem value="traveller">Tempo Traveller</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Seating Capacity</Label>
                            <Input 
                                id="capacity" 
                                type="number"
                                value={formData.seating_capacity} 
                                onChange={e => setFormData({...formData, seating_capacity: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price Display (e.g., ₹18,000)</Label>
                            <Input 
                                id="price" 
                                value={formData.price_display} 
                                onChange={e => setFormData({...formData, price_display: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ac">Category</Label>
                            <Select 
                                value={formData.is_ac ? 'ac' : 'non-ac'} 
                                onValueChange={val => setFormData({...formData, is_ac: val === 'ac'})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ac">AC</SelectItem>
                                    <SelectItem value="non-ac">Non-AC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Availability Status</Label>
                            <Select 
                                value={formData.availability_status} 
                                onValueChange={val => setFormData({...formData, availability_status: val})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="limited">Limited</SelectItem>
                                    <SelectItem value="booked">Booked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bus-layout">Bus Layout</Label>
                            <Select 
                                value={formData.bus_layout} 
                                onValueChange={val => setFormData({...formData, bus_layout: val})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select layout" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2x2">2x2</SelectItem>
                                    <SelectItem value="1x2">1x2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="operator">Bus Owner / Operator</Label>
                            <Select 
                                value={formData.operator_id} 
                                onValueChange={val => setFormData({...formData, operator_id: val})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select operator" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {operators.map(op => (
                                        <SelectItem key={op.id} value={op.id}>{op.business_name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agent-contact">Agent/Driver Contact</Label>
                            <Input 
                                id="agent-contact" 
                                value={formData.agent_contact_number} 
                                onChange={e => setFormData({...formData, agent_contact_number: e.target.value})} 
                                placeholder="e.g., +91 9876543210"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="amenities">Amenities (comma separated)</Label>
                        <Textarea 
                            id="amenities" 
                            value={formData.amenities} 
                            onChange={e => setFormData({...formData, amenities: e.target.value})} 
                            placeholder="WiFi, AC, Charging Points"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="images">Image URLs (comma separated)</Label>
                        <Textarea 
                            id="images" 
                            value={formData.images} 
                            onChange={e => setFormData({...formData, images: e.target.value})} 
                            placeholder="/images/bus-1.jpg"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description" 
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                            rows={4}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <RefreshCw className="w-4 h-4 animate-spin mr-2" />}
                            {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function OperatorsList() {
    const { toast } = useToast();
    const [operators, setOperators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingOperator, setEditingOperator] = useState<any>(null);
    const [formData, setFormData] = useState({
        business_name: '',
        contact_person: '',
        contact_number: '',
        city: '',
        address: ''
    });

    const fetchOperators = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('operators').select('*').order('created_at', { ascending: false });
        if (!error) setOperators(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchOperators();
    }, []);

    const handleOpenDialog = (operator: any = null) => {
        if (operator) {
            setEditingOperator(operator);
            // Since we store city combined in address, we just put everything in address for editing
            // or we could try to split it if we really wanted to.
            setFormData({
                business_name: operator.business_name,
                contact_person: operator.contact_person,
                contact_number: operator.contact_number,
                city: '', // Leave empty as it's merged into address
                address: operator.address || ''
            });
        } else {
            setEditingOperator(null);
            setFormData({
                business_name: '',
                contact_person: '',
                contact_number: '',
                city: '',
                address: ''
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.business_name || !formData.contact_number) {
            toast({
                title: "Validation Error",
                description: "Business name and contact number are required.",
                variant: "destructive"
            });
            return;
        }

        try {
            // Combine city and address for storage since 'city' column might not exist
            const fullAddress = formData.city 
                ? (formData.address ? `${formData.address}, ${formData.city}` : formData.city)
                : formData.address;

            const payload = {
                business_name: formData.business_name,
                contact_person: formData.contact_person,
                contact_number: formData.contact_number,
                address: fullAddress
                // city is excluded to avoid schema error
            };

            if (editingOperator) {
                const { error } = await supabase
                    .from('operators')
                    .update(payload)
                    .eq('id', editingOperator.id);
                
                if (error) throw error;
                toast({ title: "Success", description: "Operator updated successfully." });
            } else {
                const { error } = await supabase
                    .from('operators')
                    .insert([payload]);
                
                if (error) throw error;
                toast({ title: "Success", description: "Operator added successfully." });
            }
            setIsDialogOpen(false);
            fetchOperators();
        } catch (error: any) {
            console.error('Error saving operator:', error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Bus Owners / Operators</h3>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Bus Owner
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business Name</TableHead>
                            <TableHead>Contact Person</TableHead>
                            <TableHead>Contact Number</TableHead>
                            <TableHead>City/Address</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : operators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No operators found.</TableCell>
                            </TableRow>
                        ) : (
                            operators.map((op) => (
                                <TableRow key={op.id}>
                                    <TableCell className="font-medium">{op.business_name}</TableCell>
                                    <TableCell>{op.contact_person}</TableCell>
                                    <TableCell>
                                        <a href={`tel:${op.contact_number}`} className="flex items-center gap-1 hover:underline text-primary">
                                            <Bus className="w-3 h-3" />
                                            {op.contact_number}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm">{op.address || '-'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${op.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {op.is_verified ? 'Verified' : 'Pending'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(op)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingOperator ? 'Edit Bus Owner' : 'Add New Bus Owner'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="business_name">Business Name</Label>
                            <Input 
                                id="business_name" 
                                value={formData.business_name} 
                                onChange={e => setFormData({...formData, business_name: e.target.value})} 
                                placeholder="e.g. Royal Travels"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact_person">Contact Person</Label>
                            <Input 
                                id="contact_person" 
                                value={formData.contact_person} 
                                onChange={e => setFormData({...formData, contact_person: e.target.value})} 
                                placeholder="e.g. Rajesh Kumar"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact_number">Contact Number</Label>
                            <Input 
                                id="contact_number" 
                                value={formData.contact_number} 
                                onChange={e => setFormData({...formData, contact_number: e.target.value})} 
                                placeholder="e.g. +91 9876543210"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input 
                                    id="city" 
                                    value={formData.city} 
                                    onChange={e => setFormData({...formData, city: e.target.value})} 
                                    placeholder="e.g. Bhubaneswar"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input 
                                    id="address" 
                                    value={formData.address} 
                                    onChange={e => setFormData({...formData, address: e.target.value})} 
                                    placeholder="Full address"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Bus Owner</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function CategoriesList() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', slug: '' });

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('vehicle_categories').select('*');
        if (!error) setCategories(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategory.name || !newCategory.slug) return;
        const { error } = await supabase.from('vehicle_categories').insert([newCategory]);
        if (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Success', description: 'Category added' });
            setNewCategory({ name: '', slug: '' });
            fetchCategories();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Input 
                    placeholder="Category Name" 
                    value={newCategory.name}
                    onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                    className="max-w-[200px]"
                />
                <Input 
                    placeholder="Slug (e.g., luxury-bus)" 
                    value={newCategory.slug}
                    onChange={e => setNewCategory({...newCategory, slug: e.target.value})}
                    className="max-w-[200px]"
                />
                <Button onClick={handleAddCategory}>Add Category</Button>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.slug}</TableCell>
                                <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
