import { fetchBySlug } from "@/lib/notion";
import { notion } from "@/notion";
import { NotionPage } from "@/app/components/notion/index";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

async function getData(rootPageId: string) {
  'use cache';
  cacheLife('hours')
  return await notion.getPage(rootPageId);
}

async function getSlug(slug: string) {
  'use cache';
  cacheLife('hours')
  return await fetchBySlug(slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params; // Ensure params are correctly accessed

  try {
    const post = await getSlug(slug);

    if (!post?.id) {
      throw new Error(`Invalid or missing post for slug: ${slug}`);
    }

    const blog = await getData(post.id);

    return (
      <main className="max-w-5xl mx-auto">
        <NotionPage recordMap={blog} rootPageId={post.id} />
      </main>
    );

  } catch (error) {
    console.error('Error fetching post:', error);
    return <div className="text-center text-red-500">Error loading page.</div>;
  }
}
