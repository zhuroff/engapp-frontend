import { BaseSyntheticEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { LangPair } from "../hooks/useLangPairs"
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

type EditableFieldsDict = Partial<Record<keyof Pick<LangPair, 'langA' | 'langB'>, string>>

type SingleCollectionItemProps = {
  data: LangPair
  changeRowProperty: (prop: keyof LangPair, value: string | boolean) => void
  openCommentField: (e: SyntheticEvent, data: LangPair) => void
  deleteRow: (e: BaseSyntheticEvent, id: string) => void
}

export const SingleCollectionItem = ({ data, changeRowProperty, openCommentField, deleteRow }: SingleCollectionItemProps) => {
  const [editableFields, setEditableFields] = useState<EditableFieldsDict>({})
  const iconClass = useCallback((prop: keyof LangPair) => (
    `pi pi-eye${data[prop] ? '-slash' : ''}`
  ), [data])

  const visibilityButtonClass = useCallback((prop: keyof LangPair) => (
    `p-button-sm p-button-rounded ${data[prop] ? 'p-button-text' : 'p-button-secondary'}`
  ), [data])

  const phraseColor = useMemo(() => (
    data.isLearned ? 'var(--green-500)' : data.toRepeat ? 'var(--yellow-500)' : 'var(--text-color)'
  ), [data])

  useEffect(() => {
    if (!data.langA.length || !data.langB.length) {

      if (!data.langB.length) {
        setEditableFields({ ...editableFields, langB: '' })
      }
      if (!data.langA.length) {
        setEditableFields({ ...editableFields, langA: '' })
      }
    }
  }, [data])

  return (
    <tr>
      <td>
        <Button
          title="Hide phrase"
          icon={iconClass('isLangAVisible')}
          className={visibilityButtonClass('isLangAVisible')}
          onClick={() => changeRowProperty('isLangAVisible', !data.isLangAVisible)}
          style={{ color: data.isLangAVisible ? 'var(--text-color)' : 'var(--surface-f)' }}
        />
      </td>
      <td>
        {
          ('langA' in editableFields)
            ? <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <InputTextarea
                autoResize
                placeholder="Phrase"
                value={editableFields.langA}
                style={{ flex: '1 1 0', marginRight: '0.5rem' }}
                onInput={(e) => setEditableFields(
                  'langB' in editableFields
                    ? { langA: e.currentTarget.value, langB: editableFields.langB }
                    : { langA: e.currentTarget.value }
                )}
              />
              <Button
                title="Save changes"
                icon="pi pi-sync"
                className="p-button-sm p-button-rounded p-button-text"
                style={{ flex: 'none', color: 'var(--text-color)' }}
                disabled={!editableFields.langA?.length}
                onClick={() => {
                  if (editableFields.langA?.length) {
                    changeRowProperty('langA', editableFields.langA)
                    setEditableFields('langB' in editableFields ? { langB: editableFields.langB } : {})
                  }
                }}
              />
            </div>
            : <div
              style={{ display: 'flex', alignItems: 'center' }}
              onDoubleClick={() => setEditableFields({ langA: data.langA })}
            >
              <span style={{ color: phraseColor }}>{data.isLangAVisible && data.langA}</span>
            </div>
        }
      </td>
      <td>
        <Button
          title="Hide phrase"
          icon={iconClass('isLangBVisible')}
          className={visibilityButtonClass('isLangBVisible')}
          onClick={() => changeRowProperty('isLangBVisible', !data.isLangBVisible)}
          style={{ color: data.isLangBVisible ? 'var(--text-color)' : 'var(--surface-f)' }}
        />
      </td>
      <td>
        {
          ('langB' in editableFields)
            ? <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <InputTextarea
                autoResize
                placeholder="Translate"
                value={editableFields.langB}
                style={{ flex: '1 1 0', marginRight: '0.5rem' }}
                onInput={(e) => setEditableFields(
                  'langA' in editableFields
                    ? { langB: e.currentTarget.value, langA: editableFields.langA }
                    : { langB: e.currentTarget.value }
                )}
              />
              <Button
                title="Save changes"
                icon="pi pi-sync"
                className="p-button-sm p-button-rounded p-button-text"
                style={{ flex: 'none', color: 'var(--text-color)' }}
                disabled={!editableFields.langB?.length}
                onClick={() => {
                  if (editableFields.langB?.length) {
                    changeRowProperty('langB', editableFields.langB)
                    setEditableFields('langA' in editableFields ? { langA: editableFields.langA } : {})
                  }
                }}
              />
            </div>
            : <div
              style={{ display: 'flex', alignItems: 'center' }}
              onDoubleClick={() => setEditableFields({ langB: data.langB })}
            >
              <span style={{ color: phraseColor }}>{data.isLangBVisible && data.langB}</span>
            </div>
        }
      </td>
      <td>
        <Button
          icon="pi pi-check"
          title="Mark as learned"
          className={`p-button-sm p-button-rounded ${!data.isLearned ? 'p-button-text' : 'p-button-secondary'}`}
          disabled={Object.keys(editableFields).length > 0}
          style={{ color: !data.isLearned ? 'var(--text-color)' : 'var(--surface-f)' }}
          onClick={() => changeRowProperty('isLearned', !data.isLearned)}
        />
      </td>
      <td>
        <Button
          icon="pi pi-replay"
          title="Mark as needed for repetition"
          className={`p-button-sm p-button-rounded ${!data.toRepeat ? 'p-button-text' : 'p-button-secondary'}`}
          disabled={Object.keys(editableFields).length > 0}
          style={{ color: !data.toRepeat ? 'var(--text-color)' : 'var(--surface-f)' }}
          onClick={() => changeRowProperty('toRepeat', !data.toRepeat)}
        />
      </td>
      <td>
        <Button
          icon="pi pi-info-circle"
          title="Add/read comment"
          className={`p-button-sm p-button-rounded p-button-text`}
          style={{ color: !data.comment?.length ? 'var(--text-color)' : 'var(--yellow-500)' }}
          onClick={(e) => openCommentField(e, data)}
        />
      </td>
      <td>
        <Button
          icon="pi pi-trash"
          title="Delete row"
          className="p-button-sm p-button-rounded p-button-text"
          style={{ color: 'var(--text-color)' }}
          onClick={(e) => deleteRow(e, data.id)}
        />
      </td>
    </tr>
  )
}
