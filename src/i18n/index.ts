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
      { ...resourceAcc, [lang]: { translation: value } },
    ]
  },
  [{}, {}],
)

console.log("displayLangs", displayLangs)
console.log("resources", resources)

void i18n.use(initReactI18next).init({
  resources,
  lng: "zhCN",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
})

const useI18n = () => {
  const { t } = useTranslation()
  return {
    t,
    allLanguages: displayLangs,
    changeLanguage: i18n.changeLanguage.bind(i18n),
  }
}

export { useI18n }
export default i18n
