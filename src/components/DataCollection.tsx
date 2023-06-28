import { useLangPairs } from '../hooks/useLangPairs';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { MultiSelect } from 'primereact/multiselect';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useIsReadyState } from "../hooks/useIsReadyState"
import { DataCollectionItem } from './DataCollectionItem';

export const DataCollection = () => {
  const { langPairs, setLangPair } = useLangPairs()
  const [isReady, setIsReady] = useIsReadyState()
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([])
  const sortedCollectionList = useMemo(() => (
    langPairs?.sort((a, b) => (
      a.title.toLowerCase() < b.title.toLowerCase() ? -1 : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : 0
    ))
  ), [langPairs])

  const favoriteCollectionList = useMemo(() => (
    sortedCollectionList?.filter(({ isFavorite }) => isFavorite) || []
  ), [sortedCollectionList])

  const filteredCollectionList = useMemo(() => (
    !selectedFilterOptions.length || selectedFilterOptions.length === 3
      ? sortedCollectionList?.filter(({ isFavorite }) => !isFavorite)
      : sortedCollectionList?.filter(({ pairs, isFavorite }) => {
        if (isFavorite) return false
        const learnedQuantity = pairs.filter(({ isLearned }) => isLearned).length
        let learnedState
        if (learnedQuantity === pairs.length) {
          learnedState = 'learned'
        } else if (learnedQuantity < pairs.length && learnedQuantity >= pairs.length / 2) {
          learnedState = 'half'
        } else {
          learnedState = 'unlearned'
        }
        return selectedFilterOptions.includes(learnedState)
      })
  ), [sortedCollectionList, selectedFilterOptions])

  const callDelConfirmation = (e: BaseSyntheticEvent, id: string) => {
    confirmPopup({
      target: e.currentTarget,
      message: 'Are you sure you want to remove this pair?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => deleteCollection(id)
    })
  }

  const deleteCollection = (delId: string) => {
    langPairs && setLangPair(langPairs?.filter(({ id }) => id !== delId))
  }

  const filterOptions = [
    { name: 'Unlearned', value: 'unlearned' },
    { name: 'Half-learned', value: 'half' },
    { name: 'Learned', value: 'learned' }
  ]

  useEffect(() => {
    if (!isReady) {
      const localFilterOptions = localStorage.getItem('selectedFilterOptions')
      if (localFilterOptions) {
        setSelectedFilterOptions(JSON.parse(localFilterOptions))
        setIsReady(true)
      }
    } else {
      localStorage.setItem('selectedFilterOptions', JSON.stringify(selectedFilterOptions))
    }
  }, [selectedFilterOptions])

  return (
    <div className="collection">
      <header className="heading">
        <h2 style={{ margin: '0 0 1rem' }}>Collection List</h2>
        <MultiSelect
          value={selectedFilterOptions}
          onChange={(e) => setSelectedFilterOptions(e.value)}
          options={filterOptions}
          display="chip"
          optionLabel="name"
          placeholder="Select options"
        />
      </header>
      {(langPairs && Object.keys(langPairs).length > 0 && favoriteCollectionList.length > 0) &&
        <>
          <ul className="collection__list">
            {
              favoriteCollectionList.map(({ id, title, pairs, isFavorite }) => (
                <DataCollectionItem
                  id={id}
                  key={id}
                  title={title}
                  pairs={pairs}
                  isFavorite={isFavorite}
                  markFavorite={(id) => {
                    setLangPair(
                      langPairs.map((row) => (
                        row.id === id
                          ? { ...row, isFavorite: !Boolean(row.isFavorite) }
                          : row
                      ))
                    )
                  }}
                  deleteCollection={(e) => callDelConfirmation(e, id)}
                />
              ))
            }
          </ul>
          <hr />
        </>
      }
      {(langPairs && Object.keys(langPairs).length > 0) &&
        <ul className="collection__list">
          {
            filteredCollectionList?.map(({ id, title, pairs, isFavorite }) => (
              <DataCollectionItem
                id={id}
                key={id}
                title={title}
                pairs={pairs}
                isFavorite={isFavorite}
                markFavorite={(id) => {
                  setLangPair(
                    langPairs.map((row) => (
                      row.id === id
                        ? { ...row, isFavorite: !Boolean(row.isFavorite) }
                        : row
                    ))
                  )
                }}
                deleteCollection={(e) => callDelConfirmation(e, id)}
              />
            ))
          }
        </ul>
      }
      <ConfirmPopup />
    </div>
  )
}
