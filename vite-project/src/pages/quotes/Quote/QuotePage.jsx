import http from "../../../api/apiClient";
import { useCallback, useEffect, useState } from "react";

export default function QuotePage() {

    const [quotes, setQuotes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);


    const fetchQuotes = useCallback(async () => {
        try {
            setIsLoading(true);             
            
            const response = await http.get("/quotes");
            
            setQuotes(response.data.data); 
            
        } catch (error) {
            console.error("Gagal mengambil data kutipan:", error);
        } finally {
            setIsLoading(false); 
        }
    }, [])

    
    useEffect(() => {
        fetchQuotes();
    }, [fetchQuotes]); 

    if (isLoading) {
        return <div className="p-8 text-center text-xl font-semibold">Memuat Kutipan...</div>;
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Daftar Kutipan ({quotes.length})</h1>
            
            {quotes.length === 0 ? (
                <div className="text-center text-zinc-500 py-10">Tidak ada kutipan yang ditemukan.</div>
            ) : (
                <ul className="space-y-3">
                    {quotes.map((quote) => (
                        <li key={quote.id} className="p-4 border rounded-lg shadow-sm bg-white">
                            <blockquote className="italic">
                                “{quote.quote}”
                            </blockquote>
                            <p className="text-right text-sm mt-1 text-zinc-600">
                                {quote.author}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}