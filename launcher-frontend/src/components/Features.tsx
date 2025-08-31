'use client';

import { Brain, Code, Database, Lock, Rocket, Globe, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    name: "Inteligencia Avanzada",
    description: "Alimentado por GPT-4, el agente entiende y responde a consultas complejas sobre DeFi, tokenomics y blockchain."
  },
  {
    icon: Code,
    name: "Smart Contracts",
    description: "Experto en desarrollo y auditoría de contratos inteligentes, con conocimiento profundo de Solidity y Cairo."
  },
  {
    icon: Database,
    name: "Análisis de Datos",
    description: "Procesa y analiza datos on-chain en tiempo real para tomar decisiones informadas sobre estrategias DeFi."
  },
  {
    icon: Lock,
    name: "Seguridad",
    description: "Implementa las mejores prácticas de seguridad y auditoría para proteger activos digitales y protocolos."
  },
  {
    icon: Rocket,
    name: "Despliegue Rápido",
    description: "Lanza nuevos agentes y protocolos en minutos, no en días, con herramientas automatizadas."
  },
  {
    icon: Globe,
    name: "Multi-Chain",
    description: "Opera en múltiples blockchains incluyendo Ethereum, Starknet, Polygon y más."
  },
  {
    icon: Shield,
    name: "Governance",
    description: "Sistema de gobernanza descentralizada para la toma de decisiones comunitarias."
  },
  {
    icon: Zap,
    name: "Performance",
    description: "Optimizado para máxima velocidad y eficiencia en transacciones y cálculos."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Características <span className="text-cyan-400">Tecnológicas</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Potenciado con las últimas tecnologías de IA y automatización
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="flex-none w-5 h-5 text-cyan-400">
                      <IconComponent />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="flex flex-col flex-auto gap-y-3 mt-4 text-sm leading-6 text-gray-300">
                    <p>{feature.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400 font-mono">ACTIVO</span>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}