import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  alternateLanguages?: Array<{ lang: string; url: string }>;
  structuredData?: object;
}

const SEOHead = ({
  title = 'Dr. Christos Etoka | Mind Engineering & Transformational Leadership',
  description = 'Executive Vice Chancellor of Xrislid Institute. Transforming lives through Mind Engineering, leadership development, and human capacity building. Book Dr. Christos for speaking engagements and executive coaching.',
  keywords = [
    'mind engineering',
    'leadership development',
    'transformational education',
    'executive coaching',
    'Dr. Christos Etoka',
    'Xrislid Institute',
    'human capacity development',
    'transformational leadership',
    'executive presence',
    'mental resilience',
    'leadership transformation',
    'personal development',
    'professional growth',
    'mindset coaching',
    'business leadership'
  ],
  image = 'https://drchristos.xmindengineering.org/og-image.jpg',
  url = 'https://drchristos.xmindengineering.org',
  type = 'website',
  author = 'Dr. Christos Etoka O. Etoka',
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
  nofollow = false,
  canonical,
  alternateLanguages,
  structuredData
}: SEOProps) => {
  const fullTitle = title.includes('Dr. Christos Etoka') ? title : `${title} | Dr. Christos Etoka`;
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  // Default structured data for the organization
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: 'Xrislid Institute',
        url: url,
        logo: {
          '@type': 'ImageObject',
          url: `${url}/logo.png`,
          width: 512,
          height: 512
        },
        founder: {
          '@type': 'Person',
          name: 'Dr. Christos Etoka O. Etoka',
          jobTitle: 'Executive Vice Chancellor',
          description: 'World-renowned leader in Mind Engineering and Transformational Leadership'
        },
        sameAs: [
           'https://www.linkedin.com/in/dr-christos-etoka-o-etoka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
          'https://x.com/iamdrchristos?t=ICogyJvieXxS5y9IvSQ2qw&s=09',
          'https://www.facebook.com/share/1A7n5UZPRe/',
          'https://www.instagram.com/therealdretoka?igsh=d3ZiMmR1eWpkbXJh',
          'https://www.tiktok.com/@therealdretoka?_r=1&_t=ZS-91IBjr6XKgJ',
          'https://www.youtube.com/@therealdretoka'
        ]
      },
      {
        '@type': 'Person',
        '@id': `${url}/#person`,
        name: 'Dr. Christos Etoka O. Etoka',
        jobTitle: 'Executive Vice Chancellor',
        worksFor: {
          '@id': `${url}/#organization`
        },
        description: description,
        image: image,
        url: url,
        sameAs: [
          'https://www.linkedin.com/in/dr-christos-etoka-o-etoka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
          'https://x.com/iamdrchristos?t=ICogyJvieXxS5y9IvSQ2qw&s=09',
          'https://www.facebook.com/share/1A7n5UZPRe/',
          'https://www.instagram.com/therealdretoka?igsh=d3ZiMmR1eWpkbXJh',
          'https://www.tiktok.com/@therealdretoka?_r=1&_t=ZS-91IBjr6XKgJ',
          'https://www.youtube.com/@therealdretoka'
        ],
        knowsAbout: [
          'Mind Engineering',
          'Leadership Development',
          'Executive Coaching',
          'Transformational Education',
          'Human Capacity Building'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url: url,
        name: fullTitle,
        description: description,
        publisher: {
          '@id': `${url}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical || url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Dr. Christos Etoka`} />
      <meta property="og:site_name" content="Dr. Christos Etoka" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - Dr. Christos Etoka`} />
      <meta name="twitter:creator" content="@christosetoka" />
      <meta name="twitter:site" content="@christosetoka" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      <meta name="application-name" content="Dr. Christos Etoka" />
      <meta name="apple-mobile-web-app-title" content="Dr. Christos Etoka" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Alternate Languages */}
      {alternateLanguages && alternateLanguages.map(({ lang, url: altUrl }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={altUrl} />
      ))}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.youtube.com/@therealdretoka" />
      <link rel="preconnect" href="https://www.youtube.com/@therealdretoka" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com/@therealdretoka" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
    </Helmet>
  );
};

export default SEOHead;
