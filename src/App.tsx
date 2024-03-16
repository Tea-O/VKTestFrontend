import CatFactComponent from './components/CatFactApp';

import AgeForm from "./components/AgeForm.tsx";
import {AppRoot} from "@vkontakte/vkui";
// import {useState} from "react";

export default function App() {

    // const [panel, setPanel] = useState('fact')
    return (
        <AppRoot>
            <CatFactComponent />
            <AgeForm />
        </AppRoot>
    );
    // return (
    //     <AppRoot>
    //         <Panel id="main">
    //             <PanelHeader>VK INTERSHIP</PanelHeader>
    //             <Group>
    //                 <CellButton onClick={() => setPanel('catFact')} style={{width: '100%'}}>
    //                     Cat Fact Task
    //                 </CellButton>
    //                 <CellButton onClick={() => setPanel('ageForm')} style={{width: '100%'}}>
    //                     Age Form Task
    //                 </CellButton>
    //             </Group>
    //             <View activePanel={panel}>
    //                 <Panel id={'catFact'}>
    //                     <CatFactComponent/>
    //                 </Panel>
    //                 <Panel id={'ageForm'}>
    //                     <AgeForm/>
    //                 </Panel>
    //             </View>
    //         </Panel>
    //     </AppRoot>
    // );
}