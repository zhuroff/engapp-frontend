import { ReactNode, createContext, useContext, useState, useEffect } from 'react'

export type CollectionCategory = {
  id: string
  title: string
  collectionIds: AppDataItem['id'][]
}

export type LangPair = {
  id: string;
  langA: string;
  langB: string;
  comment: string;
  toRepeat: boolean;
  isLearned: boolean;
  isLangAVisible: boolean;
  isLangBVisible: boolean;
}

export type AppDataItem = {
  id: string
  title: string
  pairs: LangPair[]
  inCollections?: CollectionCategory['id'][]
  isFavorite?: boolean
}

interface LangPairCtx {
  langPairs: AppDataItem[] | null
  setLangPair: (payload: AppDataItem[]) => void
}

interface LangPairProps {
  value: AppDataItem[] | null
  children: ReactNode
}

const LangPairContext = createContext<LangPairCtx>({
  langPairs: null,
  setLangPair: (payload: AppDataItem[]) => { }
})

export const useLangPairs = () => useContext(LangPairContext)
export const LangPairsProvider = ({ value, children }: LangPairProps) => {
  const [langPairs, setLangPair] = useState<typeof value>(value)

  useEffect(() => {
    const data = localStorage.getItem('appData')
    if (data) {
      setLangPair(JSON.parse(data))
    }
  }, [])

  return (
    <LangPairContext.Provider value={{ langPairs, setLangPair }}>
      {children}
    </LangPairContext.Provider>
  )
}
