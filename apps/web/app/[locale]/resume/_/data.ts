import { RESUME_DATA as RESUME_DATA_EN } from './data-en'
import { RESUME_DATA_ZH } from './data-zh'

export type {
  ResumeData,
  ResumeEducation,
  ResumeExperience,
  ResumeInternship,
  ResumeProfile,
  ResumeProject
} from './data-en'

export const getResumeData = (locale: string) => {
  return locale === 'zh' ? RESUME_DATA_ZH : RESUME_DATA_EN
}
