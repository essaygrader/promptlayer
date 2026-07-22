import { TracingProcessor, Trace, Span } from '@openai/agents';

interface PromptLayerOpenAIAgentsProcessorOptions {
    apiKey: string;
    baseURL: string;
    includeRawPayloads?: boolean;
}
declare class PromptLayerOpenAIAgentsProcessor implements TracingProcessor {
    private readonly apiKey;
    private readonly baseURL;
    private readonly includeRawPayloads;
    private readonly traceStates;
    private readonly completedTraceQueue;
    private readonly pendingExports;
    constructor({ apiKey, baseURL, includeRawPayloads, }: PromptLayerOpenAIAgentsProcessorOptions);
    start(): void;
    onTraceStart(trace: Trace): Promise<void>;
    onTraceEnd(trace: Trace): Promise<void>;
    onSpanStart(span: Span<any>): Promise<void>;
    onSpanEnd(span: Span<any>): Promise<void>;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
    private traceLikeFromSpan;
    private ensureTraceStateForSpan;
    private createSpanRecord;
    private statusForSpan;
    private exportPayload;
    private startExportForTrace;
    private resolveUpstreamTraceContext;
    private asRecord;
    private readString;
}

interface InstrumentOpenAIAgentsOptions {
    apiKey?: string;
    baseURL?: string;
    exclusive?: boolean;
    includeRawPayloads?: boolean;
}
declare const instrumentOpenAIAgents: ({ apiKey, baseURL, exclusive, includeRawPayloads, }?: InstrumentOpenAIAgentsOptions) => Promise<PromptLayerOpenAIAgentsProcessor>;

export { type InstrumentOpenAIAgentsOptions, PromptLayerOpenAIAgentsProcessor, type PromptLayerOpenAIAgentsProcessorOptions, instrumentOpenAIAgents };
