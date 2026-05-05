interface TrackMetadata {
    request_id: number;
    metadata: Record<string, string>;
}
interface TrackScore {
    request_id: number;
    score: number;
    name?: string;
}
interface TrackPrompt {
    request_id: number;
    prompt_name: string;
    prompt_input_variables: Record<string, unknown>;
    version?: number;
    label?: string;
}
interface TrackGroup {
    request_id: number;
    group_id: number;
}
interface Pagination {
    page?: number;
    per_page?: number;
    label?: string;
}
interface PullSkillCollectionParams {
    label?: string;
    version?: number;
    format?: string;
}
interface InitialSkillFileUpdate {
    path: string;
    content: string;
    [k: string]: unknown;
}
interface SkillFileUpdate extends InitialSkillFileUpdate {
}
interface SkillFileMove {
    from: string;
    to: string;
    [k: string]: unknown;
}
type SkillCollectionProvider = "claude_code" | "openai" | "openclaw";
interface PublishSkillCollectionFromFiles {
    name: string;
    folderId?: number;
    provider: SkillCollectionProvider;
    files?: InitialSkillFileUpdate[];
    commitMessage?: string;
}
type SkillCollectionZipSource = Blob | ArrayBuffer | Uint8Array;
interface PublishSkillCollectionFromZip {
    name: string;
    zipFile: SkillCollectionZipSource;
    fileName?: string;
    folderId?: number;
    provider: SkillCollectionProvider;
    commitMessage?: string;
}
type PublishSkillCollection = PublishSkillCollectionFromFiles | PublishSkillCollectionFromZip;
interface SaveSkillCollectionVersion {
    fileUpdates?: SkillFileUpdate[];
    moves?: SkillFileMove[];
    deletes?: string[];
    commitMessage?: string;
    releaseLabel?: string;
    provider?: SkillCollectionProvider;
}
interface UpdateSkillCollection extends SaveSkillCollectionVersion {
    name?: string;
}
interface SkillCollection {
    id: string | number;
    name: string;
    provider?: SkillCollectionProvider | null;
    folder_id?: number | null;
    created_at?: string;
    updated_at?: string;
    [k: string]: unknown;
}
interface SkillCollectionVersion {
    id?: string | number;
    version?: number;
    provider?: SkillCollectionProvider | null;
    release_label?: string | null;
    commit_message?: string | null;
    created_at?: string;
    [k: string]: unknown;
}
interface PublishSkillCollectionResponse {
    success: boolean;
    skill_collection: SkillCollection;
    version?: SkillCollectionVersion | null;
    [k: string]: unknown;
}
interface PullSkillCollectionResponse {
    success: boolean;
    skill_collection: SkillCollection;
    files: Record<string, string>;
    version: SkillCollectionVersion | null;
    [k: string]: unknown;
}
interface UpdateSkillCollectionResponse {
    success: boolean;
    skill_collection: SkillCollection;
    version?: SkillCollectionVersion | null;
    [k: string]: unknown;
}
interface CustomProvider {
    id: number;
    name: string;
    client: string;
    base_url: string;
    workspace_id: number;
    api_key: string;
}
interface GetPromptTemplateParams {
    version?: number;
    label?: string;
    provider?: string;
    input_variables?: Record<string, unknown>;
    metadata_filters?: Record<string, string>;
    model?: string;
    model_parameter_overrides?: Record<string, unknown>;
    skip_input_variable_rendering?: boolean;
}
declare const templateFormat: readonly ["f-string", "jinja2"];
type TemplateFormat = (typeof templateFormat)[number];
type FileAnnotation = {
    type: "file_citation";
    index: number;
    file_id: string;
    filename: string;
};
type WebAnnotation = {
    type: "url_citation";
    title: string;
    url: string;
    start_index: number;
    end_index: number;
    cited_text?: string;
    encrypted_index?: string;
};
type MapAnnotation = {
    type: "map_citation";
    title: string;
    url: string;
    place_id?: string;
    start_index: number;
    end_index: number;
    cited_text?: string;
};
type ContainerFileAnnotation = {
    type: "container_file_citation";
    container_id: string;
    start_index?: number;
    end_index?: number;
    filename?: string;
    file_id?: string;
};
type Annotation = WebAnnotation | FileAnnotation | MapAnnotation | ContainerFileAnnotation;
type ImageUrl = {
    url: string;
    detail?: string;
};
type TextContent = {
    id?: string;
    type: "text";
    text: string;
    annotations?: Annotation[];
    thought_signature?: string;
};
type ThinkingContent = {
    id?: string;
    signature?: string;
    type: "thinking";
    thinking: string;
};
type CodeContent = {
    id?: string;
    container_id?: string;
    type: "code";
    code: string;
    language?: string;
};
type ImageContent = {
    type: "image_url";
    image_url: ImageUrl;
    image_variable?: string;
};
type Media = {
    title: string;
    type: string;
    url?: string;
    format?: "base64" | "url" | "neither";
};
type MediaContent = {
    type: "media";
    media: Media;
};
type MediaVariable = {
    type: "media_variable";
    name: string;
};
type OutputMediaContent = {
    type: "output_media";
    id?: string;
    url: string;
    mime_type?: string;
    media_type?: "image" | "video" | "audio";
    provider_metadata?: Record<string, unknown>;
};
type ServerToolUseContent = {
    type: "server_tool_use";
    id: string;
    name: string;
    input?: Record<string, unknown>;
};
type WebSearchResult = {
    type: "web_search_result";
    url?: string;
    title?: string;
    encrypted_content?: string;
    page_age?: string;
};
type WebSearchToolResultContent = {
    type: "web_search_tool_result";
    tool_use_id: string;
    content?: WebSearchResult[];
};
type CodeExecutionResultContent = {
    type: "code_execution_result";
    output: string;
    outcome?: string;
};
type McpListToolsContent = {
    type: "mcp_list_tools";
    id?: string;
    server_label?: string;
    tools?: Record<string, unknown>[];
    error?: string | Record<string, unknown>;
};
type McpCallContent = {
    type: "mcp_call";
    id?: string;
    name?: string;
    server_label?: string;
    arguments?: string;
    output?: string;
    error?: string | Record<string, unknown>;
    approval_request_id?: string;
};
type McpApprovalRequestContent = {
    type: "mcp_approval_request";
    id?: string;
    name?: string;
    arguments?: string;
    server_label?: string;
};
type McpApprovalResponseContent = {
    type: "mcp_approval_response";
    approval_request_id: string;
    approve: boolean;
};
type BashCodeExecutionToolResultContent = {
    type: "bash_code_execution_tool_result";
    tool_use_id: string;
    content?: Record<string, unknown>;
};
type TextEditorCodeExecutionToolResultContent = {
    type: "text_editor_code_execution_tool_result";
    tool_use_id: string;
    content?: Record<string, unknown>;
};
type ShellCallContent = {
    type: "shell_call";
    id?: string;
    call_id?: string;
    action?: Record<string, unknown>;
    status?: string;
};
type ShellCallOutputContent = {
    type: "shell_call_output";
    id?: string;
    call_id?: string;
    output?: Record<string, unknown>[];
    status?: string;
};
type ApplyPatchCallContent = {
    type: "apply_patch_call";
    id?: string;
    call_id?: string;
    operation?: Record<string, unknown>;
    status?: string;
};
type ApplyPatchCallOutputContent = {
    type: "apply_patch_call_output";
    id?: string;
    call_id?: string;
    output?: string;
    status?: string;
};
type Content = TextContent | ThinkingContent | CodeContent | ImageContent | MediaContent | MediaVariable | OutputMediaContent | ServerToolUseContent | WebSearchToolResultContent | CodeExecutionResultContent | McpListToolsContent | McpCallContent | McpApprovalRequestContent | McpApprovalResponseContent | BashCodeExecutionToolResultContent | TextEditorCodeExecutionToolResultContent | ShellCallContent | ShellCallOutputContent | ApplyPatchCallContent | ApplyPatchCallOutputContent;
type Function_ = {
    name: string;
    description: string;
    strict?: boolean;
    parameters: Record<string, unknown>;
};
type FunctionCall = {
    name: string;
    arguments: string;
};
type WebSearchToolFilters = {
    allowed_domains?: string[];
};
type WebSearchToolUserLocation = {
    city?: string;
    country?: string;
    region?: string;
    timezone?: string;
    type: "approximate";
};
type OpenAIWebSearchToolConfig = {
    type: "web_search" | "web_search_2025_08_26";
    filters?: WebSearchToolFilters;
    search_context_size?: "low" | "medium" | "high";
    user_location?: WebSearchToolUserLocation;
};
type ComparisonFilter = {
    key: string;
    value: string | number | boolean;
    operation: "eq" | "ne" | "gt" | "gte" | "lt" | "lte";
};
type CompoundFilter = {
    operator: "and" | "or";
    operands: (ComparisonFilter | CompoundFilter)[];
};
type RankingOptions = {
    ranker?: "auto" | "default-2024-11-15";
    score_threshold?: number;
};
type FileSearchToolConfig = {
    type: "file_search";
    vector_store_ids: string[];
    filters?: ComparisonFilter | CompoundFilter;
    max_num_results?: number;
    ranking_options?: RankingOptions;
};
type CodeInterpreterToolConfig = {
    type: "code_interpreter";
    container?: Record<string, unknown>;
};
type ImageGenerationToolConfig = {
    type: "image_generation";
};
type ShellToolConfig = {
    type: "shell";
    environment?: Record<string, unknown>;
};
type ApplyPatchToolConfig = {
    type: "apply_patch";
};
type McpToolApprovalFilter = {
    tool_names?: string[];
};
type McpToolApproval = {
    never?: McpToolApprovalFilter;
    always?: McpToolApprovalFilter;
};
type McpToolConfig = {
    type: "mcp";
    server_label: string;
    server_url?: string;
    server_description?: string;
    connector_id?: string;
    authorization?: string;
    allowed_tools?: string[];
    require_approval?: string | McpToolApproval;
};
type BuiltInToolConfig = OpenAIWebSearchToolConfig | FileSearchToolConfig | CodeInterpreterToolConfig | ImageGenerationToolConfig | McpToolConfig | ShellToolConfig | ApplyPatchToolConfig;
type FunctionTool = {
    type: "function";
    function: Function_;
};
type BuiltInTool = {
    id: string;
    name: string;
    description: string;
    provider: string;
    type: "web_search" | "file_search" | "code_interpreter" | "image_generation" | "google_maps" | "url_context" | "mcp" | "bash" | "shell" | "apply_patch" | "text_editor";
    config: BuiltInToolConfig;
};
type RegistryTool = {
    type: "registry";
    tool_registry_id: number;
    label?: string | null;
    version_number?: number | null;
};
type Tool = FunctionTool | BuiltInTool | RegistryTool;
type SystemMessage = {
    role: "system";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content: Content[];
    name?: string;
};
type UserMessage = {
    role: "user";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content: Content[];
    name?: string;
};
type ToolCall = {
    id: string;
    tool_id?: string;
    type: "function";
    function: FunctionCall;
};
type AssistantMessage = {
    role: "assistant";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content?: Content[];
    function_call?: FunctionCall;
    name?: string;
    tool_calls?: ToolCall[];
};
type FunctionMessage = {
    role: "function";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content?: Content[];
    name: string;
};
type ToolMessage = {
    role: "tool";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content?: Content[];
    tool_call_id: string;
    name?: string;
};
type PlaceholderMessage = {
    role: "placeholder";
    name: string;
};
type DeveloperMessage = {
    role: "developer";
    input_variables?: string[];
    template_format?: TemplateFormat;
    content: Content[];
};
type Message = SystemMessage | UserMessage | AssistantMessage | FunctionMessage | ToolMessage | PlaceholderMessage | DeveloperMessage;
type ChatFunctionCall = {
    name: string;
};
type CompletionPromptTemplate = {
    type: "completion";
    template_format?: TemplateFormat;
    content: Content[];
    input_variables?: string[];
};
type ChatToolChoice = {
    type: "function";
    function: ChatFunctionCall;
};
type ToolChoice = string | ChatToolChoice;
type ChatPromptTemplate = {
    type: "chat";
    messages: Message[];
    functions?: Function_[];
    function_call?: "auto" | "none" | ChatFunctionCall;
    input_variables?: string[];
    tools?: Tool[];
    tool_choice?: ToolChoice;
};
type PromptTemplate = CompletionPromptTemplate | ChatPromptTemplate;
type Model = {
    api_type?: string;
    provider: string;
    model_config_display_name?: string;
    base_model?: string;
    name: string;
    parameters: Record<string, unknown>;
    display_params?: Record<string, string | boolean | null>;
};
type Metadata = {
    model?: Model;
};
type BasePromptTemplate = {
    prompt_name: string;
    tags?: string[];
};
type PromptBlueprint = {
    prompt_template: PromptTemplate;
    commit_message?: string;
    metadata?: Metadata;
    provider_base_url_name?: string;
    report_id?: number;
    inference_client_name?: string;
    provider_id?: number;
};
type PublishPromptTemplate = BasePromptTemplate & PromptBlueprint & {
    release_labels?: string[];
};
interface ProviderBaseURL {
    id: number;
    name: string;
    provider: string;
    url: string;
}
interface BasePromptTemplateResponse {
    id: number;
    prompt_name: string;
    tags: string[];
    prompt_template: PromptTemplate;
    commit_message?: string;
    metadata?: Metadata;
    provider_base_url?: ProviderBaseURL;
    custom_provider?: CustomProvider;
}
interface PublishPromptTemplateResponse extends BasePromptTemplateResponse {
}
interface GetPromptTemplateResponse extends BasePromptTemplateResponse {
    version: number;
    llm_kwargs: Record<string, unknown> | null;
}
interface ListPromptTemplatesResponse extends BasePromptTemplateResponse {
    version: number;
}
interface RunRequest {
    promptName: string;
    tags?: string[];
    metadata?: Record<string, string>;
    groupId?: number;
    stream?: boolean;
    promptVersion?: number;
    promptReleaseLabel?: string;
    inputVariables?: Record<string, unknown>;
    modelParameterOverrides?: Record<string, unknown>;
    provider?: string;
    model?: string;
    skipLogging?: boolean;
}
interface LogRequest {
    provider: string;
    model: string;
    input: PromptTemplate;
    output: PromptTemplate;
    request_start_time: number;
    request_end_time: number;
    parameters?: Record<string, unknown>;
    tags?: string[];
    metadata?: Record<string, string>;
    prompt_name?: string;
    prompt_version_number?: number;
    prompt_input_variables?: Record<string, unknown>;
    input_tokens?: number;
    output_tokens?: number;
    price?: number;
    function_name?: string;
    score?: number;
    prompt_id?: number;
    score_name?: string;
    api_type?: string;
    status?: "SUCCESS" | "WARNING" | "ERROR";
    error_type?: string;
    error_message?: string;
}
interface RequestLog {
    id: number;
    prompt_version: PromptBlueprint;
}
interface WorkflowRequest {
    workflowName: string;
    inputVariables?: Record<string, any>;
    metadata?: Record<string, string>;
    workflowLabelName?: string | null;
    workflowVersion?: number | null;
    returnAllOutputs?: boolean;
}
interface WorkflowResponse {
    success?: boolean;
    message?: string;
    error?: string;
    status?: string;
    value?: string;
}

declare class GroupManager {
    apiKey: string;
    baseURL: string;
    throwOnError: boolean;
    constructor(apiKey: string, baseURL: string, throwOnError?: boolean);
    create: () => Promise<number | boolean>;
}

type PullSkillCollectionResult = PullSkillCollectionResponse | ArrayBuffer | null;

declare class SkillManager {
    apiKey: string;
    baseURL: string;
    throwOnError: boolean;
    constructor(apiKey: string, baseURL: string, throwOnError?: boolean);
    pull: (identifier: string, params?: Partial<PullSkillCollectionParams>) => Promise<PullSkillCollectionResult>;
    publish: (body: PublishSkillCollection) => Promise<PublishSkillCollectionResponse | null>;
    update: (identifier: string, body: UpdateSkillCollection) => Promise<UpdateSkillCollectionResponse | null>;
}

declare const wrapWithSpan: (functionName: string, func: Function, attributes?: Record<string, any>) => (...args: any[]) => any;

/**
 * Tuple: [promptName, version, label, provider, model]
 * Serialized to a JSON string for use as a Map key.
 */
type CacheKeyTuple = [
    string,
    number | null,
    string | null,
    string | null,
    string | null
];
/**
 * In-memory TTL cache for prompt templates.
 *
 * Stores unrendered API responses keyed by (promptName, version, label,
 * provider, model). Supports stale-while-error: if the TTL has expired but
 * the API is unreachable, the stale entry can be re-rendered as a fallback.
 */
declare class PromptTemplateCache {
    private readonly ttlMs;
    private readonly maxSize;
    private readonly entries;
    private readonly nonRenderable;
    constructor(ttlSeconds: number, maxSize?: number);
    static makeKey(promptName: string, params?: Record<string, unknown> | null): CacheKeyTuple;
    private static serialize;
    /**
     * Returns `[deepClone | null, isFresh]`.
     * The returned object is safe to mutate.
     */
    get(key: CacheKeyTuple): [Record<string, unknown> | null, boolean];
    put(key: CacheKeyTuple, response: Record<string, unknown>): void;
    isNonRenderable(key: CacheKeyTuple): boolean;
    markNonRenderable(key: CacheKeyTuple): void;
    clear(): void;
    /** Remove all entries whose cache key starts with `promptName`. */
    invalidate(promptName: string): void;
    private evictOldestEntry;
    private evictOldestNonRenderable;
}

declare class TemplateManager {
    apiKey: string;
    baseURL: string;
    throwOnError: boolean;
    private _cache;
    constructor(apiKey: string, baseURL: string, throwOnError?: boolean, cache?: PromptTemplateCache | null);
    get: (promptName: string, params?: Partial<GetPromptTemplateParams>) => Promise<GetPromptTemplateResponse | null>;
    private _fetchNormal;
    private _getWithCache;
    publish: (body: PublishPromptTemplate) => Promise<PublishPromptTemplateResponse>;
    invalidate: (promptName?: string) => void;
    all: (params?: Pagination) => Promise<ListPromptTemplatesResponse[]>;
}

declare class TrackManager {
    apiKey: string;
    baseURL: string;
    throwOnError: boolean;
    constructor(apiKey: string, baseURL: string, throwOnError?: boolean);
    group: (body: TrackGroup) => Promise<boolean>;
    metadata: (body: TrackMetadata) => Promise<boolean>;
    prompt: (body: TrackPrompt) => Promise<boolean>;
    score: (body: TrackScore) => Promise<boolean>;
}

interface ClientOptions {
    apiKey?: string;
    enableTracing?: boolean;
    workspaceId?: number;
    throwOnError?: boolean;
    baseURL?: string;
    /**
     * When > 0, enables in-memory TTL caching of prompt templates.
     * Templates are fetched unrendered and substituted locally, reducing
     * API calls. Default: 0 (disabled).
     */
    cacheTtlSeconds?: number;
}
declare class PromptLayer {
    apiKey: string;
    baseURL: string;
    templates: TemplateManager;
    skills: SkillManager;
    group: GroupManager;
    track: TrackManager;
    enableTracing: boolean;
    throwOnError: boolean;
    wrapWithSpan: typeof wrapWithSpan;
    constructor({ apiKey, baseURL, enableTracing, throwOnError, cacheTtlSeconds, }?: ClientOptions);
    invalidate(promptName?: string): void;
    get Anthropic(): any;
    get OpenAI(): any;
    run({ promptName, promptVersion, promptReleaseLabel, inputVariables, tags, metadata, groupId, modelParameterOverrides, stream, provider, model, skipLogging, }: RunRequest): Promise<AsyncGenerator<{
        request_id: number | null;
        raw_response: any;
        prompt_blueprint: any;
    }, void, unknown> | {
        request_id: any;
        raw_response: any;
        prompt_blueprint: any;
    }>;
    runWorkflow({ workflowName, inputVariables, metadata, workflowLabelName, workflowVersion, // This is the version number, not the version ID
    returnAllOutputs, }: WorkflowRequest): Promise<WorkflowResponse>;
    logRequest(body: LogRequest): Promise<RequestLog | null>;
}

export { type ClientOptions, type InitialSkillFileUpdate, PromptLayer, type PublishSkillCollection, type PublishSkillCollectionFromFiles, type PublishSkillCollectionFromZip, type PublishSkillCollectionResponse, type PullSkillCollectionParams, type PullSkillCollectionResponse, type SaveSkillCollectionVersion, type SkillCollection, type SkillCollectionVersion, type SkillFileMove, type SkillFileUpdate, type UpdateSkillCollection, type UpdateSkillCollectionResponse };
