import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import * as opentelemetry from '@opentelemetry/api';
import { LoggerProvider } from '@opentelemetry/api-logs';
import { SpanExporter, SpanProcessor } from '@opentelemetry/sdk-trace-base';

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
    action?: "generate" | "edit" | "auto";
    background?: "transparent" | "opaque" | "auto";
    input_fidelity?: "high" | "low" | null;
    input_image_mask?: {
        file_id?: string;
        image_url?: string;
    };
    model?: string;
    moderation?: "auto" | "low";
    output_compression?: number;
    output_format?: "png" | "webp" | "jpeg";
    partial_images?: number;
    quality?: "low" | "medium" | "high" | "auto";
    size?: "1024x1024" | "1024x1536" | "1536x1024" | "auto";
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
type OpenAINativeMcpToolConfig = {
    type: "mcp";
    server_label: string;
    server_url?: string;
    server_description?: string;
    connector_id?: string;
    authorization?: string;
    headers?: Record<string, string>;
    allowed_tools?: string[];
    require_approval?: "always" | "never" | McpToolApproval;
};
/** @deprecated Use OpenAINativeMcpToolConfig. */
type McpToolConfig = OpenAINativeMcpToolConfig;
type OpenRouterWebSearchToolConfig = {
    id: "web";
    engine?: "native" | "exa" | "firecrawl" | "parallel" | "perplexity";
    max_results?: number;
    search_prompt?: string;
    include_domains?: string[];
    exclude_domains?: string[];
};
type OpenRouterServerToolConfig = {
    openrouter_server_tool: string;
    parameters?: Record<string, unknown>;
};
type GenericBuiltInToolConfig = {
    type?: string;
    [key: string]: unknown;
};
type BuiltInToolConfig = OpenAIWebSearchToolConfig | FileSearchToolConfig | CodeInterpreterToolConfig | ImageGenerationToolConfig | OpenAINativeMcpToolConfig | ShellToolConfig | ApplyPatchToolConfig | OpenRouterWebSearchToolConfig | OpenRouterServerToolConfig | GenericBuiltInToolConfig;
type FunctionTool = {
    type: "function";
    function: Function_;
};
type BuiltInTool = {
    id: string;
    name: string;
    description: string;
    provider: string;
    type: "web_search" | "file_search" | "code_interpreter" | "image_generation" | "google_maps" | "url_context" | "openai_mcp"
    /** @deprecated Legacy OpenAI-native MCP input. Use "openai_mcp". */
     | "mcp" | "bash" | "shell" | "apply_patch" | "text_editor" | "datetime" | "web_fetch" | "fusion" | "advisor" | "subagent" | "search_models";
    config: BuiltInToolConfig;
};
type PromptLayerMcpTool = {
    type: "mcp";
    mcp_server_id: number;
};
/**
 * Legacy OpenAI-native MCP input accepted and normalized by the backend.
 *
 * @deprecated Use BuiltInTool with type "openai_mcp".
 */
type LegacyOpenAINativeMcpTool = Omit<BuiltInTool, "provider" | "type" | "config"> & {
    provider: "openai" | "openai.azure";
    type: "mcp";
    config: OpenAINativeMcpToolConfig & {
        execution_mode?: "provider";
    };
};
type ToolVariable = {
    type: "variable";
    name: string;
};
type RegistryTool = {
    type: "registry";
    tool_registry_id: number;
    label?: string | null;
    version_number?: number | null;
};
type Tool = FunctionTool | PromptLayerMcpTool | BuiltInTool | LegacyOpenAINativeMcpTool | ToolVariable | RegistryTool;
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
    provider_metadata?: Record<string, unknown>;
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
    parent_version_id?: number;
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
type ResourceId = string | number;
declare enum ColumnType {
    TEXT = "TEXT",
    PROMPT_TEMPLATE = "PROMPT_TEMPLATE",
    LLM_ASSERTION = "LLM_ASSERTION",
    CODE_EXECUTION = "CODE_EXECUTION",
    COMPARE = "COMPARE",
    CONTAINS = "CONTAINS",
    COALESCE = "COALESCE",
    FOR_LOOP = "FOR_LOOP",
    WHILE_LOOP = "WHILE_LOOP",
    JSON_PATH = "JSON_PATH",
    COUNT = "COUNT",
    REGEX = "REGEX",
    COSINE_SIMILARITY = "COSINE_SIMILARITY",
    ASSERT_VALID = "ASSERT_VALID",
    AI_DATA_EXTRACTION = "AI_DATA_EXTRACTION",
    COMPOSITION = "COMPOSITION",
    TRAJECTORY = "TRAJECTORY",
    TRACE = "TRACE"
}
/** String values of {@link ColumnType}. Literal strings remain accepted for compatibility. */
type ColumnTypeValue = `${ColumnType}`;
type CellStatus = "PENDING" | "QUEUED" | "DISPATCHED" | "RUNNING" | "COMPLETED" | "FAILED" | "STALE" | "SKIPPED";
interface Table {
    id: ResourceId;
    title: string;
    workspace_id?: number | null;
    folder_id?: number | null;
    sheet_count?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
    [key: string]: unknown;
}
interface Sheet {
    id: ResourceId;
    table_id?: ResourceId | null;
    title?: string | null;
    index?: number | null;
    row_count?: number | null;
    version_count?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    [key: string]: unknown;
}
interface ColumnDependency {
    column_id: string;
    reference_type?: string;
    config_key?: string;
    config_meta?: Record<string, unknown>;
}
interface Column {
    id: ResourceId;
    sheet_id?: ResourceId | null;
    title: string;
    type: ColumnTypeValue | string;
    position_rank?: number | null;
    config?: Record<string, unknown> | null;
    dependencies?: ColumnDependency[] | null;
    is_output_column?: boolean | null;
    created_at?: string | null;
    updated_at?: string | null;
    [key: string]: unknown;
}
interface Cell {
    id: ResourceId;
    sheet_id?: ResourceId | null;
    column_id?: ResourceId | null;
    row_index?: number | null;
    status?: CellStatus | string | null;
    value?: unknown;
    display_value?: string | null;
    [key: string]: unknown;
}
interface SheetVersion {
    id: ResourceId;
    sheet_id?: ResourceId | null;
    version_number?: number | null;
    snapshot?: Record<string, unknown> | null;
    created_by?: ResourceId | null;
    created_at?: string | null;
    [key: string]: unknown;
}
interface TableScore {
    score?: number | null;
    score_configuration?: Record<string, unknown> | null;
    status?: string | null;
    [key: string]: unknown;
}
interface CreateTable {
    title: string;
    folder_id?: number;
}
interface UpdateTable {
    title?: string;
    folder_id?: number;
}
interface CreateSheetFileSource {
    type: "file";
    file_name: string;
    file_content_base64: string;
}
interface CreateSheetRequestLogsSource {
    type: "request_logs";
    request_log_ids?: number[];
    prompt_id?: number;
    prompt_version_id?: number;
    prompt_label_id?: number;
    start_time?: string;
    end_time?: string;
}
type CreateSheetSource = CreateSheetFileSource | CreateSheetRequestLogsSource;
interface CreateSheet {
    title?: string;
    index?: number;
    operation_id?: string;
    source?: CreateSheetSource;
}
interface UpdateSheet {
    title?: string;
    /** Planned row count (e.g. eval case count) for live progress denominators. */
    expected_row_count?: number;
    /** Explicit Eval SDK populate lifecycle for the dashboard Running banner. */
    eval_run_status?: "running" | "completed" | "aborted";
}
interface CreateColumn {
    title: string;
    type: ColumnTypeValue | string;
    config?: Record<string, unknown>;
    dependencies?: ColumnDependency[];
    is_output_column?: boolean;
}
interface UpdateColumn {
    title?: string;
    type?: ColumnTypeValue | string;
    config?: Record<string, unknown>;
    dependencies?: ColumnDependency[];
    is_output_column?: boolean;
}
interface AddTableRows {
    count?: number;
    values?: Record<string, unknown>[];
}
interface DeleteSheetRows {
    row_indices: number[];
}
interface UpdateCell {
    display_value?: string;
    value?: unknown;
}
interface CreateSheetVersion {
    name?: string;
}
interface ConfigureSheetScore {
    score_type?: string;
    score_config?: Record<string, unknown>;
    column_ids?: string[];
    column_names?: string[];
    code?: string;
    code_language?: "PYTHON" | "JAVASCRIPT";
    true_values?: string[];
    false_values?: string[];
    assertion_aggregation?: "all" | "any" | "mean";
    [key: string]: unknown;
}
interface AddTraceImport {
    trace_id: string;
    sheet_id: ResourceId;
    smart_table_id?: ResourceId;
    table_id?: ResourceId;
    span_id?: string;
    metadata?: Record<string, unknown>;
}
interface ListTablesParams {
    cursor?: string;
    limit?: number;
    name?: string;
    folder_id?: number;
    page?: number;
    per_page?: number;
}
interface BatchRecalculateCells {
    cell_ids?: Array<string | number>;
    column_ids?: Array<string | number>;
    row_indices?: number[];
}
interface TableListResponse {
    success?: boolean;
    data?: Table[];
    tables?: Table[];
    items?: Table[];
    [key: string]: unknown;
}
interface TableResponse {
    success?: boolean;
    table?: Table;
    [key: string]: unknown;
}
interface SheetListResponse {
    success?: boolean;
    data?: Sheet[];
    sheets?: Sheet[];
    items?: Sheet[];
    [key: string]: unknown;
}
interface SheetResponse {
    success?: boolean;
    sheet?: Sheet;
    [key: string]: unknown;
}
interface ColumnListResponse {
    success?: boolean;
    data?: Column[];
    columns?: Column[];
    items?: Column[];
    [key: string]: unknown;
}
interface ColumnResponse {
    success?: boolean;
    column?: Column;
    [key: string]: unknown;
}
interface CellResponse {
    success?: boolean;
    cell?: Cell;
    [key: string]: unknown;
}
interface SheetVersionListResponse {
    success?: boolean;
    data?: SheetVersion[];
    versions?: SheetVersion[];
    items?: SheetVersion[];
    [key: string]: unknown;
}
interface SheetVersionResponse {
    success?: boolean;
    version?: SheetVersion;
    [key: string]: unknown;
}
interface TableScoreResponse {
    success?: boolean;
    score?: TableScore | number | null;
    status?: string | null;
    [key: string]: unknown;
}
interface EvalCase<TInput = unknown> {
    input: TInput;
    expected?: unknown;
    /** Dataset / Table column title: expectedTrace */
    expectedTrace?: unknown;
    /** Additional dataset fields become exact-title TEXT columns. */
    [field: string]: unknown;
}
interface EvalDatasetRef {
    tableId: ResourceId;
    sheetId?: ResourceId;
}
type EvalDataset<TInput = unknown> = EvalCase<TInput>[] | EvalDatasetRef;
interface EvalScorerColumn {
    title: string;
    type: ColumnTypeValue | string;
    config?: Record<string, unknown>;
    weight?: number;
    required?: boolean;
    thresholds?: {
        pass?: number;
        warn?: number;
    };
    /** SDK-only metadata; never sent to the Table API. */
    _sdkDiagnosis?: string;
}
type EvalScorer = EvalScorerColumn | ((...args: unknown[]) => unknown);
/** Supporting/preprocessing columns share the same wire shape as scorer defs. */
type EvalProcessingColumn = EvalScorerColumn;
interface EvalDefinition<TInput = unknown, TOutput = unknown> {
    name: string;
    dataset: EvalDataset<TInput>;
    runner: (input: TInput) => TOutput | Promise<TOutput>;
    scorers: EvalScorer[];
    /** Supporting Table columns created before scorecard scoring. */
    columns?: EvalProcessingColumn[];
    tableId?: ResourceId;
    sheetId?: ResourceId;
    folderId?: number;
    experimentName?: string;
    maxConcurrency?: number;
    passingScore?: number;
    includeFailureExamples?: boolean;
    apiKey?: string;
    baseURL?: string;
}
interface EvaluateOptions<TInput = unknown, TOutput = unknown> extends Omit<EvalDefinition<TInput, TOutput>, "name"> {
    enableTracing?: boolean;
}
interface EvalCaseResult<TInput = unknown, TOutput = unknown> {
    input: TInput;
    expected?: unknown;
    output: TOutput;
    scores: Record<string, unknown>;
    /** Total trace price in USD, when available. */
    price: number | null;
    /** Total trace latency in milliseconds, when available. */
    latency: number | null;
    /** Fetch the full trace via PromptLayer tracing APIs / dashboard. */
    traceId: string | null;
    spanId: string | null;
    rowIndex: number | null;
}
interface EvalScoreCard {
    scorer: string;
    passed: number;
    total: number;
    passRate: number;
}
interface EvalResult<TInput = unknown, TOutput = unknown> {
    name: string;
    tableId: ResourceId;
    sheetId: ResourceId;
    failedRowIndices: number[];
    scoreCards: EvalScoreCard[];
    totalRows: number;
    /**
     * Per-case summaries (input/output/scores/price/latency/ids). Full traces and
     * sheet score payloads are not inlined — refetch with:
     * `client.tables.sheets(tableId).forSheet(sheetId).score.get()`
     * and `...rows.listAll()`, or open `url`.
     */
    results: EvalCaseResult<TInput, TOutput>[];
    url?: string;
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

declare class TableSheetRowsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    list: (params?: Record<string, string | number | boolean>) => Promise<Record<string, unknown> | null>;
    listAll: (params?: Record<string, string | number | boolean>) => Promise<Record<string, unknown> | null>;
    add: (body: AddTableRows) => Promise<Record<string, unknown> | null>;
    delete: (body: DeleteSheetRows) => Promise<Record<string, unknown> | null>;
}
declare class TableSheetColumnsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    list: () => Promise<ColumnListResponse | null>;
    create: (body: CreateColumn) => Promise<ColumnResponse | null>;
    update: (columnId: ResourceId, body: UpdateColumn) => Promise<ColumnResponse | null>;
    delete: (columnId: ResourceId) => Promise<boolean>;
}
declare class TableSheetCellsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    get: (cellId: ResourceId) => Promise<CellResponse | null>;
    update: (cellId: ResourceId, body: UpdateCell) => Promise<CellResponse | null>;
    recalculate: (cellId: ResourceId) => Promise<CellResponse | null>;
    batchRecalculate: (body: BatchRecalculateCells) => Promise<Record<string, unknown> | null>;
}
declare class TableSheetVersionsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    list: () => Promise<SheetVersionListResponse | null>;
    create: (body?: CreateSheetVersion) => Promise<SheetVersionResponse | null>;
    get: (versionId: ResourceId) => Promise<SheetVersionResponse | null>;
    scoreHistory: () => Promise<Record<string, unknown> | null>;
}
declare class TableSheetScoreManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    get: () => Promise<TableScoreResponse | null>;
    configure: (body: ConfigureSheetScore) => Promise<TableScoreResponse | null>;
    recalculate: () => Promise<TableScoreResponse | null>;
}
declare class TableSheetManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    private sheetId;
    rows: TableSheetRowsManager;
    columns: TableSheetColumnsManager;
    cells: TableSheetCellsManager;
    versions: TableSheetVersionsManager;
    score: TableSheetScoreManager;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId, sheetId: ResourceId);
    get: () => Promise<SheetResponse | null>;
    update: (body: UpdateSheet) => Promise<SheetResponse | null>;
    delete: () => Promise<boolean>;
    statusCounts: () => Promise<Record<string, unknown> | null>;
}
declare class TableSheetsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tableId;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tableId: ResourceId);
    list: () => Promise<SheetListResponse | null>;
    create: (body?: CreateSheet) => Promise<SheetResponse | null>;
    forSheet: (sheetId: ResourceId) => TableSheetManager;
}
declare class TableImportsManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean);
    addTrace: (body: AddTraceImport) => Promise<Record<string, unknown> | null>;
}
declare class TableManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    imports: TableImportsManager;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean);
    list: (params?: ListTablesParams) => Promise<TableListResponse | null>;
    create: (body: CreateTable) => Promise<TableResponse | null>;
    get: (tableId: ResourceId) => Promise<TableResponse | null>;
    update: (tableId: ResourceId, body: UpdateTable) => Promise<TableResponse | null>;
    delete: (tableId: ResourceId) => Promise<boolean>;
    sheets: (tableId: ResourceId) => TableSheetsManager;
}

declare class EvalManager {
    private apiKey;
    private baseURL;
    private throwOnError;
    private tracerProvider;
    constructor(apiKey: string, baseURL: string, throwOnError: boolean, tracerProvider?: NodeTracerProvider | null);
    run: <TInput, TOutput>(definition: EvalDefinition<TInput, TOutput>) => Promise<EvalResult<TInput, TOutput>>;
}

declare const column: (title: string, type: ColumnType | ColumnTypeValue | string, config?: Record<string, unknown>) => EvalScorerColumn;
declare const codeExecutionColumn: (title: string, options: {
    code: string;
    language?: "PYTHON" | "JAVASCRIPT";
}) => EvalScorerColumn;
declare const scorerFromFunction: (fn: (...args: unknown[]) => unknown, options?: {
    title?: string;
}) => EvalScorerColumn;

type ScorecardStepOptions = {
    weight?: number;
    failureThreshold?: number;
    passThreshold?: number;
    required?: boolean;
    thresholds?: {
        pass?: number;
        warn?: number;
    };
};

type AssertValidScorerOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    type?: string;
    [key: string]: unknown;
};
declare const assertValidScorer: ({ title, sourceColumn, type, ...settings }?: AssertValidScorerOptions) => EvalScorerColumn;

type CompareScorerBaseOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    comparisonType?: Record<string, unknown> | string;
    [key: string]: unknown;
};
type CompareScorerOptions = CompareScorerBaseOptions & ({
    expected: unknown;
    expectedColumn?: never;
} | {
    expected?: never;
    expectedColumn?: string;
});
declare const compareScorer: ({ title, sourceColumn, expected, expectedColumn, comparisonType, ...settings }?: CompareScorerOptions) => EvalScorerColumn;

type ContainsScorerBaseOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    [key: string]: unknown;
};
type ContainsScorerOptions = ContainsScorerBaseOptions & ({
    expected: string;
    expectedColumn?: never;
} | {
    expected?: never;
    expectedColumn: string;
});
declare const containsScorer: ({ title, sourceColumn, expected, expectedColumn, ...settings }: ContainsScorerOptions) => EvalScorerColumn;

type CountScorerOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    type?: string;
    minCount?: number;
    maxCount?: number;
    [key: string]: unknown;
};
declare const countScorer: ({ title, sourceColumn, type, minCount, maxCount, ...settings }?: CountScorerOptions) => EvalScorerColumn;

type LlmAssertionScorerOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    prompt?: string;
    promptSource?: string;
    variableMappings?: Record<string, string>;
    [key: string]: unknown;
};
declare const llmAssertionScorer: ({ title, sourceColumn, prompt, promptSource, variableMappings, ...settings }?: LlmAssertionScorerOptions) => EvalScorerColumn;

type RegexScorerOptions = ScorecardStepOptions & {
    title?: string;
    sourceColumn?: string;
    regexPattern: string;
    [key: string]: unknown;
};
declare const regexScorer: ({ title, sourceColumn, regexPattern, ...settings }: RegexScorerOptions) => EvalScorerColumn;

type TrajectoryMode = "strict" | "non_strict";

declare const extractTrajectoryToolNames: (trace: unknown) => string[];
declare const scoreTrajectory: (trace: unknown, expected: unknown, mode?: TrajectoryMode) => boolean;
declare const diagnoseTrajectoryFailure: (trace: unknown, expected: unknown, mode?: TrajectoryMode) => string | null;
type TrajectoryScorerBaseOptions = ScorecardStepOptions & {
    mode?: TrajectoryMode;
    title?: string;
    sourceColumn?: string;
    [key: string]: unknown;
};
type TrajectoryScorerOptions = TrajectoryScorerBaseOptions & ({
    expected: string[][];
    expectedColumn?: never;
} | {
    expected?: never;
    expectedColumn: string;
});
declare function trajectoryScorer(options: TrajectoryScorerOptions): EvalScorerColumn;

declare const wrapWithSpan: (functionName: string, func: Function, attributes?: Record<string, any>) => (...args: any[]) => any;
declare const traceTool: (toolName: string, func: Function, attributes?: Record<string, any>) => (...args: any[]) => any;

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

type TracingProvider = "openai" | "anthropic" | "google" | "bedrock";
/** @deprecated Use TracingProvider. */
type OpenAITracingProvider = "openai";

interface FlushableTracerProvider extends opentelemetry.TracerProvider {
    forceFlush?: () => Promise<boolean | void>;
    shutdown?: () => Promise<void>;
}
interface ConfigureTracingOptions {
    apiKey?: string;
    baseURL?: string;
    captureContent?: boolean;
    loggerProvider?: LoggerProvider;
    providers?: readonly TracingProvider[];
    serviceName?: string;
    tracerProvider?: FlushableTracerProvider;
}
interface TracingHandle {
    readonly ownsTracerProvider: boolean;
    readonly tracerProvider: FlushableTracerProvider;
    forceFlush(): Promise<void>;
    shutdown(): Promise<void>;
}
interface PromptLayerSpanProcessorOptions {
    apiKey?: string;
    baseURL?: string;
    exporter?: SpanExporter;
}
declare const createPromptLayerSpanProcessor: ({ apiKey, baseURL, exporter, }: PromptLayerSpanProcessorOptions) => SpanProcessor;
/**
 * Configure provider auto-instrumentation and OTLP export to PromptLayer.
 *
 * Prefer this over inspecting bundled internals when enabling tracing.
 *
 * @see https://docs.promptlayer.com/features/observability/traces/auto-instrumentation/overview
 */
declare const configureTracing: (options?: ConfigureTracingOptions) => TracingHandle;
declare const forceFlushTracing: () => Promise<void>;
declare const shutdownTracing: () => Promise<void>;

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

declare class PromptLayerError extends Error {
    constructor(message: string, cause?: unknown);
}
declare class PromptLayerAPIError extends PromptLayerError {
}
declare class PromptLayerConnectionError extends PromptLayerAPIError {
}
declare class PromptLayerStatusError extends PromptLayerAPIError {
    readonly status: number;
    constructor(message: string, status: number, cause?: unknown);
}
declare class PromptLayerAuthenticationError extends PromptLayerStatusError {
}
declare class PromptLayerNotFoundError extends PromptLayerStatusError {
    constructor(message: string, status?: number, cause?: unknown);
}
declare class PromptLayerTimeoutError extends PromptLayerAPIError {
}
declare class PromptLayerValidationError extends PromptLayerError {
}
declare class EvaluationFailedError extends PromptLayerError {
    readonly score: unknown;
    readonly passingScore: number | null;
    readonly result: unknown | null;
    readonly failingRowIndices: number[];
    constructor(message: string, options?: {
        score?: unknown;
        passingScore?: number | null;
        result?: unknown | null;
        failingRowIndices?: number[];
    });
}

/**
 * Options for constructing a {@link PromptLayer} client.
 *
 * Prefer the published JavaScript SDK docs over inspecting bundled internals:
 * https://docs.promptlayer.com/sdks/javascript
 *
 * @see https://docs.promptlayer.com/sdks/javascript
 * @see https://docs.promptlayer.com/llms.txt
 */
interface ClientOptions {
    /** PromptLayer API key. Defaults to `PROMPTLAYER_API_KEY`. */
    apiKey?: string;
    /**
     * When true, configures OpenTelemetry tracing export to PromptLayer.
     * @see https://docs.promptlayer.com/features/observability/traces/auto-instrumentation/overview
     */
    enableTracing?: boolean;
    workspaceId?: number;
    /**
     * When true (default), many API failures throw. When false, methods often
     * return `null`, `false`, or empty fallbacks instead.
     * @see https://docs.promptlayer.com/sdks/javascript#error-handling
     */
    throwOnError?: boolean;
    /** Overrides the PromptLayer API base URL. Defaults to `PROMPTLAYER_BASE_URL` or `https://api.promptlayer.com`. */
    baseURL?: string;
    /**
     * When > 0, enables in-memory TTL caching of prompt templates.
     * Templates are fetched unrendered and substituted locally, reducing
     * API calls. Default: 0 (disabled).
     * @see https://docs.promptlayer.com/sdks/javascript#sdk-cache
     */
    cacheTtlSeconds?: number;
}
/**
 * Official PromptLayer JavaScript client.
 *
 * Start with {@link PromptLayer.run} for registry prompts or
 * {@link PromptLayer.templates} to fetch and render templates. For agent
 * tooling, use the docs at https://docs.promptlayer.com/sdks/javascript and
 * https://docs.promptlayer.com/llms.txt rather than scanning package internals.
 *
 * @example
 * ```ts
 * const pl = new PromptLayer({ apiKey: process.env.PROMPTLAYER_API_KEY });
 * const result = await pl.run({
 *   promptName: "support-reply",
 *   inputVariables: { customer_name: "Ada" },
 * });
 * ```
 *
 * @see https://docs.promptlayer.com/sdks/javascript
 * @see https://docs.promptlayer.com/llms.txt
 */
declare class PromptLayer {
    apiKey: string;
    baseURL: string;
    /**
     * Prompt template retrieval, listing, publishing, and cache invalidation.
     * @see https://docs.promptlayer.com/features/prompt-registry/overview
     */
    templates: TemplateManager;
    /**
     * Skill collection pull, publish, and update operations.
     * @see https://docs.promptlayer.com/features/skill-collections/overview
     */
    skills: SkillManager;
    /**
     * Tables API for datasets and evaluation sheets.
     * @see https://docs.promptlayer.com/features/tables/overview
     */
    tables: TableManager;
    /**
     * SDK eval runners and related helpers.
     * @see https://docs.promptlayer.com/sdks/evals/overview
     */
    evals: EvalManager;
    /**
     * Group creation for organizing related requests.
     * @see https://docs.promptlayer.com/features/observability/request-logs/request-ids
     */
    group: GroupManager;
    /**
     * Request annotation utilities for metadata, prompt linkage, scores, and groups.
     * @see https://docs.promptlayer.com/features/observability/request-logs/metadata
     */
    track: TrackManager;
    enableTracing: boolean;
    throwOnError: boolean;
    tracerProvider: NodeTracerProvider | null;
    /**
     * Wrap a function in a PromptLayer span when tracing is enabled.
     * @see https://docs.promptlayer.com/features/observability/traces/manual-tracing
     */
    wrapWithSpan: typeof wrapWithSpan;
    /**
     * Trace a tool-style function with a named span.
     * @see https://docs.promptlayer.com/features/observability/traces/manual-tracing
     */
    traceTool: typeof traceTool;
    constructor({ apiKey, baseURL, enableTracing, throwOnError, cacheTtlSeconds, }?: ClientOptions);
    /**
     * Clear cached prompt templates. Pass a name to invalidate one entry, or omit
     * to clear the entire template cache.
     * @see https://docs.promptlayer.com/sdks/javascript#sdk-cache
     */
    invalidate(promptName?: string): void;
    /**
     * Anthropic SDK proxy that logs requests to PromptLayer.
     * Requires the `@anthropic-ai/sdk` package.
     * @see https://docs.promptlayer.com/sdks/javascript
     */
    get Anthropic(): any;
    /**
     * OpenAI SDK proxy that logs requests to PromptLayer.
     * Requires the `openai` package.
     * @see https://docs.promptlayer.com/sdks/javascript
     */
    get OpenAI(): any;
    /**
     * Fetch a prompt from the Prompt Registry and run it with the configured provider.
     * This is the recommended high-level entry point for most integrations.
     *
     * @see https://docs.promptlayer.com/sdks/javascript#using-the-run-method-recommended
     */
    run({ promptName, promptVersion, promptReleaseLabel, inputVariables, tags, metadata, groupId, modelParameterOverrides, stream, provider, model, skipLogging, }: RunRequest): Promise<AsyncGenerator<{
        request_id: number | null;
        raw_response: any;
        prompt_blueprint: any;
    }, void, unknown> | {
        request_id: any;
        raw_response: any;
        prompt_blueprint: any;
    }>;
    /**
     * Execute a PromptLayer workflow by name, optionally pinning a label or version.
     *
     * @see https://docs.promptlayer.com/sdks/javascript#running-workflows
     */
    runWorkflow({ workflowName, inputVariables, metadata, workflowLabelName, workflowVersion, // This is the version number, not the version ID
    returnAllOutputs, }: WorkflowRequest): Promise<WorkflowResponse>;
    /**
     * Manually log a request to PromptLayer when you are not using a provider proxy
     * or {@link PromptLayer.run}.
     *
     * @see https://docs.promptlayer.com/features/observability/request-logs/custom-logging
     */
    logRequest(body: LogRequest): Promise<RequestLog | null>;
}

/**
 * Convenience helper that constructs a PromptLayer client and runs an eval.
 *
 * @see https://docs.promptlayer.com/sdks/evals/overview
 */
declare const evaluate: <TInput = unknown, TOutput = unknown>(name: string, options: EvaluateOptions<TInput, TOutput>) => Promise<EvalResult<TInput, TOutput>>;

export { type ApplyPatchToolConfig, type AssertValidScorerOptions, type BasePromptTemplate, type BuiltInTool, type BuiltInToolConfig, type ChatPromptTemplate, type ClientOptions, type CodeInterpreterToolConfig, type Column, ColumnType, type ColumnTypeValue, type CompareScorerOptions, type ConfigureTracingOptions, type ContainsScorerOptions, type CountScorerOptions, type EvalCase, type EvalCaseResult, type EvalDataset, type EvalDefinition, type EvalResult, type EvalScoreCard, type EvalScorer, type EvalScorerColumn, type EvaluateOptions, EvaluationFailedError, type FileSearchToolConfig, type FlushableTracerProvider, type FunctionTool, type ImageGenerationToolConfig, type InitialSkillFileUpdate, type LegacyOpenAINativeMcpTool, type LlmAssertionScorerOptions, type McpToolConfig, type OpenAINativeMcpToolConfig, type OpenAITracingProvider, type OpenAIWebSearchToolConfig, type OpenRouterServerToolConfig, type OpenRouterWebSearchToolConfig, type PromptBlueprint, PromptLayer, PromptLayerAPIError, PromptLayerAuthenticationError, PromptLayerConnectionError, PromptLayerError, type PromptLayerMcpTool, PromptLayerNotFoundError, type PromptLayerSpanProcessorOptions, PromptLayerStatusError, PromptLayerTimeoutError, PromptLayerValidationError, type PromptTemplate, type PublishPromptTemplate, type PublishSkillCollection, type PublishSkillCollectionFromFiles, type PublishSkillCollectionFromZip, type PublishSkillCollectionResponse, type PullSkillCollectionParams, type PullSkillCollectionResponse, type RegexScorerOptions, type RegistryTool, type SaveSkillCollectionVersion, type Sheet, type SkillCollection, type SkillCollectionVersion, type SkillFileMove, type SkillFileUpdate, type Table, type Tool, type ToolVariable, type TracingHandle, type TracingProvider, type TrajectoryMode, type TrajectoryScorerOptions, type UpdateSkillCollection, type UpdateSkillCollectionResponse, assertValidScorer, codeExecutionColumn, column, compareScorer, configureTracing, containsScorer, countScorer, createPromptLayerSpanProcessor, diagnoseTrajectoryFailure, evaluate, extractTrajectoryToolNames, forceFlushTracing, llmAssertionScorer, regexScorer, scoreTrajectory, scorerFromFunction, shutdownTracing, trajectoryScorer };
