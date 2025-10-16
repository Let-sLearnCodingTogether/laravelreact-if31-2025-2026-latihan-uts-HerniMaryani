import { NavLink } from "react-router";
import http from "@api/apiClient";
import { useCallback, useEffect, useState } from "react"
import Button from "../../components/ui/Button";


export default function QuotePage() {
    const [isLoading, setIsLoading] = useState(false);
    

    const deleteQuote = async (id) => {
    try {
        setIsLoading(true);

        const response = await http.delete(`/quotes/${id}`);

        if (response.status === 200) {
            fetchQuotes();
        }
    } catch (error) {
       
        console.error("Gagal menghapus quote:", error);
    } finally {
        setIsLoading(false);
    }
}

    const [quotes, setQuotes] = useState([]);

    const fetchQuotes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await http.get("/quotes");

            setQuotes(response.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    

    useEffect(() => {
        fetchQuotes()
    }, [fetchQuotes])

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return <div className="container mx-auto space-y-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-semibold text-2xl">Quotes</h1>
                <NavLink 
                    to="/new-quote" 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              > Create New Quote
                </NavLink>
            </div>
            <h1 className="font-semibold text-2xl">Quotes</h1>
            <ul className="space-y-4 divide-y divide-zinc-200 dark:divide-zinc-700">
                {quotes.map((quote) => (
                    <li key={quote.id} className="pt-4 p-5 border border-slate-300">
                        <div className="mt-5">
                        <Button onClick={() => deleteQuote(quote.id)}>Hapus</Button>
                        <NavLink to={`/update-quote/${quote.id}`}>Update</NavLink>
                        </div>
                        <blockquote className="text-zinc-800 dark:text-zinc-100 italic">
                            “{quote.quote}”
                        </blockquote>
                        <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            — {quote.author}
                            {quote.year && <span className="ml-1">({quote.year})</span>}
                            {quote.source && <span className="ml-2 italic">• {quote.source}</span>}
                        </div>
                        {quote.category && (
                            <span className="mt-2 inline-block text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                                {quote.category}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    }
}