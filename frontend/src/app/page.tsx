import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/strapi';
import PostGrid from '@/components/PostGrid';
import CategoryBadge from '@/components/CategoryBadge';
import { Post } from '@/lib/types';

function resolveImageUrl(url: string): string {
  if (url.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${url}`;
  }
  return url;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function FeaturedPost({ post }: { post: Post }) {
  const imageUrl = post.featured_image ? resolveImageUrl(post.featured_image.url) : null;
  const publishedDate = post.publishedAt ?? post.createdAt;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-72 bg-gray-100 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.featured_image?.alternativeText ?? post.title_nl}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 gap-3">
        <CategoryBadge postType={post.post_type} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug group-hover:text-[#6C63FF] transition-colors">
          {post.title_nl}
        </h2>
        {post.excerpt_nl && (
          <p className="text-gray-500 leading-relaxed line-clamp-3">{post.excerpt_nl}</p>
        )}
        <time dateTime={publishedDate} className="text-gray-400 text-sm mt-2">
          {formatDate(publishedDate)}
        </time>
        <span className="inline-block mt-2 text-sm font-semibold text-[#6C63FF] group-hover:underline">
          Lees meer →
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    const response = await getPosts();
    posts = response.data ?? [];
  } catch {
    // Strapi may not be running in dev; render empty state gracefully
    posts = [];
  }

  const [featuredPost, ...remainingPosts] = posts;

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#6C63FF] mb-4">
            Jouw gids voor slimme aankopen
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            De beste producttips{' '}
            <span className="text-[#6C63FF]">voor jouw budget</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Eerlijke reviews, handige top-10 lijsten en de nieuwste tech — zodat jij altijd de
            beste keuze maakt zonder uren te hoeven zoeken.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 rounded-full bg-[#6C63FF] text-white font-semibold hover:bg-[#5a52d5] transition-colors"
            >
              Bekijk alle artikelen
            </Link>
            <Link
              href="/over-mij"
              className="inline-block px-8 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Over mij
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400 text-lg py-16">
            Binnenkort verschijnen hier de eerste artikelen.
          </p>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Uitgelicht artikel</h2>
                <FeaturedPost post={featuredPost} />
              </section>
            )}

            {/* Recent posts grid */}
            {remainingPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recente posts</h2>
                <PostGrid posts={remainingPosts} />
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}
