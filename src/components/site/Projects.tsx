import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import LoginDialog from "./LoginDialog";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
};

const initialProjects: Project[] = [
  {
    id: "1",
    title: "DeFi Liquidity Protocol",
    description: "Smart contracts enabling pooled liquidity, yield farming, and governance.",
    tags: ["Solidity", "Hardhat", "Ethers.js", "React"],
    link: "#",
  },
  {
    id: "2",
    title: "NFT Marketplace",
    description: "Scalable marketplace with lazy minting, auctions, and royalties.",
    tags: ["Solidity", "Next.js", "Web3.js", "IPFS"],
    link: "#",
  },
  {
    id: "3",
    title: "Cross-chain Bridge POC",
    description: "Secure asset transfer across chains with relayers and attestations.",
    tags: ["Rust", "Substrate", "TypeScript"],
    link: "#",
  },
  {
    id: "4",
    title: "DAO Governance Dashboard",
    description: "On-chain voting, proposals, and analytics with snapshot strategies.",
    tags: ["Vue", "GraphQL", "Ethers.js"],
    link: "#",
  },
  {
    id: "5",
    title: "Payments dApp",
    description: "Non-custodial crypto payments with multi-chain support.",
    tags: ["React", "Node.js", "Polygon", "BNB Chain"],
    link: "#",
  },
  {
    id: "6",
    title: "Gaming Token Economy",
    description: "Tokenomics with staking, rewards, and marketplace integrations.",
    tags: ["Solidity", "Hardhat", "TRON", "BSC"],
    link: "#",
  },
];

const Projects = () => {
  const [projects] = useState<Project[]>(initialProjects);
  const [open, setOpen] = useState(false);

  return (
    <section id="projects" className="container py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">Projects</h2>
          <p className="text-muted-foreground">Selected work across DeFi, NFTs, governance, and more.</p>
        </div>
        <div>
          <Button variant="ghost" onClick={() => setOpen(true)}>Sign in to manage</Button>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.id} className="card-glass hover-scale">
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
              <div className="flex justify-end">
                <a href={p.link} target="_blank" rel="noreferrer" className="story-link">
                  <Button variant="outline" size="sm">Visit <ExternalLink className="ml-1" /></Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <LoginDialog open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default Projects;
