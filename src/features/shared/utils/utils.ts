import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import moment from "moment";
import 'moment/min/locales';

export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));


export const momentFormat = (d: moment.MomentInput, lang: moment.LocaleSpecifier): string => {
    moment.defineLocale('ar', {
        parentlocale: 'ar-sa',
        preparse: function (str: string) {
            return str;
        },
        postformat: function (str: string) {
            return str;
        }
    });
    return moment(d).locale(lang).format('LL') as string
}

export const momentFromNow = (d: moment.MomentInput, lang: moment.LocaleSpecifier): string => {
    moment.defineLocale('ar', {
        parentlocale: 'ar-sa',
        preparse: function (str: string) {
            return str;
        },
        postformat: function (str: string) {
            return str;
        }
    });
    return moment(d).locale(lang).fromNow() as string
}

export const IS_SERVER = typeof window === "undefined";

export function getProtocol() {
    const isProd = process.env.NEXT_PUBLIC_API_URL === "production";
    if (isProd) return "https://";
    return "http://";
  }
  
  export function getAbsoluteUrl() {
    //get absolute url in client/browser
    if (!IS_SERVER) {
      return location.origin;
    }
    //get absolute url in server.
    const protocol = getProtocol();
    if (process.env.NEXT_URL) {
      return `${protocol}${process.env.NEXT_URL}`;
    }
  }