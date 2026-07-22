interface GetClaudeConfigOptions {
    apiKey?: string;
    traceparent?: string;
}
interface PromptLayerClaudeAgentsPlugin {
    type: "local";
    path: string;
}
interface PromptLayerClaudeAgentsEnv {
    TRACE_TO_PROMPTLAYER: "true";
    PROMPTLAYER_API_KEY: string;
    PROMPTLAYER_TRACEPARENT?: string;
}
interface PromptLayerClaudeAgentsConfig {
    plugin: PromptLayerClaudeAgentsPlugin;
    env: PromptLayerClaudeAgentsEnv;
}
declare function getClaudeConfig(options?: GetClaudeConfigOptions): PromptLayerClaudeAgentsConfig;

export { type GetClaudeConfigOptions, type PromptLayerClaudeAgentsConfig, type PromptLayerClaudeAgentsEnv, type PromptLayerClaudeAgentsPlugin, getClaudeConfig };
