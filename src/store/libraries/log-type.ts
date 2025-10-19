export type TLogType = "login" | "logout" | "page_view" | "edit" | "delete";

export interface ILogEntry {
    id: string;
    type: TLogType;
    message: string;
    timestamp: number;
}

export interface ILogStore {
    logs: ILogEntry[];
    addLog: (log: Omit<ILogEntry, "id" | "timestamp">) => void;
    clearLogs: () => void;
}