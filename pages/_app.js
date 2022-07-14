import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <a href="https://www.flaticon.com/free-icons/crow" title="crow icon" className='footer'>Crow icon created by Maximka - Flaticon</a>
    </ChakraProvider>
  )
}

export default MyApp
