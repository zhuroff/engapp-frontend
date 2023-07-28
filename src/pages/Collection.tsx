import { DataCollection } from '../components/DataCollection'
import { NavBar } from '../components/NavBar'
import { NewCollectionForm } from '../components/NewCollectionForm'
import { SingleCollection } from '../components/SingleCollection'
import { useLayoutSwitcher } from '../hooks/useLayoutSwitcher'

export const Collection = () => {
  const { layoutParams, currentCollection } = useLayoutSwitcher()

  return (
    <>
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
    </>
  )
}
