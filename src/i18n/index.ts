import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import aboutAr from './locales/ar/about.json'
import catalogAr from './locales/ar/catalog.json'
import commonAr from './locales/ar/common.json'
import consultationAr from './locales/ar/consultation.json'
import contactAr from './locales/ar/contact.json'
import eventsAr from './locales/ar/events.json'
import faqAr from './locales/ar/faq.json'
import homeAr from './locales/ar/home.json'
import industriesAr from './locales/ar/industries.json'
import leadFormsAr from './locales/ar/leadForms.json'
import partnersAr from './locales/ar/partners.json'
import registerInterestAr from './locales/ar/registerInterest.json'
import requestInformationAr from './locales/ar/requestInformation.json'
import requestQuoteAr from './locales/ar/requestQuote.json'
import resourcesAr from './locales/ar/resources.json'
import solutionsAr from './locales/ar/solutions.json'
import successStoriesAr from './locales/ar/successStories.json'
import testimonialsAr from './locales/ar/testimonials.json'
import trainingDetailsAr from './locales/ar/trainingDetails.json'
import trainingsAr from './locales/ar/trainings.json'
import aboutEn from './locales/en/about.json'
import catalogEn from './locales/en/catalog.json'
import commonEn from './locales/en/common.json'
import consultationEn from './locales/en/consultation.json'
import contactEn from './locales/en/contact.json'
import eventsEn from './locales/en/events.json'
import faqEn from './locales/en/faq.json'
import homeEn from './locales/en/home.json'
import industriesEn from './locales/en/industries.json'
import leadFormsEn from './locales/en/leadForms.json'
import partnersEn from './locales/en/partners.json'
import registerInterestEn from './locales/en/registerInterest.json'
import requestInformationEn from './locales/en/requestInformation.json'
import requestQuoteEn from './locales/en/requestQuote.json'
import resourcesEn from './locales/en/resources.json'
import solutionsEn from './locales/en/solutions.json'
import successStoriesEn from './locales/en/successStories.json'
import testimonialsEn from './locales/en/testimonials.json'
import trainingDetailsEn from './locales/en/trainingDetails.json'
import trainingsEn from './locales/en/trainings.json'
import aboutFr from './locales/fr/about.json'
import catalogFr from './locales/fr/catalog.json'
import commonFr from './locales/fr/common.json'
import consultationFr from './locales/fr/consultation.json'
import contactFr from './locales/fr/contact.json'
import eventsFr from './locales/fr/events.json'
import faqFr from './locales/fr/faq.json'
import homeFr from './locales/fr/home.json'
import industriesFr from './locales/fr/industries.json'
import leadFormsFr from './locales/fr/leadForms.json'
import partnersFr from './locales/fr/partners.json'
import registerInterestFr from './locales/fr/registerInterest.json'
import requestInformationFr from './locales/fr/requestInformation.json'
import requestQuoteFr from './locales/fr/requestQuote.json'
import resourcesFr from './locales/fr/resources.json'
import solutionsFr from './locales/fr/solutions.json'
import successStoriesFr from './locales/fr/successStories.json'
import testimonialsFr from './locales/fr/testimonials.json'
import trainingDetailsFr from './locales/fr/trainingDetails.json'
import trainingsFr from './locales/fr/trainings.json'

export const supportedLanguages = ['fr', 'en', 'ar'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

/**
 * Direction is derived from the active language, never chosen separately
 * (spec §14/§15). Adding a language later means adding one entry here.
 */
export const languageDirection: Record<SupportedLanguage, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  ar: 'rtl',
}

export const defaultLanguage: SupportedLanguage = 'fr'

/**
 * `leadForms` (M5) is the shared field-label/validation/action namespace
 * every one of the 5 lead forms pulls from; `requestInformation`,
 * `requestQuote`, `contact`, `registerInterest`, `consultation` each hold
 * only that one page's seo/hero/success copy.
 */
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        common: commonFr,
        home: homeFr,
        trainings: trainingsFr,
        catalog: catalogFr,
        trainingDetails: trainingDetailsFr,
        about: aboutFr,
        testimonials: testimonialsFr,
        partners: partnersFr,
        successStories: successStoriesFr,
        events: eventsFr,
        resources: resourcesFr,
        faq: faqFr,
        industries: industriesFr,
        solutions: solutionsFr,
        leadForms: leadFormsFr,
        requestInformation: requestInformationFr,
        requestQuote: requestQuoteFr,
        contact: contactFr,
        registerInterest: registerInterestFr,
        consultation: consultationFr,
      },
      en: {
        common: commonEn,
        home: homeEn,
        trainings: trainingsEn,
        catalog: catalogEn,
        trainingDetails: trainingDetailsEn,
        about: aboutEn,
        testimonials: testimonialsEn,
        partners: partnersEn,
        successStories: successStoriesEn,
        events: eventsEn,
        resources: resourcesEn,
        faq: faqEn,
        industries: industriesEn,
        solutions: solutionsEn,
        leadForms: leadFormsEn,
        requestInformation: requestInformationEn,
        requestQuote: requestQuoteEn,
        contact: contactEn,
        registerInterest: registerInterestEn,
        consultation: consultationEn,
      },
      ar: {
        common: commonAr,
        home: homeAr,
        trainings: trainingsAr,
        catalog: catalogAr,
        trainingDetails: trainingDetailsAr,
        about: aboutAr,
        testimonials: testimonialsAr,
        partners: partnersAr,
        successStories: successStoriesAr,
        events: eventsAr,
        resources: resourcesAr,
        faq: faqAr,
        industries: industriesAr,
        solutions: solutionsAr,
        leadForms: leadFormsAr,
        requestInformation: requestInformationAr,
        requestQuote: requestQuoteAr,
        contact: contactAr,
        registerInterest: registerInterestAr,
        consultation: consultationAr,
      },
    },
    supportedLngs: supportedLanguages,
    fallbackLng: defaultLanguage,
    defaultNS: 'common',
    ns: [
      'common',
      'home',
      'trainings',
      'catalog',
      'trainingDetails',
      'about',
      'testimonials',
      'partners',
      'successStories',
      'events',
      'resources',
      'faq',
      'industries',
      'solutions',
      'leadForms',
      'requestInformation',
      'requestQuote',
      'contact',
      'registerInterest',
      'consultation',
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // 'querystring' first so a crawler-facing `?lng=fr|en|ar` URL (used
      // only by hreflang links / the sitemap — no in-app link ever adds
      // this param) genuinely renders that language; falls through to the
      // pre-existing localStorage/navigator behavior for every real visit,
      // which is completely unchanged (spec M7 §2 "Do NOT change the
      // current language UX").
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lng',
      caches: ['localStorage'],
    },
  })

export default i18n
