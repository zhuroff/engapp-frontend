/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

interface LayoutAuthorizedProps {
  children: ReactNode
}

export const LayoutAuthorized = ({ children }: LayoutAuthorizedProps) => {
  return (
    <div className="app" css={appGrid}>
      <Sidebar />
      <Header />
      <main className="main">
        <section className="section">{children}</section>
      </main>
    </div>
  )
}

const appGrid = css`
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template-columns: 230px 1fr;
  grid-template-rows: 60px 1fr;

  aside {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  header {
    grid-column: 2;
    grid-row: 1;
  }

  main {
    grid-column: 2;
    grid-row: 2;
    overflow: auto;
  }
`
