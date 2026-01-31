// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  blog: create.doc("blog", {"slowing-down.zh.mdx": () => import("../content/blog/slowing-down.zh.mdx?collection=blog"), "tools-matter-less.zh.mdx": () => import("../content/blog/tools-matter-less.zh.mdx?collection=blog"), "small-bets.zh.mdx": () => import("../content/blog/small-bets.zh.mdx?collection=blog"), "slowing-down.mdx": () => import("../content/blog/slowing-down.mdx?collection=blog"), "building-in-public.mdx": () => import("../content/blog/building-in-public.mdx?collection=blog"), "ai-copilot.zh.mdx": () => import("../content/blog/ai-copilot.zh.mdx?collection=blog"), "tools-matter-less.mdx": () => import("../content/blog/tools-matter-less.mdx?collection=blog"), "building-in-public.zh.mdx": () => import("../content/blog/building-in-public.zh.mdx?collection=blog"), "ai-copilot.mdx": () => import("../content/blog/ai-copilot.mdx?collection=blog"), "small-bets.mdx": () => import("../content/blog/small-bets.mdx?collection=blog"), }),
  docs: create.doc("docs", {"database.zh.mdx": () => import("../content/docs/database.zh.mdx?collection=docs"), "database.mdx": () => import("../content/docs/database.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "authentication.mdx": () => import("../content/docs/authentication.mdx?collection=docs"), "authentication.zh.mdx": () => import("../content/docs/authentication.zh.mdx?collection=docs"), "index.zh.mdx": () => import("../content/docs/index.zh.mdx?collection=docs"), "deployment.mdx": () => import("../content/docs/deployment.mdx?collection=docs"), "deployment.zh.mdx": () => import("../content/docs/deployment.zh.mdx?collection=docs"), }),
};
export default browserCollections;