import { NewCollectionForm } from './components/NewCollectionForm';
import { NavBar } from './components/NavBar';
import { DataCollection } from './components/DataCollection';
import { SingleCollection } from './components/SingleCollection';
import { LangPairsProvider } from './hooks/useLangPairs';
import { ToastProvider } from './hooks/useToast';
import { useLayoutSwitcher } from './hooks/useLayoutSwitcher';
import './style.css';

export const App = () => {
  const { layoutParams } = useLayoutSwitcher()
  const { currentCollection } = useLayoutSwitcher()

  return (
    <div
      className="App"
      style={{
        padding: '1rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gap: '1rem'
      }}>
      <LangPairsProvider value={null}>
        <ToastProvider position={'bottom-right'}>
          <NavBar />
          {layoutParams.createSection.isActive &&
            <NewCollectionForm />
          }
          {layoutParams.collectionSection.isActive &&
            <DataCollection />
          }
          {currentCollection &&
            <SingleCollection />
          }
        </ToastProvider>
      </LangPairsProvider>
    </div>
  );
}
