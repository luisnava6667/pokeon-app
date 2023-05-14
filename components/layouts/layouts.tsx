import Head from 'next/head'
import { FC, ReactNode } from 'react'
import { Navbar } from '../ui'
interface LayoutProps {
  children: ReactNode
  title?: string
}
const origin = typeof window === 'undefined' ? '' : window.location.origin
export const Layouts: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Luis Navarro' />
        <meta
          name='description'
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
        <meta property='og:title' content={`Información sobre el ${title}`} />
        <meta
          property='og:description'
          content={`Esta es la página sobre${title}`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
        This is how those tags look on Facebook:
      </Head>
      {/* NavBar */}
      <Navbar />
      <main
        style={{
          padding: '0 20px'
        }}>
        {children}
      </main>
    </>
  )
}
