import {format} from "date-fns";
import {useEffect, useState} from "react";
import {useLogStore} from "../../store/log.store";
import type {ILogEntry} from "../../store/libraries/log-type.ts";

export default function LogsPage() {
    const logs = useLogStore((state) => state.logs);
    const addLog = useLogStore((state) => state.addLog);

    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    const totalPages = Math.ceil(logs.length / logsPerPage);

    useEffect(() => {
        addLog({type: "page_view", message: "Visited Logs Page"});
    }, [addLog]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-black">User Logs</h2>
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left text-black">Type</th>
                    <th className="p-2 text-left text-black">Message</th>
                    <th className="p-2 text-left text-black">Timestamp</th>
                </tr>
                </thead>
                <tbody>
                {currentLogs.length > 0 ? (
                    currentLogs.map((log: ILogEntry) => (
                        <tr key={log.id} className="border-t hover:bg-gray-50">
                            <td className="p-2 text-black">{log.type}</td>
                            <td className="p-2 text-black">{log.message}</td>
                            <td className="p-2 text-black">
                                {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3} className="p-4 text-center text-gray-500">
                            No logs found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-8 text-black">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-1 text-white bg-gray-900 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 text-white bg-gray-900 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
