
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Allow authenticated users to upload payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Allow service role to access all payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to view their own payment proofs" ON storage.objects;

-- Nouvelle politique pour permettre à tous les utilisateurs d'uploader des preuves de paiement
CREATE POLICY "Allow anyone to upload payment proofs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-proofs');

-- Politique pour permettre à tous de lire les preuves de paiement (nécessaire pour les URLs signées)
CREATE POLICY "Allow anyone to view payment proofs"
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-proofs');
