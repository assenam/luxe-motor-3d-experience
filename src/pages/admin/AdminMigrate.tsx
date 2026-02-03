import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { vehicles } from '@/lib/vehicles';
import { Loader2, Database, Check, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AdminMigrate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [migrated, setMigrated] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();

  const handleMigrate = async () => {
    setIsLoading(true);
    setProgress(0);
    setMigrated(0);
    setErrors([]);
    setCompleted(false);

    const total = vehicles.length;
    let successCount = 0;
    const errorList: string[] = [];

    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i];
      
      try {
        // Check if vehicle already exists
        const { data: existing } = await supabase
          .from('vehicles')
          .select('id')
          .eq('id', vehicle.id)
          .single();

        if (existing) {
          // Skip if already exists
          successCount++;
          setProgress(Math.round(((i + 1) / total) * 100));
          setMigrated(successCount);
          continue;
        }

        // Insert vehicle
        const { error } = await supabase
          .from('vehicles')
          .insert({
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            price: vehicle.price,
            mileage: vehicle.mileage,
            engine_type: vehicle.engineType,
            transmission: vehicle.transmission,
            exterior_color: vehicle.exteriorColor,
            interior_color: vehicle.interiorColor,
            description: vehicle.description,
            features: vehicle.features,
            main_image: vehicle.mainImage,
            images: vehicle.images,
            gallery: vehicle.gallery,
            is_available: true,
            is_featured: false
          });

        if (error) {
          errorList.push(`${vehicle.brand} ${vehicle.model}: ${error.message}`);
        } else {
          successCount++;
        }
      } catch (err) {
        errorList.push(`${vehicle.brand} ${vehicle.model}: ${String(err)}`);
      }

      setProgress(Math.round(((i + 1) / total) * 100));
      setMigrated(successCount);
    }

    setErrors(errorList);
    setCompleted(true);
    setIsLoading(false);

    if (errorList.length === 0) {
      toast({
        title: "Migration terminée !",
        description: `${successCount} véhicules ont été migrés avec succès.`
      });
    } else {
      toast({
        title: "Migration terminée avec des erreurs",
        description: `${successCount} véhicules migrés, ${errorList.length} erreurs.`,
        variant: "destructive"
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold">Migration des données</h1>
          <p className="text-muted-foreground">
            Importez les véhicules existants dans la base de données
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Importer les véhicules
            </CardTitle>
            <CardDescription>
              Cette action va importer {vehicles.length} véhicules depuis les fichiers statiques vers la base de données.
              Les véhicules déjà présents seront ignorés.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!completed ? (
              <>
                <Button 
                  onClick={handleMigrate} 
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Migration en cours... ({migrated}/{vehicles.length})
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      Lancer la migration
                    </>
                  )}
                </Button>

                {isLoading && (
                  <div className="space-y-2">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground text-center">
                      {progress}% - {migrated} véhicules traités
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    {migrated} véhicules migrés avec succès
                  </span>
                </div>

                {errors.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-medium">{errors.length} erreur(s)</span>
                    </div>
                    <div className="max-h-40 overflow-y-auto bg-red-50 p-3 rounded border border-red-200 text-sm">
                      {errors.map((err, i) => (
                        <p key={i} className="text-red-700">{err}</p>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => window.location.href = '/admin/vehicles'}
                  className="w-full"
                >
                  Voir les véhicules
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminMigrate;