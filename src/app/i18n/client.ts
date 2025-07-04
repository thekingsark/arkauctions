"use client"

import i18next from "i18next"
import { type UseTranslationOptions, initReactI18next, useTranslation as useTranslationOrg } from "react-i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { getOptions } from "./settings"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string) => import(`./locales/${language}.json`)))
  .init({
    ...getOptions(),
    lng: undefined,
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
  })

export function useTranslation(
  lng: string | undefined,
  ns?: string,
  options?: UseTranslationOptions<undefined> | undefined,
) {
  if (i18next.resolvedLanguage !== lng) {
    i18next.changeLanguage(lng)
  }

  return useTranslationOrg(ns, options)
}
