import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {ILogStore} from "./libraries/log-type.ts";

export const useLogStore = create<ILogStore>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (log) =>
                set((state) => ({
                    logs: [
                        ...state.logs,
                        {
                            ...log,
                            id: crypto.randomUUID(),
                            timestamp: Date.now(),
                        },
                    ],
                })),
            clearLogs: () => set({logs: []}),
        }),
        {
            name: "user-logs",
        }
    )
);
