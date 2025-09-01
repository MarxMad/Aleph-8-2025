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
                              │ HTTP API (Puerto 3001)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Agente Launcher                         │
│                   Puerto 3001                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ OpenAI API  │ │ Blockchain  │ │ HTTP Server │          │
│  │ Integration │ │ Integration │ │   (Express) │          │
│  │  (GPT-4o)   │ │ Integration │ │   (Express) │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Twitter Integration
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Twitter Client                          │
│                  @PumaagentAI                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Auto Posts  │ │ AI Replies  │ │ Engagement  │          │
│  │ DeFi Content│ │ to Mentions │ │ Analytics   │          │
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
# OpenAI Configuration (REQUERIDO)
OPENAI_API_KEY=sk-proj-...tu_api_key_real...

# Twitter Integration (OPCIONAL)
TWITTER_DRY_RUN=false
TWITTER_USERNAME=tu_usuario_twitter
TWITTER_PASSWORD=tu_password_twitter
TWITTER_EMAIL=tu_email_twitter

# AgentKit Configuration (OPCIONAL)
CDP_AGENT_KIT_NETWORK=base-mainnet
CDP_API_KEY_NAME=Agent1
CDP_API_KEY_PRIVATE_KEY=tu_private_key

# Server Configuration
SERVER_PORT=3001
DAEMON_PROCESS=false

# Blockchain Configuration (OPCIONAL)
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
[INFO] Selected model: gpt-4o
[INFO] Initializing Twitter client...
[INFO] Successfully logged in.
[INFO] Caching cookies
[SUCCESS] HTTP Server running on port 3001
[SUCCESS] Agent endpoints available at http://localhost:3001
[SUCCESS] Frontend can connect to: http://localhost:3001
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
echo "Puerto 3001 (Agente + HTTP): $(lsof -i :3001 | wc -l) servicios"
echo "Puerto 3000 (Frontend): $(lsof -i :3000 | wc -l) servicios"
echo ""
echo "=== ENDPOINTS ==="
curl -s http://localhost:3001/ | jq '.status' 2>/dev/null || echo "Agente no responde"
```

### Probar Endpoints del Agente

```bash
# Estado del agente
curl http://localhost:3001/

# Enviar mensaje
curl -X POST http://localhost:3001/Launcher/message \
  -H "Content-Type: application/json" \
  -d '{"text": "Hola", "userId": "test", "userName": "TestUser"}'
```

## 🔧 Solución de Problemas

### Problemas Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Promise.withResolvers is not a function` | Node.js < v22 | `nvm use 22` |
| `Failed to fetch` | Agente no corriendo | Iniciar agente primero |
| `Error 404` | Endpoint no encontrado | Verificar puerto 3001 |
| `Error 500` | Error interno del agente | Revisar logs del agente |
| `Unsupported engine` | Versión de Node.js incorrecta | Actualizar a v22+ |
| `Project does not have access to model` | Modelo no disponible | Verificar acceso en OpenAI dashboard |
| `Twitter login failed` | Credenciales incorrectas | Verificar .env de Twitter |

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

### Verificar Configuración

```bash
# Verificar puertos
lsof -i :3001  # Agente + HTTP Server
lsof -i :3000  # Frontend

# Verificar OpenAI API
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models

# Verificar Twitter (si está configurado)
curl http://localhost:3001/ | jq '.agentRuntime'
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

### Funcionalidades del Chat

- **Auto-scrolling** - Scroll automático a nuevos mensajes
- **Connection Status** - Indicador de estado de conexión
- **Error Handling** - Manejo robusto de errores
- **Responsive Design** - Funciona en todos los dispositivos
- **Real-time Updates** - Actualizaciones en tiempo real

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

- **Chat Inteligente** - Respuestas contextuales con GPT-4o
- **Lanzamiento de Tokens** - Integración con blockchain
- **Configuración de AI Agents** - Gestión de agentes
- **Análisis de Mercado** - Insights de trading
- **Gestión de Comunidad** - Herramientas de moderación
- **Twitter Integration** - Posts automáticos y engagement
- **Auto-scrolling Chat** - Interfaz de chat mejorada

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

### Integración con Twitter

- **Auto-posting** - Publicaciones automáticas sobre DeFi y AI agents
- **AI Replies** - Respuestas inteligentes a menciones
- **Content Generation** - Generación automática de contenido técnico
- **Engagement Analytics** - Métricas de interacción
- **Personality** - Personalidad única de Launcher (@PumaagentAI)

## 📁 Estructura del Proyecto

```
Aleph-8-2025/
├── my-agent/                    # Agente de IA
│   ├── src/
│   │   ├── blockchain/         # Integración blockchain
│   │   ├── commands/           # Comandos del agente
│   │   ├── config/             # Configuración
│   │   ├── database/           # Base de datos
│   │   ├── clients/            # Clientes (Twitter, Discord)
│   │   ├── httpServer.ts       # Servidor HTTP Express
│   │   └── index.ts            # Punto de entrada
│   ├── characters/             # Configuración de personajes
│   │   └── launcher.character.json  # Character de Launcher
│   ├── .env.example           # Variables de entorno
│   └── package.json           # Dependencias del agente
├── launcher-frontend/          # Frontend web
│   ├── src/
│   │   ├── app/               # Páginas Next.js
│   │   ├── components/        # Componentes React
│   │   │   ├── ChatInterface.tsx    # Interfaz de chat
│   │   │   ├── Demo.tsx             # Demo del chat
│   │   │   └── ConnectionStatus.tsx # Estado de conexión
│   │   └── services/          # Servicios de API
│   │       └── agentService.ts      # Servicio del agente
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
- **OpenAI**: Usar `sk-proj-...` format para proyectos
- **Twitter**: Credenciales seguras en `.env`

### Configuración de Modelos

- **Modelo Principal**: `gpt-4o` (configurado en character)
- **Fallback**: Sistema de respaldo para errores de API
- **Rate Limiting**: Protección contra uso excesivo

### Blockchain

- **Nunca** compartir private keys
- Usar wallets de desarrollo para testing
- Implementar rate limiting en endpoints
- Validar todas las entradas de usuario

## 🚀 Despliegue

### Desarrollo Local

```bash
# Agente (con Twitter habilitado)
cd my-agent
DAEMON_PROCESS=true pnpm start --characters="characters/launcher.character.json"

# Frontend
cd launcher-frontend
pnpm dev
```

### Configuración de Twitter

Para habilitar Twitter, asegúrate de que en `characters/launcher.character.json`:
```json
{
  "clients": ["twitter"],
  "model": "gpt-4o"
}
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

- **OpenAI** - Por proporcionar la API de GPT-4o
- **Next.js Team** - Por el framework web
- **Tailwind CSS** - Por el sistema de diseño
- **Ethereum Community** - Por la infraestructura blockchain
- **ElizaOS Team** - Por el framework de agentes
- **Twitter API** - Por la integración de redes sociales

## 📞 Soporte

- **Issues:** [GitHub Issues](https://github.com/MarxMad/Aleph-8-2025/issues)
- **Discussions:** [GitHub Discussions](https://github.com/MarxMad/Aleph-8-2025/discussions)
- **Wiki:** [Documentación detallada](https://github.com/MarxMad/Aleph-8-2025/wiki)

## 🐛 Troubleshooting Rápido

### Twitter no funciona
```bash
# Verificar configuración
cat my-agent/characters/launcher.character.json | grep -A 2 -B 2 "twitter"

# Verificar logs
tail -f my-agent/logs/agent.log | grep -i twitter
```

### Chat no responde
```bash
# Verificar agente
curl http://localhost:3001/

# Verificar frontend
curl http://localhost:3000/
```

### Error de modelo OpenAI
```bash
# Verificar API key
echo $OPENAI_API_KEY | head -c 20

# Verificar acceso a modelos
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models | jq '.data[].id'
```

## 🌟 Roadmap

- [x] **v1.0** - Agente base con OpenAI GPT-4o ✅
- [x] **v1.1** - Integración con Twitter ✅
- [x] **v1.2** - Frontend con chat interactivo ✅
- [x] **v1.3** - Auto-scrolling y UX mejorada ✅
- [ ] **v1.4** - Dashboard de analytics
- [ ] **v1.5** - Mobile app nativa
- [ ] **v2.0** - Multi-tenant architecture
- [ ] **v2.1** - AI agent marketplace

---

**⭐ Si este proyecto te gusta, ¡déjanos una estrella en GitHub!**

---

<div align="center">
  <p>Hecho con ❤️ por el equipo de Launcher Agent</p>
  <p><strong>Construyendo el futuro de los tokens con IA</strong></p>
</div>
