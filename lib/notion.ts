import { Client } from "@notionhq/client";
import { BlogPost } from '@/types/blog';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const transformNotionResponse = (page): BlogPost => {
  return {
    id: page.id,
    properties: {
      Title: page.properties.Title,
      Slug: page.properties.Slug,
      Description: page.properties.Description,
      Date: page.properties.Date,
    },
  };
};

export const fetchPages = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: {
        equals: "Live",
      },
    },
  });

  return {
    results: response.results.map(transformNotionResponse),
  };
};

export const fetchBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });
  return response.results[0] as unknown as BlogPost;
};

export const fetchPageBlocks = React.cache((pageId: string) => {
  return notion.blocks.children
    .list({ block_id: pageId })
  .then((res: { results: unknown; }) => res.results)
});
