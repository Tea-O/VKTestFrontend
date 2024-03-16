import ReactDOM from 'react-dom/client'
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import vkBridge from "@vkontakte/vk-bridge";

const queryClient = new QueryClient();
vkBridge.send('VKWebAppInit')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider appearance={"light"}>
        <AdaptivityProvider>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </AdaptivityProvider>
    </ConfigProvider>,
)
