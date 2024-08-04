import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { EventProvider } from '../context/EventContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EventProvider>
      <Component {...pageProps} />
    </EventProvider>
  );
}
