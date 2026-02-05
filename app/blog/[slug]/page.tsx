import { Suspense } from "react";
import { notion } from "@/notion";
import { NotionPage } from "@/app/components/notion/index";
import { fetchBySlug, fetchPages } from "@/lib/notion";
import { BlogPost } from '@/types/blog';
import { ExtendedRecordMap } from 'notion-types';
import { Metadata } from 'next';
import { generateBlogPostSchema } from './structured-data';

// Set revalidation period
export const revalidate = 86400; // 24 hours

// Pre-render the most recent posts at build time
export async function generateStaticParams() {
  const data = await fetchPages();
  const recentPosts = data.results.slice(0, 10);

  return recentPosts.map((post) => ({
    slug: post.properties.Slug.rich_text[0]?.plain_text || '',
  }));
}

async function getBlogPost(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const post = await fetchBySlug(slug);
  const blog = await notion.getPage(post.id);
  return { blog, post };
}

// Generate dynamic metadata for each blog post
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { post } = await getBlogPost(params);

  // Extract post details
  const title = post.properties.Title.title[0]?.plain_text || 'Blog Post';
  const description = post.properties.Description.rich_text[0]?.plain_text ||
    'Read our latest blog post on California Car Law';
  const slug = post.properties.Slug.rich_text[0]?.plain_text || '';

  return {
    title: `${title} | California Car Law`,
    description,
    openGraph: {
      title: `${title} | California Car Law`,
      description,
      type: 'article',
      publishedTime: post.properties.Date.date?.start,
      url: `https://www.californiacarlaw.com/blog/${slug}`,
      images: [
        {
          url: 'https://www.californiacarlaw.com/images/logos/CaliforniaCarLaw-Logo.svg', // Default OG image
          width: 770,
          height: 38,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | California Car Law`,
      description,
      images: ['https://www.californiacarlaw.com/images/logos/CaliforniaCarLaw-Logo.svg'], // Default Twitter image
    },
    alternates: {
      canonical: `https://www.californiacarlaw.com/blog/${slug}`,
    },
  };
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  const blogPostPromise = getBlogPost(props.params);

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-600"></div>
      </div>
    }>
      <BlogContent blogPostPromise={blogPostPromise} params={props.params} />
    </Suspense>
  );
}

async function BlogContent({
  blogPostPromise,
  params,
}: {
  blogPostPromise: Promise<{ blog: ExtendedRecordMap; post: BlogPost }>;
  params: Promise<{ slug: string }>;
}) {
  const { blog, post } = await blogPostPromise;
  const { slug } = await params;
  const url = `https://www.californiacarlaw.com/blog/${slug}`;

  // Generate structured data for this blog post
  const structuredData = generateBlogPostSchema(post, url);

  return (
    <main className="max-w-4xl mx-auto">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />


      <NotionPage recordMap={blog} rootPageId={post.id} />
    </main>
  );
}
