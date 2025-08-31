const stats = [
  { name: 'Agentes Activos', value: '1,247', change: '+12%' },
  { name: 'Uptime', value: '99.9%', change: '+0.1%' },
  { name: 'Transacciones', value: '2.4M', change: '+23%' },
  { name: 'Usuarios', value: '89.2K', change: '+18%' }
];

const testimonials = [
  {
    content: "Launcher Agent ha revolucionado completamente nuestra estrategia DeFi. La velocidad y precisión son increíbles.",
    author: "María González",
    company: "DeFi Protocol Labs"
  },
  {
    content: "La capacidad de automatización es impresionante. Hemos reducido nuestro tiempo de desarrollo en un 70%.",
    author: "Carlos Rodríguez",
    company: "Blockchain Solutions"
  },
  {
    content: "El análisis en tiempo real nos da una ventaja competitiva enorme. Es como tener un equipo completo de analistas.",
    author: "Ana Martínez",
    company: "Crypto Ventures"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black border-t border-cyan-500/20">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Estadísticas <span className="text-cyan-400">Tecnológicas</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Métricas en tiempo real del rendimiento del agente
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-300">{stat.name}</div>
              <div className="mt-1 text-xs text-green-400 font-mono">+{stat.change}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-gray-900 border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 text-green-400">
                    ★
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                  <span className="text-cyan-400 font-bold">{testimonial.author[0]}</span>
                </div>
                <div className="ml-3">
                  <div className="text-white font-medium">{testimonial.author}</div>
                  <div className="text-sm text-cyan-400">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}