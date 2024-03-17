import {useState, useEffect, useRef} from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {Button, FormItem, Group, Header, Input} from "@vkontakte/vkui";
import {useQuery} from "@tanstack/react-query";


function CatFactComponent() {

    const [fetchOnButtonClick, setFetchOnButtonClick] = useState(false);



    const inputRef = useRef<HTMLInputElement>(null);

    const fetchFact = async () => {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            return data.fact;
        } catch (e) {
            console.log(e)
        }
    };

    const {data = '', refetch} = useQuery({
        queryKey: ['getCatFact'],
        queryFn: fetchFact,
        enabled: fetchOnButtonClick

    })

    const handleClick = () => {
        setFetchOnButtonClick(true);
        refetch();
    };

    useEffect(() => {
        if (data) {

            const firstWordEndIndex = data.indexOf(' ');
            if (inputRef.current !== null) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(firstWordEndIndex, firstWordEndIndex);
                inputRef.current.size = data.length;
            }
        }
    }, [data]);

    return (
        <Group>
            <form onSubmit={(event) => {
                event.preventDefault()
            }}>
                <Header>{'Cat Fact Task'}</Header>
                <FormItem>
                    <Input type={"text"} value={data} getRef={inputRef} onChange={event => event.target.value}
                           placeholder={'Нажмите на кнопку, чтобы получить факт о котиках'}/>
                </FormItem>
                <FormItem>
                    <Button onClick={handleClick} size="l">Get Cat Fact</Button>
                </FormItem>
            </form>
        </Group>
    );
}

export default CatFactComponent;