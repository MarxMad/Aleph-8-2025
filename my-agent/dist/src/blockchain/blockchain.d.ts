export interface TokenCreationData {
    name: string;
    symbol: string;
    totalSupply: number;
    enableAIAgents: boolean;
}
export interface AIAgentConfig {
    communityManager: boolean;
    marketingAI: boolean;
    dataAnalyst: boolean;
    tradingAssistant: boolean;
}
export interface TokenInfo {
    name: string;
    symbol: string;
    totalSupply: bigint;
    decimals: number;
    launchTimestamp: bigint;
}
export interface BlockchainResponse {
    success: boolean;
    data?: any;
    error?: string;
    transactionHash?: string;
    tokenAddress?: string;
    agentId?: string;
}
export interface AgentCreationData {
    tokenAddress: string;
    agentType: string;
    budget: number;
    configuration: string;
}
