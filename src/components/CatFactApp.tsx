import { useState, useEffect, useRef } from 'react';

function CatFactComponent() {
    const [fact, setFact] = useState('');
    const inputRef = useRef<HTMLInputElement>(null); // Указываем тип ссылки

    const fetchFact = async () => {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        setFact(data.fact);
    };

    useEffect(() => {
        if (fact) {
            const firstWordEndIndex = fact.indexOf(' ');
            if(inputRef.current !== null) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(firstWordEndIndex, firstWordEndIndex);
                inputRef.current.size = fact.length;
            }
        }
    }, [fact]);

    return (
        <div>
            <button onClick={fetchFact}>Get Cat Fact</button>
            <input type="text" value={fact} ref={inputRef}  />

        </div>
    );
}

export default CatFactComponent;