import { DarkTheme } from '@/theme'
import { NextUIProvider } from '@nextui-org/react'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={DarkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
