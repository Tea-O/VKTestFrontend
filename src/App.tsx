import { useState } from "react";
import { SearchForm } from "./components/SearchFrom/SearchForm";
import {SearchContext, SearchContextType} from "./components/SearchResults/SearchContext.ts";
import { SearchResults } from "./components/SearchResults/SearchResults";

export default function App() {
    const [data, setInput] = useState<SearchContextType["data"]>({users: []});


    return (
        <SearchContext.Provider value={{ data, setInput}}>
            <SearchForm />
            <SearchResults />
        </SearchContext.Provider>
    );
}