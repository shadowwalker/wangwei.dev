import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from 'fumadocs-mdx/config'
import { z } from 'zod'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
})

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    },
    schema: frontmatterSchema.extend({
      author: z.string(),
      date: z.coerce.date()
    })
  }
})

export default defineConfig()
