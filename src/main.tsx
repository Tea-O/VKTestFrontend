import ReactDOM from 'react-dom/client'
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import vkBridge from "@vkontakte/vk-bridge";
import {AppConfig} from "./AppConfig.tsx";

const queryClient = new QueryClient();
vkBridge.send('VKWebAppInit')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider appearance={"light"}>
        <AdaptivityProvider>
            <QueryClientProvider client={queryClient}>
                <AppConfig/>
            </QueryClientProvider>
        </AdaptivityProvider>
    </ConfigProvider>,
)
