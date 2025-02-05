import { Suspense } from "react";
import { notion } from "@/notion";
import { NotionPage } from "@/app/components/notion/index";
import { fetchBySlug } from "@/lib/notion";

async function getBlogPost(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = await fetchBySlug(slug);
  const blog = await notion.getPage(post.id);
  return { blog, post };
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const blogPostPromise = getBlogPost(props.params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent blogPostPromise={blogPostPromise} />
    </Suspense>
  );
}

async function BlogContent({
  blogPostPromise,
}: {
  blogPostPromise: Promise<{ blog: any; post: any }>;
}) {
  const { blog, post } = await blogPostPromise;

  return (
    <main className="max-w-5xl mx-auto">
      <NotionPage recordMap={blog} rootPageId={post.id} />
    </main>
  );
}
