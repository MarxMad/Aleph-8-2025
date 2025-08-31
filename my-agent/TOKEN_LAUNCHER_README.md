# 🚀 Token Launcher - Guía de Implementación

## 📋 **Resumen**
El agente Launcher ahora puede crear y gestionar tokens usando contratos inteligentes de Ethereum. Esta funcionalidad permite lanzar tokens con AI agents integrados.

## 🏗️ **Arquitectura Implementada**

### **Estructura de Archivos:**
```
my-agent/src/
├── blockchain/
│   ├── blockchain.ts          # Tipos TypeScript
│   ├── launcherService.ts     # Servicio de blockchain
│   └── tokenIntegration.ts    # Integración con el agente
├── commands/
│   └── tokenCommands.ts       # Comandos del agente
└── index.ts                   # Agente principal (modificado)
```

## ⚙️ **Configuración Requerida**

### **1. Variables de Entorno (.env)**
```bash
# Blockchain Configuration
PRIVATE_KEY=tu_clave_privada_aqui_sin_0x
RPC_URL=https://sepolia.infura.io/v3/tu_api_key_infura
FACTORY_ADDRESS=0x... # Dirección del contrato Factory desplegado
AI_AGENT_MANAGER_ADDRESS=0x... # Dirección del AIAgentManager desplegado

# Network Configuration
CHAIN_ID=11155111 # Sepolia testnet
GAS_LIMIT=3000000
GAS_PRICE=20000000000 # 20 gwei
```

### **2. Dependencias Instaladas**
```bash
pnpm add ethers@^6.0.0
```

## 🎯 **Comandos Disponibles**

### **Comandos Principales:**

#### **1. createToken**
```bash
createToken <nombre> <símbolo> <supply> [enableAI]
```
**Ejemplo:** `createToken MiDeFiToken MDT 1000000 true`

**Parámetros:**
- `nombre`: Nombre completo del token (mín 3 caracteres)
- `símbolo`: Símbolo del token (mín 2 caracteres)  
- `supply`: Cantidad total de tokens
- `enableAI`: true/false para habilitar AI agents

#### **2. configureAI**
```bash
configureAI <tokenAddress> <community> <marketing> <data> <trading>
```
**Ejemplo:** `configureAI 0x123... true false true false`

**Parámetros:**
- `tokenAddress`: Dirección del contrato del token
- `community`: true/false para Community Manager
- `marketing`: true/false para Marketing AI
- `data`: true/false para Data Analyst
- `trading`: true/false para Trading Assistant

#### **3. createAIAgent**
```bash
createAIAgent <tokenAddress> <tipo> <budget> <config>
```
**Ejemplo:** `createAIAgent 0x123... community 0.1 Gestión de comunidad`

**Parámetros:**
- `tokenAddress`: Dirección del contrato del token
- `tipo`: community, marketing, data, trading
- `budget`: Presupuesto en ETH
- `config`: Configuración del agente (texto)

#### **4. getTokenInfo**
```bash
getTokenInfo <tokenAddress>
```
**Ejemplo:** `getTokenInfo 0x123...`

#### **5. getUserTokens**
```bash
getUserTokens <userAddress>
```
**Ejemplo:** `getUserTokens 0x123...`

#### **6. getAllTokens**
```bash
getAllTokens
```

#### **7. getTokenAgents**
```bash
getTokenAgents <tokenAddress>
```
**Ejemplo:** `getTokenAgents 0x123...`

#### **8. tokenHelp**
```bash
tokenHelp
```

## 🔧 **Contratos Inteligentes Requeridos**

### **1. Factory.sol**
- **Función:** `createToken()`
- **Propósito:** Crear nuevos tokens
- **Fee:** 0.01 ETH por token

### **2. Launcher.sol (TokenPuma)**
- **Función:** `configureAIAgents()`
- **Propósito:** Configurar AI agents para tokens
- **Características:** ERC20 estándar con AI agents

### **3. AIAgentManager.sol**
- **Función:** `createAgent()`
- **Propósito:** Gestionar AI agents individuales
- **Tipos:** community, marketing, data, trading

## 🚀 **Flujo de Uso Típico**

### **Paso 1: Crear Token**
```bash
createToken MiDeFiToken MDT 1000000 true
```

### **Paso 2: Configurar AI Agents**
```bash
configureAI 0x[tokenAddress] true true false true
```

### **Paso 3: Crear AI Agent Específico**
```bash
createAIAgent 0x[tokenAddress] community 0.1 Gestión de comunidad y moderación
```

### **Paso 4: Verificar Estado**
```bash
getTokenInfo 0x[tokenAddress]
getTokenAgents 0x[tokenAddress]
```

## ⚠️ **Consideraciones Importantes**

### **Seguridad:**
- **PRIVATE_KEY**: Nunca compartir o commitear
- **RPC_URL**: Usar endpoints seguros (Infura, Alchemy)
- **Contratos**: Verificar en Etherscan antes de usar

### **Redes:**
- **Testnet**: Sepolia para pruebas
- **Mainnet**: Ethereum para producción
- **Gas**: Configurar límites apropiados

### **Costos:**
- **Creación de Token:** 0.01 ETH + gas
- **Configuración AI:** Solo gas
- **Creación de Agent:** Solo gas

## 🔍 **Troubleshooting**

### **Error: "Blockchain no inicializado"**
- Verificar variables de entorno
- Comprobar conexión RPC
- Validar direcciones de contratos

### **Error: "Insufficient fee"**
- Verificar que tienes suficiente ETH
- Comprobar fee actual del contrato

### **Error: "Token not authorized"**
- Verificar que el token esté en AIAgentManager
- Comprobar permisos del usuario

## 📚 **Recursos Adicionales**

### **Documentación:**
- [Ethers.js v6](https://docs.ethers.org/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
- [Solidity](https://docs.soliditylang.org/)

### **Herramientas:**
- [Etherscan](https://etherscan.io/) - Explorador de bloques
- [Sepolia Faucet](https://sepoliafaucet.com/) - ETH de prueba
- [Remix IDE](https://remix.ethereum.org/) - Desarrollo de contratos

## 🎉 **¡Listo para Usar!**

El agente Launcher ahora tiene capacidades completas de token launching. Puedes:

1. ✅ Crear tokens ERC20
2. ✅ Configurar AI agents
3. ✅ Gestionar presupuestos
4. ✅ Monitorear estado
5. ✅ Interactuar con contratos

¡Empieza a lanzar tokens con AI agents integrados! 🚀
