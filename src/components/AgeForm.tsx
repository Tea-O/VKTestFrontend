import React, {useState, useEffect, useRef} from 'react';
import {Button, FormItem, Group, Header, Input} from "@vkontakte/vkui";
import {useQuery} from "@tanstack/react-query";
import {isValid} from "../utils/AgeFormFunction.tsx";
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
// import {useForm} from 'react-hook-form';
//
// interface Name {
//     name: string
// }
//
// const schema = yup.object().shape({
//     name: yup.string().matches(/^[a-zA-Z]+$/, 'Name should only contain letters')
//         .min(1, 'Name should be at least 1 character')
//         .max(20, 'Name should be at most 20 characters')
//         .required()
//
// });

function AgeForm() {
    // const {register, handleSubmit, formState: {errors}} = useForm<Name>({
    //     resolver: yupResolver(schema),
    //     mode: "onChange"
    // });

    const [buttonClicked, setButtonClicked] = useState(false);
    const [name, setName] = useState('');
    // const [age, setAge] = useState(null);
    // const [loading, setLoading] = useState(false);
    const prevNameRef = useRef('');
    const controllerRef = useRef<AbortController | null>(null);
    const [isValidAge, setIsValidAge] = useState(true);


    function returnAge(age: string | null) {

        if (age && isValidAge) {
            return `Estimated age: ${age}`;
        } else if (isValidAge) {
            return "";
        }
        return "Имя должно состоятоять только из букв";
    }

    const fetchAge = async (name: string) => {
        prevNameRef.current = name;
        console.log(prevNameRef.current)
        //setLoading(true);
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`, {signal: controllerRef.current.signal});
            const ans = await response.json();
            // setAge(data.age);
            setIsValidAge(true);
            //setLoading(false);
            setButtonClicked(false);
            // reset(ans.age)
            return ans.age;
        } catch (error) {
            throw new Error(`error with fetch: ${error}`);
        } finally {
            setButtonClicked(false);
            //setLoading(false);
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
            const timer = setTimeout(() => fetchAge(name), 3000);
            return () => clearTimeout(timer);
        } else if (!isValid(name)) {
            setIsValidAge(false);
        }
    }, [name, buttonClicked, isValidAge]);

    const handleSubmitSub = (e: React.FormEvent) => {
        e.preventDefault();
        setButtonClicked(true);
        if (isValid(name) && prevNameRef.current !== name) {
            refetch()
        } else if (!isValid(name)) {
            setIsValidAge(false);
        }
    };
    // const onSubmit = (data: Name) => {
    //     setButtonClicked(true);
    //     if (isValid(data.name) && prevNameRef.current !== data.name) {
    //         refetch();
    //     } else if (!isValidAge) {
    //         setIsValidAge(false);
    //     }
    // };
    //
    //
    // return (
    //     <Group>
    //         <Header>{'Age Form Task'}</Header>
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //             <FormItem bottom={errors.name?.message} status={errors.name ? 'error' : 'valid'}>
    //                 <Input type="text" {...register('name')} />
    //             </FormItem>
    //             <FormItem>
    //                 <Button size="l" type="submit">Get Age</Button>
    //             </FormItem>
    //         </form>
    //     </Group>
    // );


    return (
        <Group>
            <Header>{'Age Form Task'}</Header>
            <FormItem bottom={returnAge(data)} status={isValidAge ? 'valid' : 'error'}>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
            </FormItem>
            <FormItem>
                <Button onClick={handleSubmitSub} size="l">Get Age</Button>
            </FormItem>

        </Group>
    );
}

export default AgeForm;