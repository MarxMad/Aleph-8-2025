import { LauncherService } from '../blockchain/launcherService.js';
export declare class TokenCommands {
    private launcherService;
    constructor(launcherService: LauncherService);
    createToken(params: string[]): Promise<string>;
    configureAI(params: string[]): Promise<string>;
    createAIAgent(params: string[]): Promise<string>;
    getTokenInfo(params: string[]): Promise<string>;
    getUserTokens(params: string[]): Promise<string>;
    getAllTokens(): Promise<string>;
    getTokenAgents(params: string[]): Promise<string>;
    help(): Promise<string>;
}
