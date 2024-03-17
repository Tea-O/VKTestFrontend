import CatFactComponent from './components/CatFactApp';
import AgeForm from "./components/AgeForm.tsx";
import {AppRoot} from "@vkontakte/vkui";
export const App = () => {

    return (
        <AppRoot>
            <CatFactComponent />
            <AgeForm />
        </AppRoot>
    );

}