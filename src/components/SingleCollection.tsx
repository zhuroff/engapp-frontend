import { BaseSyntheticEvent, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { v4 as uuid } from 'uuid'
import { useIsReadyState } from "../hooks/useIsReadyState"
import { AppDataItem, LangPair, useLangPairs } from "../hooks/useLangPairs"
import { useLayoutSwitcher } from "../hooks/useLayoutSwitcher"
import { SingleCollectionItem } from "./SingleCollectionItem"
import { Button } from "primereact/button"
import { OverlayPanel } from 'primereact/overlaypanel';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { InputTextarea } from 'primereact/inputtextarea';

export const SingleCollection = () => {
  const { currentCollection } = useLayoutSwitcher()
  const { langPairs, setLangPair } = useLangPairs()
  const [isReady, setIsReady] = useIsReadyState()
  const [collectionData, setCollectionData] = useState<AppDataItem | null>(null)
  const [commentableRow, setCommentableRow] = useState<LangPair | null>(null)
  const [isLearnedHidden, setIsLearnedHidden] = useState(Number(localStorage.getItem('isLearnedHidden')))
  const commentPanelRef = useRef<OverlayPanel>(null)

  const updatePropertyValue = <T,>(prop: keyof LangPair, value: T, id: string) => {
    collectionData && setCollectionData({
      ...collectionData,
      pairs: collectionData.pairs.map((pair) => {
        if (pair.id !== id) {
          return pair
        }

        if (prop === 'isLearned') {
          pair.toRepeat = false
        }

        if (prop === 'toRepeat') {
          pair.isLearned = false
        }

        return { ...pair, [prop]: value }
      })
    })
    !isReady && setIsReady(true)
  }

  const hideShowWholeColumn = (prop: keyof LangPair, value: boolean) => {
    collectionData && setCollectionData({
      ...collectionData,
      pairs: collectionData.pairs.map((pair) => ({
        ...pair,
        [prop]: value
      }))
    })
  }

  const activateCommentModal = (e: SyntheticEvent, data: LangPair) => {
    setCommentableRow(data)
    commentPanelRef.current?.toggle(e)
  }

  const callDelConfirmation = (e: BaseSyntheticEvent, delId: string) => {
    collectionData && confirmPopup({
      target: e.currentTarget,
      message: 'Are you sure you want to remove this pair?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        (langPairs && collectionData) && setLangPair(
          langPairs.map((row) => (
            row.id === collectionData.id
              ? { ...row, pairs: row.pairs.filter(({ id }) => id !== delId) }
              : row
          ))
        )
      }
    })
  }

  const switchLearnedView = () => {
    const value = isLearnedHidden === 1 ? 0 : 1
    setIsLearnedHidden(value)
    localStorage.setItem('isLearnedHidden', String(value))
  }

  const addCollectionPair = () => {
    (langPairs && collectionData) && setLangPair(
      langPairs.map((row) => (
        row.id === collectionData.id
          ? {
            ...row, pairs: [...row.pairs, {
              id: uuid(),
              langA: '',
              langB: '',
              comment: '',
              toRepeat: false,
              isLearned: false,
              isLangAVisible: true,
              isLangBVisible: true
            }]
          }
          : row
      ))
    )
  }

  const isColumnVisible = useCallback((prop: keyof LangPair) => (
    collectionData && collectionData?.pairs.every((pair) => pair[prop])
  ), [collectionData])

  const iconClass = useCallback((prop: keyof LangPair) => (
    `pi pi-eye${isColumnVisible(prop) ? '-slash' : ''}`
  ), [isColumnVisible])

  const visibilityButtonClass = useCallback((prop: keyof LangPair) => (
    `p-button-sm p-button-rounded ${isColumnVisible(prop) ? 'p-button-text' : 'p-button-secondary'}`
  ), [isColumnVisible])

  const tableData = useMemo(() => {
    return !isLearnedHidden ? collectionData?.pairs : collectionData?.pairs.filter(({ isLearned }) => !isLearned)
  }, [isLearnedHidden, collectionData?.pairs])

  useEffect(() => {
    setCollectionData(langPairs?.find(({ id }) => id === currentCollection) || null)
  }, [langPairs, currentCollection])

  useEffect(() => {
    isReady && langPairs && setLangPair(langPairs?.map((collection) => (
      collection.id === collectionData?.id ? collectionData : collection
    )))
  }, [collectionData])

  useEffect(() => {
    commentableRow && updatePropertyValue('comment', commentableRow.comment, commentableRow.id)
  }, [commentableRow?.comment])

  useEffect(() => {
    isReady && langPairs && localStorage.setItem('appData', JSON.stringify(langPairs))
  }, [langPairs])

  return (
    <>
      <header className="heading">
        <h2 style={{ marginBottom: 0 }}>{collectionData?.title}</h2>
      </header>
      <table className="table">
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th style={{ width: '45px', maxWidth: '45px', minWidth: '45px' }}>
              <Button
                title="Hide column"
                icon={iconClass('isLangAVisible')}
                className={visibilityButtonClass('isLangAVisible')}
                onClick={() => hideShowWholeColumn('isLangAVisible', !isColumnVisible('isLangAVisible'))}
                style={{ color: isColumnVisible('isLangAVisible') ? 'var(--text-color)' : 'var(--surface-f)' }}
              />
            </th>
            <th>Phrase or word</th>
            <th style={{ width: '45px', maxWidth: '45px', minWidth: '45px', textAlign: 'center' }}>
              <Button
                title="Hide column"
                icon={iconClass('isLangBVisible')}
                className={visibilityButtonClass('isLangBVisible')}
                onClick={() => hideShowWholeColumn('isLangBVisible', !isColumnVisible('isLangBVisible'))}
                style={{ color: isColumnVisible('isLangBVisible') ? 'var(--text-color)' : 'var(--surface-f)' }}
              />
            </th>
            <th>Translation</th>
            <th
              colSpan={4}
              style={{ textAlign: 'right', width: '180px', maxWidth: '180px', minWidth: '180px' }}
            >
              <Button
                label={isLearnedHidden ? 'Show all' : 'Hide learned'}
                className="p-button-help p-button-sm"
                onClick={switchLearnedView}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            tableData?.map((pair) => (
              <SingleCollectionItem
                data={pair}
                key={pair.id}
                changeRowProperty={(prop, value) => updatePropertyValue(prop, value, pair.id)}
                openCommentField={(e, data) => activateCommentModal(e, data)}
                deleteRow={(e, id) => callDelConfirmation(e, id)}
              />
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8} style={{ textAlign: 'right' }}>
              <Button
                label="Add row"
                className="p-button-help p-button-sm"
                onClick={addCollectionPair}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <OverlayPanel
        ref={commentPanelRef}
        showCloseIcon
        id="overlay_panel"
      >
        {commentableRow &&
          <InputTextarea
            placeholder="Comment"
            value={commentableRow.comment}
            onInput={(e) => setCommentableRow({ ...commentableRow, comment: e.currentTarget.value })}
            autoResize
          />
        }
      </OverlayPanel>
      <ConfirmPopup />
    </>
  )
}