import { Badge } from "@/components/ui/badge";

const skills = [
  "Solidity",
  "Rust",
  "Node.js",
  "JavaScript",
  "TypeScript",
  "React",
  "Vue",
  "Hardhat",
  "Truffle",
  "Ethers.js",
  "Web3.js",
  "Substrate",
  "GraphQL",
];

const chains = [
  "Ethereum",
  "BNB Chain",
  "BSC",
  "TRON",
  "Polygon",
  "Arbitrum",
  "Optimism",
];

const About = () => {
  return (
    <section id="about" className="container py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">About</h2>
        <p className="text-muted-foreground md:text-lg">
          I specialize in designing and delivering end-to-end blockchain systems, smart contracts, and web platforms that are secure, scalable, and user-centric. I have hands-on experience across L1/L2 ecosystems including {chains.slice(0,5).join(', ')}, and more.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="card-glass rounded-xl p-6">
          <h3 className="mb-3 text-lg font-semibold">Core Tech</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Badge key={s} variant="secondary">{s}</Badge>
            ))}
          </div>
        </div>
        <div className="card-glass rounded-xl p-6">
          <h3 className="mb-3 text-lg font-semibold">Chains</h3>
          <div className="flex flex-wrap gap-2">
            {chains.map((c) => (
              <Badge key={c} variant="secondary">{c}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
