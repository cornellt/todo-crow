import { ChakraProvider } from '@chakra-ui/react'
import '../styles.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <title>todo crow</title>
        <meta property='og:title' content='todo crow' key='title' />
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='description' content='A simple todo app' />
        <meta name='keywords' content='Todo, productivitiy' />
        <meta name='author' content='Thomas Cornell' />
      </Head>
      <Component {...pageProps} />
      <a href='https://www.flaticon.com/free-icons/crow' title='crow icon' className='footer'>Crow icon created by Maximka - Flaticon</a>
    </ChakraProvider>
  )
}

export default MyApp
