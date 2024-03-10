import {useCallback, useContext, useEffect} from "react";
import {SearchContext, SearchContextType} from "../components/SearchResults/SearchContext.ts";

export function useFetch(query: string): void {
    const {setInput}: SearchContextType = useContext(SearchContext);

    const fetchData = useCallback(async () => {
        if (query) {
            const splitQuery: string[] = query.split(" ")
            const inputQuery: string = `${splitQuery[0]}&${splitQuery[1]}`
            try {
                const response = await fetch(`https://dummyjson.com/users/search?q=${inputQuery}`);
                if (response.ok) {
                    const data = await response.json();
                    setInput(data);
                } else {
                    throw new Error("Error with response");
                }
            } catch (error) {
                throw new Error(`Error with fetch : ${error}`);
            } finally {

            }
        }
    }, [query, setInput]);

    useEffect(() => {
        let timeoutId: number;

        if (query) {
            timeoutId = setTimeout(fetchData, 400);
        }

        return () => clearTimeout(timeoutId);
    }, [query, fetchData]);
}
