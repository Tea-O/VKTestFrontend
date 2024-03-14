import React, {useState, useEffect, useRef} from 'react';

function AgeForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(false);
    const prevNameRef = useRef('');
    const controllerRef = useRef<AbortController | null>(null);

    const fetchAge = async (name: string) => {
        setLoading(true);
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`, {signal: controllerRef.current.signal});
            const data = await response.json();
            setAge(data.age);
            setLoading(false);
        } catch (error) {
            throw new Error(`error with fetch: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (name && name !== prevNameRef.current) {
            prevNameRef.current = name;
            const timer = setTimeout(() => fetchAge(name), 3000);
            return () => clearTimeout(timer);
        }
    }, [name]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchAge(name);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            {loading ? <p>Loading...</p> : <p>Estimated age: {age}</p>}
        </div>
    );
}

export default AgeForm;