import { LangPairsProvider } from './hooks/useLangPairs';
import { ToastProvider } from './hooks/useToast';
import { LayoutAuthorized } from './layouts/LayoutAuthorized';
import { RoutesAuthorized } from './routes/RoutesAuthorized';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from './hooks/useLocale';
import './style.css'

export const App = () => (
  <BrowserRouter>
    <LocaleProvider>
      <LangPairsProvider value={null}>
        <ToastProvider position={'bottom-right'}>
          <LayoutAuthorized>
            <RoutesAuthorized />
          </LayoutAuthorized>
        </ToastProvider>
      </LangPairsProvider>
    </LocaleProvider>
  </BrowserRouter>
)
