import CatFactComponent from './components/CatFactApp';

import AgeForm from "./components/AgeForm.tsx";
import {AppRoot} from "@vkontakte/vkui";

export default function App() {


    return (
        <AppRoot>
            <CatFactComponent />
            <AgeForm />
        </AppRoot>
    );

}