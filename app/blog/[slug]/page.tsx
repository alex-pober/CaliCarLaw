import { Suspense } from "react";
import { notion } from "@/notion";
import { NotionPage } from "@/app/components/notion/index";
import { fetchBySlug } from "@/lib/notion";
import { BlogPost } from '@/types/blog';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

async function getBlogPost(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = await fetchBySlug(slug);
  const blog = await notion.getPage(post.id);
  return { blog, post };
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const blogPostPromise = getBlogPost(props.params);

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-600"></div>
      </div>
    }>
      <BlogContent blogPostPromise={blogPostPromise} />
    </Suspense>
  );
}

async function BlogContent({
  blogPostPromise,
}: {
  blogPostPromise: Promise<{ blog: PageObjectResponse; post: BlogPost }>;
}) {
  const { blog, post } = await blogPostPromise;

  return (
    <main className="max-w-4xl mx-auto">
      {/* <div className="flex justify-center">
        <h1 className="max-w-[684px] text-3xl font-semibold text-gray-800 mt-12 text-left">{post.properties.Title.title[0].plain_text}</h1>
      </div> */}
      <NotionPage recordMap={blog} rootPageId={post.id} />
    </main>
  );
}
