// @ts-nocheck
import * as __fd_glob_17 from "../content/docs/deployment.zh.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/deployment.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/index.zh.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/authentication.zh.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/authentication.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/database.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/database.zh.mdx?collection=docs"
import * as __fd_glob_9 from "../content/blog/small-bets.mdx?collection=blog"
import * as __fd_glob_8 from "../content/blog/ai-copilot.mdx?collection=blog"
import * as __fd_glob_7 from "../content/blog/building-in-public.zh.mdx?collection=blog"
import * as __fd_glob_6 from "../content/blog/tools-matter-less.mdx?collection=blog"
import * as __fd_glob_5 from "../content/blog/ai-copilot.zh.mdx?collection=blog"
import * as __fd_glob_4 from "../content/blog/building-in-public.mdx?collection=blog"
import * as __fd_glob_3 from "../content/blog/slowing-down.mdx?collection=blog"
import * as __fd_glob_2 from "../content/blog/small-bets.zh.mdx?collection=blog"
import * as __fd_glob_1 from "../content/blog/tools-matter-less.zh.mdx?collection=blog"
import * as __fd_glob_0 from "../content/blog/slowing-down.zh.mdx?collection=blog"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const blog = await create.docs("blog", "content/blog", {}, {"slowing-down.zh.mdx": __fd_glob_0, "tools-matter-less.zh.mdx": __fd_glob_1, "small-bets.zh.mdx": __fd_glob_2, "slowing-down.mdx": __fd_glob_3, "building-in-public.mdx": __fd_glob_4, "ai-copilot.zh.mdx": __fd_glob_5, "tools-matter-less.mdx": __fd_glob_6, "building-in-public.zh.mdx": __fd_glob_7, "ai-copilot.mdx": __fd_glob_8, "small-bets.mdx": __fd_glob_9, });

export const docs = await create.docs("docs", "content/docs", {}, {"database.zh.mdx": __fd_glob_10, "database.mdx": __fd_glob_11, "index.mdx": __fd_glob_12, "authentication.mdx": __fd_glob_13, "authentication.zh.mdx": __fd_glob_14, "index.zh.mdx": __fd_glob_15, "deployment.mdx": __fd_glob_16, "deployment.zh.mdx": __fd_glob_17, });