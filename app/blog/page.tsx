/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fetchPages } from '@/lib/notion';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

async function getLivePosts() {
  "use cache"
  cacheLife('hours')
  return fetchPages();
}

export default async function BlogPage() {
  const data = await getLivePosts();

  if (!data) {
    console.log('Failed to fetch data from Notion');
    return <div>Failed to load blog posts</div>;
  }

  interface BlogListProps {
    data: { results: BlogPost[] };
  }

  const BlogList = ({ data }: BlogListProps) => {
    return (
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Blog Posts</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.results.map((blog, index) => (
              <Link
                key={index}
                href={`/blog/${blog.properties.Slug.rich_text[0]?.plain_text}`}
                className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-semibold text-gray-900">{blog.properties.Title.title[0]?.plain_text}</h2>
                  {blog.properties.Date?.date?.start && (
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {new Date(blog.properties.Date.date.start).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{blog.properties.Description.rich_text[0]?.plain_text || 'No description available'}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <BlogList data={data} />
  );
}
