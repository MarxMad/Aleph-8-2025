# 🚀 Launcher Agent - AI-Powered Token Launching Platform

[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.3+-blue.svg)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Launcher** es un agente de IA especializado en lanzamiento de tokens con AI agents, conectado a un frontend web moderno que permite interactuar con el agente directamente desde una landing page atractiva.

## 🌟 Características Principales

- 🤖 **Agente de IA Inteligente** - Basado en OpenAI GPT-4
- 🪙 **Lanzamiento de Tokens** - Integración con contratos inteligentes
- 🌐 **Frontend Moderno** - Landing page con Next.js y Tailwind CSS
- 🔗 **API REST Completa** - Comunicación bidireccional agente-frontend
- 🎨 **UI/UX Tech** - Diseño moderno con tema tecnológico
- 📱 **Responsive Design** - Funciona en todos los dispositivos
- 🔐 **Seguridad** - Manejo seguro de API keys y configuraciones

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
│                     Puerto 3000                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │    Hero     │ │  Features   │ │    Demo     │          │
│  │             │ │             │ │   (Chat)    │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP API (Puerto 3002)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Agente Launcher                         │
│                   Puerto 3001                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ OpenAI API  │ │ Blockchain  │ │ HTTP Server │          │
│  │ Integration │ │ Integration │ │   (Express) │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** v22+ (requerido)
- **pnpm** (gestor de paquetes)
- **Git** configurado
- **API Keys** de OpenAI, Twitter, CDP (opcionales)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MarxMad/Aleph-8-2025.git
cd Aleph-8-2025

# Instalar dependencias del agente
cd my-agent
pnpm install

# Instalar dependencias del frontend
cd ../launcher-frontend
pnpm install
```

### Configuración

```bash
# En my-agent/
cp .env.example .env

# Editar .env con tus API keys
nano .env
```

**Ejemplo de .env:**
```env
# Configuración del Agente
SERVER_PORT=3001

# API Keys (REEMPLAZAR CON TUS PROPIAS)
OPENAI_API_KEY=sk-...tu_api_key_real...
TWITTER_API_KEY=tu_twitter_api_key
CDP_API_KEY=tu_cdp_api_key

# Configuración de Blockchain (OPCIONAL)
PRIVATE_KEY=tu_private_key
RPC_URL=tu_rpc_url
FACTORY_ADDRESS=tu_factory_address
AI_AGENT_MANAGER_ADDRESS=tu_ai_agent_manager_address
CHAIN_ID=1
GAS_LIMIT=300000
GAS_PRICE=20000000000
```

## 🎯 Orden de Ejecución

**⚠️ IMPORTANTE: El orden SÍ importa**

### 1️⃣ Iniciar el Agente (PRIMERO)

```bash
cd my-agent
npx pnpm start --characters="characters/launcher.character.json"
```

**✅ Mensajes de Éxito Esperados:**
```
[INFO] Launcher - Initializing AgentRuntime
[INFO] Selected model provider: openai
[SUCCESS] HTTP Server running on port 3002
[SUCCESS] Agent endpoints available at http://localhost:3002
[SUCCESS] Frontend can connect to: http://localhost:3002
```

### 2️⃣ Iniciar el Frontend (DESPUÉS)

```bash
cd launcher-frontend
pnpm dev
```

**✅ Mensajes de Éxito Esperados:**
```
✓ Ready in 2.3s
✓ Local:        http://localhost:3000
✓ Network:      http://192.168.x.x:3000
```

### 3️⃣ Probar la Conexión (ÚLTIMO)

1. Abrir http://localhost:3000
2. Desplazarse a la sección "Demo"
3. Escribir mensaje: "Hola" o "¿Cómo estás?"
4. Presionar Enter o botón enviar

## 🧪 Verificación del Sistema

### Comando de Verificación Completa

```bash
# Verificar todos los servicios
echo "=== VERIFICACIÓN DEL SISTEMA ==="
echo "Node.js: $(node --version)"
echo "pnpm: $(pnpm --version)"
echo ""
echo "=== PUERTOS ==="
echo "Puerto 3001 (Agente): $(lsof -i :3001 | wc -l) servicios"
echo "Puerto 3002 (HTTP): $(lsof -i :3002 | wc -l) servicios"
echo "Puerto 3000 (Frontend): $(lsof -i :3000 | wc -l) servicios"
echo ""
echo "=== ENDPOINTS ==="
curl -s http://localhost:3002/ | jq '.status' 2>/dev/null || echo "Agente no responde"
```

### Probar Endpoints del Agente

```bash
# Estado del agente
curl http://localhost:3002/

# Enviar mensaje
curl -X POST http://localhost:3002/Launcher/message \
  -H "Content-Type: application/json" \
  -d '{"text": "Hola", "userId": "test", "userName": "TestUser"}'
```

## 🔧 Solución de Problemas

### Problemas Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Promise.withResolvers is not a function` | Node.js < v22 | `nvm use 22` |
| `Failed to fetch` | Agente no corriendo | Iniciar agente primero |
| `Error 404` | Endpoint no encontrado | Verificar puerto 3002 |
| `Error 500` | Error interno del agente | Revisar logs del agente |
| `Unsupported engine` | Versión de Node.js incorrecta | Actualizar a v22+ |

### Verificar Versiones

```bash
# Verificar Node.js
node --version  # Debe ser v22+

# Verificar pnpm
pnpm --version  # Debe ser 9.15.3+

# Si Node.js es incorrecto
nvm install 22
nvm use 22

# Reinstalar pnpm globalmente
npm uninstall -g pnpm
npm install -g pnpm
```

### Reiniciar Servicios

```bash
# Detener todos los servicios
pkill -f "pnpm start"
pkill -f "pnpm dev"

# Reiniciar agente
cd my-agent
npx pnpm start --characters="characters/launcher.character.json"

# En otra terminal, reiniciar frontend
cd launcher-frontend
pnpm dev
```

## 🎨 Características del Frontend

### Componentes Principales

- **Hero Section** - Presentación principal del agente
- **Features** - Características destacadas
- **Demo** - Chat interactivo con el agente
- **Testimonials** - Casos de uso y estadísticas
- **Footer** - Enlaces y navegación

### Tecnologías Utilizadas

- **Next.js 15.5.2** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos modernos
- **Responsive Design** - Mobile-first approach

### Tema Visual

- **Estilo Tech** - Diseño tecnológico moderno
- **Colores** - Azul cian y verde tech
- **Sin degradados** - Estilo limpio y profesional
- **Grid patterns** - Patrones de fondo tecnológicos

## 🤖 Características del Agente

### Capacidades Principales

- **Chat Inteligente** - Respuestas contextuales
- **Lanzamiento de Tokens** - Integración con blockchain
- **Configuración de AI Agents** - Gestión de agentes
- **Análisis de Mercado** - Insights de trading
- **Gestión de Comunidad** - Herramientas de moderación

### Comandos Disponibles

```bash
# Comandos de Tokens
createToken <nombre> <símbolo> <supply> [enableAI]
configureAI <tokenAddress> <config>
getTokenInfo <tokenAddress>
getUserTokens <userAddress>

# Comandos de AI Agents
createAIAgent <tokenAddress> <agentType>
getTokenAgents <tokenAddress>

# Comandos de Ayuda
help
tokenHelp
```

### Integración con Blockchain

- **Ethereum** - Contratos inteligentes
- **Smart Contracts** - Factory, AI Agent Manager
- **Web3** - Interacción con blockchain
- **Gas Optimization** - Optimización de transacciones

## 📁 Estructura del Proyecto

```
Aleph-8-2025/
├── my-agent/                    # Agente de IA
│   ├── src/
│   │   ├── blockchain/         # Integración blockchain
│   │   ├── commands/           # Comandos del agente
│   │   ├── config/             # Configuración
│   │   ├── database/           # Base de datos
│   │   └── index.ts            # Punto de entrada
│   ├── characters/             # Configuración de personajes
│   ├── .env.example           # Variables de entorno
│   └── package.json           # Dependencias del agente
├── launcher-frontend/          # Frontend web
│   ├── src/
│   │   ├── app/               # Páginas Next.js
│   │   ├── components/        # Componentes React
│   │   └── services/          # Servicios de API
│   ├── public/                # Archivos estáticos
│   └── package.json           # Dependencias del frontend
├── Launcher/                   # Contratos inteligentes
│   ├── AIAgentManager.sol     # Gestor de agentes AI
│   ├── Factory.sol            # Factory de tokens
│   └── Launcher.sol           # Contrato principal
└── README.md                  # Este archivo
```

## 🔐 Seguridad

### API Keys

- **Nunca** commits API keys reales
- Usar archivo `.env` (incluido en `.gitignore`)
- Rotar API keys regularmente
- Usar variables de entorno en producción

### Blockchain

- **Nunca** compartir private keys
- Usar wallets de desarrollo para testing
- Implementar rate limiting en endpoints
- Validar todas las entradas de usuario

## 🚀 Despliegue

### Desarrollo Local

```bash
# Agente
cd my-agent
npx pnpm start --characters="characters/launcher.character.json"

# Frontend
cd launcher-frontend
pnpm dev
```

### Producción

```bash
# Build del frontend
cd launcher-frontend
pnpm build
pnpm start

# Agente como servicio
cd my-agent
pm2 start ecosystem.config.js
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Guías de Contribución

- Seguir el estilo de código existente
- Agregar tests para nuevas funcionalidades
- Documentar cambios en el README
- Verificar que todos los tests pasen

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **OpenAI** - Por proporcionar la API de GPT-4
- **Next.js Team** - Por el framework web
- **Tailwind CSS** - Por el sistema de diseño
- **Ethereum Community** - Por la infraestructura blockchain

## 📞 Soporte

- **Issues:** [GitHub Issues](https://github.com/MarxMad/Aleph-8-2025/issues)
- **Discussions:** [GitHub Discussions](https://github.com/MarxMad/Aleph-8-2025/discussions)
- **Wiki:** [Documentación detallada](https://github.com/MarxMad/Aleph-8-2025/wiki)

## 🌟 Roadmap

- [ ] **v1.1** - Integración con más blockchains
- [ ] **v1.2** - Dashboard de analytics
- [ ] **v1.3** - Mobile app nativa
- [ ] **v2.0** - Multi-tenant architecture
- [ ] **v2.1** - AI agent marketplace

---

**⭐ Si este proyecto te gusta, ¡déjanos una estrella en GitHub!**

---

<div align="center">
  <p>Hecho con ❤️ por el equipo de Launcher Agent</p>
  <p><strong>Construyendo el futuro de los tokens con IA</strong></p>
</div>
