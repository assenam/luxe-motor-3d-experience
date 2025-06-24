
-- Créer un bucket pour stocker les preuves de paiement
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', false);

-- Politique pour permettre aux utilisateurs d'uploader leurs preuves de paiement
CREATE POLICY "Allow authenticated users to upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs' AND auth.role() = 'authenticated');

-- Politique pour permettre aux admins de voir toutes les preuves de paiement
CREATE POLICY "Allow service role to access all payment proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs' AND auth.role() = 'service_role');

-- Politique pour permettre aux utilisateurs de voir leurs propres preuves
CREATE POLICY "Allow users to view their own payment proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);
