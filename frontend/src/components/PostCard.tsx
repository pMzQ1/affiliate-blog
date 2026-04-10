import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: Post;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function resolveImageUrl(url: string): string {
  if (url.startsWith('/')) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL ?? ''}${url}`;
  }
  return url;
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.publishedAt ?? post.createdAt;
  const imageUrl = post.featured_image ? resolveImageUrl(post.featured_image.url) : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full aspect-video rounded-t-xl overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.featured_image?.alternativeText ?? post.title_nl}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <CategoryBadge postType={post.post_type} />

        <h2 className="text-gray-900 text-lg font-bold mt-2 line-clamp-2 leading-snug">
          {post.title_nl}
        </h2>

        {post.excerpt_nl && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-3 leading-relaxed">
            {post.excerpt_nl}
          </p>
        )}

        <time
          dateTime={publishedDate}
          className="text-gray-400 text-xs mt-auto pt-4"
        >
          {formatDate(publishedDate)}
        </time>
      </div>
    </Link>
  );
}
