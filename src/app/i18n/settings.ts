export const fallbackLng = "en"
export const languages = [fallbackLng, "es", "fr", "de", "it", "ja", "ar", "ro"]
export const defaultNS = "translation"
export const cookieName = "i18next"

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
