import type {
  Post,
  StrapiListResponse,
  StrapiSingleResponse,
} from './types';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/** Prepend the Strapi base URL to media paths that start with `/`. */
export function getStrapiImageUrl(url: string): string {
  if (url.startsWith('/')) {
    return `${STRAPI_URL}${url}`;
  }
  return url;
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  return headers;
}

async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    headers: buildHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Strapi fetch failed: ${res.status} ${res.statusText} — ${url.toString()}`,
    );
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  postType?: string;
}

/**
 * Fetch a paginated list of published posts.
 * Populates the featured_image relation and sorts newest-first.
 */
export async function getPosts(
  params: GetPostsParams = {},
): Promise<StrapiListResponse<Post>> {
  const { page = 1, pageSize = 10, postType } = params;

  const query: Record<string, string> = {
    'populate[featured_image]': 'true',
    'sort[0]': 'publishedAt:desc',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  };

  if (postType) {
    query['filters[post_type][$eq]'] = postType;
  }

  return fetchStrapi<StrapiListResponse<Post>>('/posts', query);
}

/**
 * Fetch a single post by its slug.
 * Populates featured_image, post_products, and post_products.affiliate.
 */
export async function getPost(
  slug: string,
): Promise<StrapiSingleResponse<Post> | null> {
  const query: Record<string, string> = {
    'filters[slug][$eq]': slug,
    'populate[featured_image]': 'true',
    'populate[post_products][populate][affiliate]': 'true',
  };

  const res = await fetchStrapi<StrapiListResponse<Post>>('/posts', query);

  if (!res.data || res.data.length === 0) {
    return null;
  }

  return { data: res.data[0], meta: {} };
}

/**
 * Return all published post slugs — used by generateStaticParams.
 */
export async function getPostSlugs(): Promise<string[]> {
  const query: Record<string, string> = {
    'fields[0]': 'slug',
    'pagination[pageSize]': '1000',
    'sort[0]': 'publishedAt:desc',
  };

  const res = await fetchStrapi<StrapiListResponse<Post>>('/posts', query);

  return res.data.map((post) => post.slug);
}
