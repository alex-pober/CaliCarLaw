import { UUID } from "crypto";

export interface BlogPost {
  id: UUID;
  properties: {
    Title: { title: { plain_text: string }[] };
    Slug: { rich_text: { plain_text: string }[] };
    Description: { rich_text: { plain_text: string }[] };
    Date: { date: { start: string } };
  };
}
