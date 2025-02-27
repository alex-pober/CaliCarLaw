import { BlogPost } from '@/types/blog';

export function generateBlogPostSchema(post: BlogPost, url: string) {
  // Extract post details
  const title = post.properties.Title.title[0]?.plain_text || '';
  const description = post.properties.Description.rich_text[0]?.plain_text || '';
  const datePublished = post.properties.Date.date?.start || '';

  // Create structured data for BlogPosting
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: datePublished,
    url: url,
    author: {
      '@type': 'Organization',
      name: 'California Car Law',
      url: 'https://www.californiacarlaw.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'California Car Law',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.californiacarlaw.com/images/logos/CaliforniaCarLaw-Logo.svg', // Update with your actual logo URL
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return structuredData;
}
