import { Bot, ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black border-b border-cyan-500/30">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="w-2 h-2 mr-2 bg-cyan-400 rounded-full animate-pulse"></div>
            AI Agent Launcher v2.0
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="text-cyan-400">Launcher</span>
            <span className="text-green-400"> Agent</span>
          </h1>
          
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-300">
            El agente de inteligencia artificial más avanzado para automatizar tareas, 
            gestionar proyectos y potenciar tu productividad con tecnología de vanguardia.
          </p>
          
          <div className="flex items-center justify-center mt-10 gap-x-6">
            <a
              href="#demo"
              className="px-8 py-3 text-sm font-semibold text-black bg-cyan-400 border border-cyan-400 hover:bg-cyan-300 hover:border-cyan-300 transition-all duration-200 rounded-md"
            >
              Probar Ahora
            </a>
            <a
              href="#features"
              className="px-8 py-3 text-sm font-semibold text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-200 rounded-md"
            >
              Ver Características
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}