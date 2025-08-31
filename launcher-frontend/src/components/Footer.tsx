'use client'
import { Bot, Github, Twitter, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-cyan-500/20">
      <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">Launcher Agent</span>
            </div>
            <p className="mt-4 text-gray-300 max-w-md">
              El futuro de la automatización con IA. Potenciando la productividad 
              con tecnología de vanguardia.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Producto</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Inicio</a></li>
              <li><a href="#demo" className="text-gray-300 hover:text-cyan-400 transition-colors">Demo</a></li>
              <li><a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">Características</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Soporte</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Documentación</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Comunidad</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Soporte</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2025 Launcher Agent. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg hover:shadow-cyan-500/50 transition-all duration-200 hover:scale-110"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}