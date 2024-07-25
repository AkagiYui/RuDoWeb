import i18n from "i18next"
import { initReactI18next, useTranslation } from "react-i18next"

type Translation = {
  [key: string]: string | Translation
}
type LanguageFiles = Record<string, Translation>

const langs = import.meta.glob<LanguageFiles>(["./resources/*.json"], { eager: true })

// 提取语言代码和显示名称
const [displayLangs, resources] = Object.entries(langs).reduce<[Record<string, string>, LanguageFiles]>(
  ([displayAcc, resourceAcc], [key, value]) => {
    const [lang, display] = key.match(/\.\/resources\/(.+)\.json/)![1].split("$")
    return [
      { ...displayAcc, [lang]: display || lang },
      { ...resourceAcc, [lang]: value },
    ]
  },
  [{}, {}],
)

console.debug("displayLangs", displayLangs)
console.debug("resources", resources)

const LANGUAGE_KEY = "user_language"

void i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(LANGUAGE_KEY) || "zhCN",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

const useI18n = (namespace?: string) => {
  const { t } = useTranslation(namespace)
  return {
    t,
    currentLanguage: i18n.language,
    allLanguages: displayLangs,
    changeLanguage: (lang: string, cb?: () => void) => {
      void i18n.changeLanguage(lang, (err) => {
        if (err) {
          console.error("changeLanguage", err)
        } else {
          localStorage.setItem(LANGUAGE_KEY, lang)
          cb?.()
        }
      })
    }
  }
}

export { useI18n }
export default i18n
