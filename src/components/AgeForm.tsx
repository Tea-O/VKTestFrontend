import React, {useState, useEffect, useRef} from 'react';
import {Button, FormItem, Group, Header, Input} from "@vkontakte/vkui";
import {useQuery} from "@tanstack/react-query";
import {isValid, returnAge} from "../utils/AgeFormFunction.tsx";

function AgeForm() {
    const [buttonClicked, setButtonClicked] = useState(false);
    const [name, setName] = useState('');
    const prevNameRef = useRef('');
    const controllerRef = useRef<AbortController | null>(null);
    const [isValidAge, setIsValidAge] = useState(true);

    const fetchAge = async (name: string) => {
        prevNameRef.current = name;
        console.log(prevNameRef.current)
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`, {signal: controllerRef.current.signal});
            const ans = await response.json();
            setIsValidAge(true);
            setButtonClicked(false);
            return ans.age;
        } catch (error) {
            throw new Error(`error with fetch: ${error}`);
        } finally {
            setButtonClicked(false);
        }
    };

    const {data, refetch} = useQuery({
        queryKey: ['getAge', name],
        queryFn: () => fetchAge(name),
        enabled: false

    })


    useEffect(() => {
        if (name === "") {
            return
        }
        if (name && name !== prevNameRef.current && isValid(name) && !buttonClicked) {
            const timer = setTimeout(() => refetch(), 3000);
            return () => clearTimeout(timer);
        } else if (!isValid(name)) {
            setIsValidAge(false);
        }
    }, [name, buttonClicked, isValidAge, refetch]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setButtonClicked(true);
        if (isValid(name) && prevNameRef.current !== name) {
            refetch()
            setButtonClicked(false);
        } else if (!isValid(name)) {
            setIsValidAge(false);
        }
    };


    return (
        <Group>
            <Header>{'Age Form Task'}</Header>
            <FormItem bottom={returnAge(data, isValidAge)} status={isValidAge ? 'valid' : 'error'}>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)}
                       placeholder={'Введите имя на латинеце'}></Input>
            </FormItem>
            <FormItem>
                <Button onClick={handleSubmit} size="l">Get Age</Button>
            </FormItem>

        </Group>
    );
}

export default AgeForm;