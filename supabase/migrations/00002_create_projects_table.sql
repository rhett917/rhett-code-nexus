-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Projects are viewable by everyone" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert projects" ON public.projects
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update projects" ON public.projects
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete projects" ON public.projects
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create updated_at trigger
CREATE TRIGGER handle_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial projects data
INSERT INTO public.projects (title, description, tags, link, display_order) VALUES
  ('DeFi Liquidity Protocol', 'Smart contracts enabling pooled liquidity, yield farming, and governance.', ARRAY['Solidity', 'Hardhat', 'Ethers.js', 'React'], '#', 1),
  ('NFT Marketplace', 'Scalable marketplace with lazy minting, auctions, and royalties.', ARRAY['Solidity', 'Next.js', 'Web3.js', 'IPFS'], '#', 2),
  ('Cross-chain Bridge POC', 'Secure asset transfer across chains with relayers and attestations.', ARRAY['Rust', 'Substrate', 'TypeScript'], '#', 3),
  ('DAO Governance Dashboard', 'On-chain voting, proposals, and analytics with snapshot strategies.', ARRAY['Vue', 'GraphQL', 'Ethers.js'], '#', 4),
  ('Payments dApp', 'Non-custodial crypto payments with multi-chain support.', ARRAY['React', 'Node.js', 'Polygon', 'BNB Chain'], '#', 5),
  ('Gaming Token Economy', 'Tokenomics with staking, rewards, and marketplace integrations.', ARRAY['Solidity', 'Hardhat', 'TRON', 'BSC'], '#', 6);