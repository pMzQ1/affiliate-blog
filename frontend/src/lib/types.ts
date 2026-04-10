export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Post {
  id: number;
  documentId: string;
  slug: string;
  title_nl: string;
  content_html: string | null;
  excerpt_nl: string | null;
  keyword_primary: string | null;
  post_type: 'top10_gifts' | 'tech_gadgets' | 'kids_family' | 'review';
  featured_image: StrapiImage | null;
  seo_title: string | null;
  seo_description: string | null;
  publishedAt: string | null;
  createdAt: string;
  post_products?: PostProduct[];
}

export interface Affiliate {
  id: number;
  documentId: string;
  network: 'bol' | 'amazon_nl' | 'awin';
  partner_id: string | null;
  link_template: string | null;
  active: boolean;
}

export interface PostProduct {
  id: number;
  documentId: string;
  product_name: string;
  product_description: string | null;
  affiliate_url: string;
  image_url: string | null;
  price: number | null;
  position: number | null;
  affiliate?: Affiliate;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
