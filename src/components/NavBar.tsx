import { useEffect, useState } from 'react';
import { LayoutSwitcherBoolean, useLayoutSwitcher } from '../hooks/useLayoutSwitcher'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { AppDataItem, useLangPairs } from '../hooks/useLangPairs';
import { useToast } from '../hooks/useToast';

export const NavBar = () => {
  const { layoutParams, setLayoutParams } = useLayoutSwitcher()
  const { langPairs, setLangPair } = useLangPairs()
  const [dialogConfig, setIsDialogConfig] = useState({ isActive: false, isSave: false })
  const [jsonCollection, setJsonCollection] = useState('')
  const toast = useToast()
  const updateLayoutParams = (key: string, value: LayoutSwitcherBoolean) => {
    setLayoutParams({
      ...layoutParams,
      [key]: { ...value, isActive: !value.isActive }
    })
  }
  const getAndPrintJSON = () => {
    const collection = localStorage.getItem('appData')
    if (collection) {
      setJsonCollection(collection)
      setIsDialogConfig({
        isActive: true,
        isSave: false
      })
    }
  }

  const insertJSON = () => {
    setJsonCollection('')
    setIsDialogConfig({
      isActive: true,
      isSave: true
    })
  }

  const addDataToCollection = () => {
    const collection = localStorage.getItem('appData')
    try {
      const newCollection: AppDataItem[] = JSON.parse(jsonCollection)
      const oldCollection: AppDataItem[] = collection ? JSON.parse(collection) : []
      const mergedCollection = Array.from(
        new Map<string, AppDataItem>([
          ...oldCollection.map<[string, AppDataItem]>((el) => [el.id, el]),
          ...newCollection.map<[string, AppDataItem]>((el) => [el.id, el])
        ]).values()
      )
      setLangPair(mergedCollection)
      setIsDialogConfig({
        isActive: false,
        isSave: false
      })
      toast.current?.show({
        severity: 'success',
        summary: 'Data successfully updated',
        // detail: '',
        life: 3000
      })
    } catch (error) {
      console.error(error)
      toast.current?.show({
        severity: 'error',
        summary: 'Something went wrong',
        detail: 'See devtools console for details',
        life: 5000
      })
    }
  }

  useEffect(() => {
    if (langPairs) {
      localStorage.setItem('appData', JSON.stringify(langPairs))
    }
  }, [langPairs])

  return (
    <>
      <nav style={{ position: 'fixed', padding: '1rem', top: 0, left: 0 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {Object.entries(layoutParams).map(([key, value]) => (
            <li key={key} style={{ marginBottom: '0.5rem' }}>
              <Button
                label={value.label}
                onClick={() => updateLayoutParams(key, value)}
                className={`p-button-sm ${value.isActive ? 'p-button-help' : 'p-button-secondary'}`}
              />
            </li>
          ))}
          <li style={{ marginBottom: '0.5rem' }}>
            <Button
              label="Get JSON"
              onClick={() => getAndPrintJSON()}
              className="p-button-sm p-button-secondary"
            />
          </li>
          <li>
            <Button
              label="Add JSON"
              onClick={() => insertJSON()}
              className="p-button-sm p-button-secondary"
            />
          </li>
        </ul>
      </nav>
      <Dialog
        header="JSON collection"
        visible={dialogConfig.isActive}
        style={{ width: '50vw' }}
        onHide={() => setIsDialogConfig({
          isActive: false,
          isSave: false
        })}
      >
        <InputTextarea
          value={jsonCollection}
          onInput={(e) => dialogConfig.isSave ? setJsonCollection(e.currentTarget.value) : false}
          autoResize
        />
        {dialogConfig.isSave &&
          <Button
            label="Save collection"
            disabled={!jsonCollection?.length}
            onClick={addDataToCollection}
            className="p-button-sm p-button-help"
          />
        }
      </Dialog>
    </>
  )
}