import Link from 'next/link';
import { getPosts } from '@/lib/strapi';
import PostGrid from '@/components/PostGrid';
import { Post } from '@/lib/types';

const PAGE_SIZE = 9;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata = {
  title: 'Alle artikelen — AffiliateBlog',
  description: 'Bekijk alle productreviews, top-10 lijsten en tech-artikelen op AffiliateBlog.',
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10));

  let posts: Post[] = [];
  let totalPages = 1;

  try {
    const response = await getPosts({ page: currentPage, pageSize: PAGE_SIZE });
    posts = response.data ?? [];
    totalPages = response.meta?.pagination?.pageCount ?? 1;
  } catch {
    posts = [];
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">Alle artikelen</h1>
        <p className="mt-3 text-gray-500 text-lg">
          Reviews, tips en top-10 lijsten voor slimme kopers.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 text-lg py-16">
          Binnenkort verschijnen hier de eerste artikelen.
        </p>
      ) : (
        <>
          <PostGrid posts={posts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Paginering">
              {currentPage > 1 && (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Vorige
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/blog?page=${pageNum}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pageNum === currentPage
                      ? 'bg-[#6C63FF] text-white'
                      : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </Link>
              ))}

              {currentPage < totalPages && (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Volgende →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
