import { LangPair } from "../hooks/useLangPairs"
import { Button } from 'primereact/button';
import { useLayoutSwitcher } from "../hooks/useLayoutSwitcher";
import { BaseSyntheticEvent, useMemo } from "react";
import { Card } from "primereact/card";

type DataCollectionItemProps = {
  id: string
  title: string
  pairs: LangPair[]
  isFavorite?: boolean
  markFavorite: (id: string) => void
  deleteCollection: (e: BaseSyntheticEvent) => void
}

export const DataCollectionItem = ({ id, title, pairs, isFavorite, markFavorite, deleteCollection }: DataCollectionItemProps) => {
  const { setCurrentCollection } = useLayoutSwitcher()

  const learnedPairs = useMemo(() => ({
    quantity: pairs.filter(({ isLearned }) => isLearned).length,
    percent: pairs.filter(({ isLearned }) => isLearned).length / pairs.length * 100
  }), [pairs])

  const statusColor = useMemo(() => (
    learnedPairs.percent === 100
      ? 'var(--green-500)'
      : learnedPairs.percent >= 50
        ? 'var(--yellow-500)'
        : 'var(--text-color)'
  ), [learnedPairs.percent])

  return (
    <li className="collection__list-item">
      <Card style={{ backgroundColor: isFavorite ? 'var(--surface-50)' : '#fff' }}>
        <div onClick={() => setCurrentCollection(id)}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: statusColor
            }}
          >{title}</span>

          <i
            style={{
              fontSize: '0.875rem',
              color: statusColor
            }}
          >Phrases: {pairs.length}; Learned: {learnedPairs.quantity} ({`${learnedPairs.percent.toFixed(0)}%`})</i>
        </div>
        <Button
          icon={`pi ${!isFavorite ? 'pi-star' : 'pi-star-fill'}`}
          className="p-button-sm p-button-rounded p-button-text"
          style={{ color: 'var(--text-color)' }}
          onClick={(e) => markFavorite(id)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-rounded p-button-text"
          style={{ color: 'var(--text-color)' }}
          onClick={(e) => deleteCollection(e)}
        />
      </Card>
    </li>
  )
}