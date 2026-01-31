// source.config.ts
import {
  defineConfig,
  defineDocs,
  frontmatterSchema
} from "fumadocs-mdx/config";
import { z } from "zod";
var docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    }
  }
});
var blog = defineDocs({
  dir: "content/blog",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true
    },
    schema: frontmatterSchema.extend({
      author: z.string(),
      date: z.coerce.date()
    })
  }
});
var source_config_default = defineConfig();
export {
  blog,
  source_config_default as default,
  docs
};
