import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import RouterGuard from '../src/components/RouterGuard'

const App = ({ Component, pageProps }: AppProps) => 
    <RouterGuard>
      <Component {...pageProps} />
    </RouterGuard>

export default App
