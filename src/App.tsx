import { NewCollectionForm } from './components/NewCollectionForm';
import { NavBar } from './components/NavBar';
import { DataCollection } from './components/DataCollection';
import { SingleCollection } from './components/SingleCollection';
import { LangPairsProvider } from './hooks/useLangPairs';
import { ToastProvider } from './hooks/useToast';
import { useLayoutSwitcher } from './hooks/useLayoutSwitcher';
import './style.css';
import { LayoutAuthorized } from './layouts/LayoutAuthorized';
import { RoutesAuthorized } from './routes/RoutesAuthorized';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  // const { layoutParams } = useLayoutSwitcher()
  // const { currentCollection } = useLayoutSwitcher()

  return (
    <BrowserRouter>
      <LangPairsProvider value={null}>
        <ToastProvider position={'bottom-right'}>
          <LayoutAuthorized>
            <RoutesAuthorized />
          </LayoutAuthorized>
          {/* <NavBar />
          {layoutParams.createSection.isActive &&
            <NewCollectionForm />
          }
          {layoutParams.collectionSection.isActive &&
            <DataCollection />
          }
          {currentCollection &&
            <SingleCollection />
          } */}
        </ToastProvider>
      </LangPairsProvider>
    </BrowserRouter>
  );
}
