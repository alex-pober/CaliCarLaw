import { MetadataRoute } from 'next';
import { fetchPages } from '@/lib/notion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const { results } = await fetchPages();

  // Create sitemap entries for blog posts
  const blogEntries = results.map((post) => {
    const slug = post.properties.Slug.rich_text[0]?.plain_text || '';
    return {
      url: `https://www.californiacarlaw.com/blog/${slug}`,
      lastModified: new Date(post.properties.Date.date?.start || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  // Add static pages
  const staticPages = [
    {
      url: 'https://www.californiacarlaw.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: 'https://www.californiacarlaw.com/find-your-california-court',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.californiacarlaw.com/trial-by-declaration',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.californiacarlaw.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Add other important pages here
  ];

  return [...staticPages, ...blogEntries];
}
