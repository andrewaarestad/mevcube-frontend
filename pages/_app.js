
import '../assets/css/index.scss';

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
}

export default MyApp
