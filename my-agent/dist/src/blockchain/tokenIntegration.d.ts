export declare class TokenIntegration {
    private launcherService;
    private tokenCommands;
    constructor();
    private initializeBlockchain;
    registerCommands(character: any): void;
    checkBlockchainStatus(): Promise<boolean>;
    getServiceInfo(): {
        status: string;
        message: string;
        commands?: undefined;
    } | {
        status: string;
        message: string;
        commands: string[];
    };
}
export declare const tokenIntegration: TokenIntegration;
