import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPost, getPostSlugs } from '@/lib/strapi';
import CategoryBadge from '@/components/CategoryBadge';
import AffiliateDisclaimer from '@/components/AffiliateDisclaimer';
import { PostProduct } from '@/lib/types';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

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

function formatPrice(price: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price);
}

export async function generateStaticParams() {
  try {
    const slugs = await getPostSlugs();
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await getPost(slug);
    if (!res) return {};
    const post = res.data;

    return {
      title: post.seo_title ?? post.title_nl,
      description: post.seo_description ?? post.excerpt_nl ?? undefined,
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post;
  try {
    const res = await getPost(slug);
    if (!res) notFound();
    post = res!.data;
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const publishedDate = post.publishedAt ?? post.createdAt;
  const imageUrl = post.featured_image ? resolveImageUrl(post.featured_image.url) : null;
  const hasProducts = post.post_products && post.post_products.length > 0;

  const sortedProducts: PostProduct[] = hasProducts
    ? [...post.post_products!].sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
    : [];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Featured image */}
      {imageUrl && (
        <div className="relative w-full mb-8 rounded-2xl overflow-hidden bg-gray-100" style={{ maxHeight: '500px', height: '400px' }}>
          <Image
            src={imageUrl}
            alt={post.featured_image?.alternativeText ?? post.title_nl}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge postType={post.post_type} />
          <time dateTime={publishedDate} className="text-gray-400 text-sm">
            {formatDate(publishedDate)}
          </time>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {post.title_nl}
        </h1>
        {post.excerpt_nl && (
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">{post.excerpt_nl}</p>
        )}
      </header>

      {/* Affiliate disclaimer */}
      <AffiliateDisclaimer />

      {/* Post content */}
      {post.content_html && (
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      )}

      {/* Product cards */}
      {sortedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aanbevolen producten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-3 border border-gray-100"
              >
                {product.position != null && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#6C63FF]">
                    #{product.position}
                  </span>
                )}
                {product.image_url && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={product.image_url}
                      alt={product.product_name}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                )}
                <h3 className="font-bold text-gray-900 text-base leading-snug">
                  {product.product_name}
                </h3>
                {product.product_description && (
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {product.product_description}
                  </p>
                )}
                {product.price != null && (
                  <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
                )}
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-auto inline-block text-center px-5 py-2.5 rounded-full bg-[#6C63FF] text-white text-sm font-semibold hover:bg-[#5a52d5] transition-colors"
                >
                  Bekijk op Bol.com
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
