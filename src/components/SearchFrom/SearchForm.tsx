import React, {useState} from "react";
import {useFetch} from "../../hooks/useFetch.tsx";
import "./styles.css";

export function SearchForm() {
    const [value, setValue] = useState("");

    useFetch(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="searchForm">
            <form>
                <input
                    onChange={handleChange}
                    type="text"
                    value={value}
                />
            </form>
        </div>
    );
}