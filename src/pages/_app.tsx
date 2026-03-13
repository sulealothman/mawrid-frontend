import "@/styles/globals.css";
import { useI18n } from '@/features/localization/hooks/useI18n';
import { initializeLanguage } from '@/features/localization/config/config';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthStore } from "@/features/authenticate/store/Auth";
import useAuth from "@/features/authenticate/hooks/useAuth";
import { queryClient } from "@/features/shared/cache/useCache";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout & {
    requireAuth?: boolean;
  };
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { t, language } = useI18n();
  const lastAccessToken = useRef<string | null>(null);
  const access_token = AuthStore(state => state.access_token);
  const { existUserDataOrRetrieve } = useAuth();

  useEffect(() => {
    initializeLanguage();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.querySelector("html");
      if (html) {
        html.dir = t("page_direction");
        html.lang = language;
      }
    }
  }, [language, t]);

  useEffect(() => {
    if (!access_token) return;
    if (lastAccessToken.current === access_token) return;

    lastAccessToken.current = access_token;
    existUserDataOrRetrieve();

  }, [access_token, existUserDataOrRetrieve]);

  return (
    <QueryClientProvider client={queryClient}>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
}
