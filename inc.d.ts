declare class Shapes {
    static Square(ctx: CanvasRenderingContext2D, { x, y, w, h, fillColor, strokeColor, strokeWidth }: { x: number; y: number; w: number; h: number; fillColor?: string; strokeColor?: string; strokeWidth?: number; }): void;
    static Circle(ctx: CanvasRenderingContext2D, { x, y, r, startAngle, endAngle, fillColor, strokeColor, strokeWidth }: { x: number; y: number; r: number; startAngle?: number; endAngle?: number; fillColor?: string; strokeColor?: string; strokeWidth?: number; }): void;
    static Star(ctx: CanvasRenderingContext2D, { x, y, spikes, outerRadius, innerRadius, fillColor, strokeColor, strokeWidth }: { x: number; y: number; spikes?: number; outerRadius?: number; innerRadius?: number; fillColor?: string; strokeColor?: string; strokeWidth?: number; }): void;
    static Path(ctx: CanvasRenderingContext2D, { curves, closePath, fillColor, strokeColor, strokeWidth }: { curves: { x: number; y: number }[]; closePath?: boolean; fillColor?: string; strokeColor?: string; strokeWidth?: number; }): void;
    static HTML({ element, classname, id, src, alt, data, type, attr, parent, textContent, append }: { element?: string; classname?: string; id?: string; src?: string; alt?: string; data?: string; type?: string; attr?: Record<string, string>; parent?: HTMLElement | null; textContent?: string | null; append?: boolean; }): HTMLElement;
}

declare class BaseElement extends HTMLElement {
    constructor(options?: MutationObserverInit);
    watcher(node: Node, options?: MutationObserverInit): void;
    connectedCallback(): void;
    getAttr(attr: string, defaultValue?: string): string;
    setAttr(attr: string, value: string, forced?: boolean): void;
    attributesChanged(attr: MutationRecord, name: string): void;
    childrenChanged(node: MutationRecord, added: NodeList, removed: NodeList): void;
    create(options: Parameters<typeof Shapes.HTML>[0]): HTMLElement;
    Awake(): void;
}

declare class Timer {
    constructor(callback: () => void, time?: number);
    stop(): this;
    start(): this;
    reset(newTime?: number): this;
    isStart(): boolean;
}

declare class Chronometer {
    constructor(options: {
        parent?: HTMLElement | null;
        duration: number;
        speed?: number;
        play?: boolean;
        callback_display: (obj: { hours: string; minutes: string; seconds: string; milliseconds: string; time: number }, parent?: HTMLElement | null) => void;
        callback_end?: (timer: Timer, parent?: HTMLElement | null) => void;
    });
    isPlay(): boolean;
    setPlay(play: boolean): void;
}

declare class AutoTyped {
    constructor({ container, typeSpeed, typingEvent }: { container: Node; typeSpeed?: number; typingEvent?: () => void; });
    getState(): string;
    getTimer(): Timer;
    setTypeSpeed(speed: number): void;
    typed(content: string): this;
    erased(): Promise<void>;
    start(): Promise<void>;
    stop(): void;
    isTyped(): boolean;
    isErased(): boolean;
    isFinished(): boolean;
    isDefault(): boolean;
}

declare class SaveManager{
    static save(key: string, value: any): void;
    static load(key: string, default_value?: Array): any;
    static remove(key: string): void;
}

declare class JSONManager{
    constructor({ pathfile, saverSystem }: { pathfile: string; saverSystem: string });

    get(param: string): any | null;
    set(param: string, value: string): void;
    getDatas(): Record<string, any>;

    load(): Promise<void>;
    save(): Promise<void>;

    _request(
        { action, params = "", method = "POST", type = "text/html" }: 
        { action: string; params?: string; method?: string; type?: string },
        callback: (response: string) => void = () => {}
    ): void;
}

declare class Score{
    constructor(ini?: number, isNegative?: boolean);
    get(): number;
    set(point: number): void;
    getScoreFormat(lang: string, options?: any): string;
    add(point?: number): void;
    remove(point?: number): void;
    reset(): void;
    #checkNegative(): void;
    #format(): void;
}

declare class Statistics{
    getCombos(): number;
    setCombos(comb: number): void;
    addCombos(comb?: number): void;
    lessCombos(comb?: number): void;
    getMaxCombo(): number;
    setMaxCombo(): void;
    getSuccess(): number;
    setSuccess(succ: number): void;
    addSuccess(succ?: number): void;
    lessSuccess(succ?: number): void;
    getErrors(): number;
    setErrors(err: number): void;
    addErrors(err?: number): void;
    lessErrors(err?: number): void;
}

declare class TypingStatistics extends Statistics{
    getFindingWords(): number;
    addFindingWords(): void;
    getTappedLetter(): number;
    addTappedLetter(): void;
}

declare class Random{
    get(max?: number, min?: number): number;
    gets(count: number, max?: number, min?: number): Array;
    array(array: Array): any;
}

declare class Sound{
    play(src: string, volume?: number): Promise<AudioBuffer>;
}

export { Shapes, BaseElement, Timer, Chronometer, AutoTyped, SaveManager, JSONManager, Score, Statistics, TypingStatistics, Random, Sound }