import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useVehicleUpload } from '@/hooks/useVehicleUpload';
import { Loader2, Upload, X, Plus } from 'lucide-react';

interface VehicleFormProps {
  vehicle?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const VehicleForm = ({ vehicle, onSuccess, onCancel }: VehicleFormProps) => {
  const { toast } = useToast();
  const { uploadImage, uploadMultipleImages, isUploading } = useVehicleUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    brand: vehicle?.brand || '',
    model: vehicle?.model || '',
    year: vehicle?.year || new Date().getFullYear(),
    price: vehicle?.price || 0,
    mileage: vehicle?.mileage || 0,
    engine_type: vehicle?.engine_type || '',
    transmission: vehicle?.transmission || '',
    exterior_color: vehicle?.exterior_color || '',
    interior_color: vehicle?.interior_color || '',
    description: vehicle?.description || '',
    features: vehicle?.features?.join('\n') || '',
    main_image: vehicle?.main_image || '',
    images: vehicle?.images || [],
    is_available: vehicle?.is_available ?? true,
    is_featured: vehicle?.is_featured ?? false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file, 'main');
    if (url) {
      setFormData(prev => ({ ...prev, main_image: url }));
      toast({
        title: "Image principale uploadée",
        description: "L'image a été téléchargée avec succès"
      });
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const urls = await uploadMultipleImages(files, 'gallery');
    if (urls.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...urls]
      }));
      toast({
        title: "Images uploadées",
        description: `${urls.length} image(s) ajoutée(s) à la galerie`
      });
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const featuresArray = formData.features
        .split('\n')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);

      const vehicleData = {
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        engine_type: formData.engine_type,
        transmission: formData.transmission,
        exterior_color: formData.exterior_color,
        interior_color: formData.interior_color,
        description: formData.description,
        features: featuresArray,
        main_image: formData.main_image,
        images: formData.images,
        is_available: formData.is_available,
        is_featured: formData.is_featured,
        gallery: {
          exterior: formData.images,
          interior: [],
          engine: [],
          details: []
        }
      };

      let error;
      if (vehicle?.id) {
        const result = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', vehicle.id);
        error = result.error;
      } else {
        const result = await supabase
          .from('vehicles')
          .insert([vehicleData]);
        error = result.error;
      }

      if (error) throw error;

      toast({
        title: "Succès",
        description: vehicle ? "Véhicule modifié avec succès" : "Véhicule ajouté avec succès"
      });
      onSuccess();
    } catch (error: any) {
      console.error('Error saving vehicle:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de sauvegarder le véhicule",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Marque *</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Modèle *</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Année *</Label>
          <Input
            id="year"
            name="year"
            type="number"
            min="1900"
            max="2030"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Prix (€) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mileage">Kilométrage (km) *</Label>
          <Input
            id="mileage"
            name="mileage"
            type="number"
            min="0"
            value={formData.mileage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="engine_type">Motorisation *</Label>
          <Input
            id="engine_type"
            name="engine_type"
            value={formData.engine_type}
            onChange={handleChange}
            placeholder="ex: 2.0 TDI 150ch"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transmission">Transmission *</Label>
          <Input
            id="transmission"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            placeholder="ex: Automatique DSG"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exterior_color">Couleur extérieure</Label>
          <Input
            id="exterior_color"
            name="exterior_color"
            value={formData.exterior_color}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interior_color">Couleur intérieure</Label>
          <Input
            id="interior_color"
            name="interior_color"
            value={formData.interior_color}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Équipements (un par ligne)</Label>
        <Textarea
          id="features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows={5}
          placeholder="Climatisation automatique&#10;GPS intégré&#10;Sièges cuir"
        />
      </div>

      {/* Main Image Upload */}
      <div className="space-y-2">
        <Label>Image principale</Label>
        <div className="flex items-center gap-4">
          {formData.main_image ? (
            <div className="relative">
              <img
                src={formData.main_image}
                alt="Image principale"
                className="w-32 h-24 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={() => setFormData(prev => ({ ...prev, main_image: '' }))}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="w-32 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">Upload</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleMainImageUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      </div>

      {/* Gallery Upload */}
      <div className="space-y-2">
        <Label>Galerie photos</Label>
        <div className="flex flex-wrap gap-4">
          {formData.images.map((url: string, index: number) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Gallery ${index + 1}`}
                className="w-24 h-20 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5"
                onClick={() => removeGalleryImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <label className="w-24 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
            <Plus className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Ajouter</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleGalleryUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="is_available"
            checked={formData.is_available}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_available: checked }))}
          />
          <Label htmlFor="is_available">Disponible à la vente</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
          />
          <Label htmlFor="is_featured">Mettre en avant</Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {vehicle ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;
