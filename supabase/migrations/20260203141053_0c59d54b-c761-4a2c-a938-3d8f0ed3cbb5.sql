-- Drop the restrictive policy for viewing vehicles
DROP POLICY IF EXISTS "Anyone can view available vehicles" ON public.vehicles;

-- Create a permissive policy for public viewing of available vehicles
CREATE POLICY "Anyone can view available vehicles" 
ON public.vehicles 
FOR SELECT 
TO public
USING (is_available = true);

-- Make sure admins policy is permissive and can see ALL vehicles
DROP POLICY IF EXISTS "Admins can manage all vehicles" ON public.vehicles;

CREATE POLICY "Admins can manage all vehicles" 
ON public.vehicles 
FOR ALL 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));