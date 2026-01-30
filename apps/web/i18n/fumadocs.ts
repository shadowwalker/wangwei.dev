import type { I18nConfig } from 'fumadocs-core/i18n'
import type { Translations as FumadocsTranslations } from 'fumadocs-ui/i18n'
import type { Locale } from 'next-intl'

import { DEFAULT_LOCALE, LOCALES } from './constants'

export const i18n: I18nConfig = {
  defaultLanguage: DEFAULT_LOCALE,
  languages: LOCALES as unknown as string[],
  hideLocale: 'default-locale'
}

export const fumadocsTranslations: Record<Locale, FumadocsTranslations> = {
  en: {
    search: 'Search',
    searchNoResult: 'No results found',
    toc: 'Table of Contents',
    tocNoHeadings: 'No headings found',
    lastUpdate: 'Last Updated',
    chooseLanguage: 'Choose Language',
    nextPage: 'Next Page',
    previousPage: 'Previous Page',
    chooseTheme: 'Choose Theme',
    editOnGithub: 'Edit on GitHub'
  },
  zh: {
    search: '搜索',
    searchNoResult: '没有找到结果',
    toc: '目录',
    tocNoHeadings: '没有找到目录',
    lastUpdate: '最后更新',
    chooseLanguage: '选择语言',
    nextPage: '下一页',
    previousPage: '上一页',
    chooseTheme: '选择主题',
    editOnGithub: '在 GitHub 上编辑'
  }
}
