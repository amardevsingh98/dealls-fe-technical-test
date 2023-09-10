import { ProductState } from "@/types/product";

export type FetchParamsServer = {
  category?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
}

export type FetchParams = FetchParamsServer & {
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  brand?: string | undefined;
}

export const getProduct = async ( params?: FetchParamsServer): Promise<ProductState | null> => {
  let baseURL = 'https://dummyjson.com/products';
  let url : URL = new URL(baseURL);

  try {
    if (params) {
      const { category, search, page } = params;

      if (category && search) {
        throw new Error('Cannot search by category and search at the same time');
      }
  
      if (category || search) {
        url = new URL(baseURL + (category ? `/category/${category}` : `/search?q=${search}`));
      }
  
      url.searchParams.append('limit', '10');
      if (page) {
        const _page = isNaN(parseInt(page.toString())) ? 0 : parseInt(page.toString());
        if (_page > 0) {
          url.searchParams.append('skip', `${(_page - 1) * 10}`);
        }
      }
    }
  
    const res = await fetch(url.toString())
  
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
  
    const resJSON = await res.json();
    return resJSON;
  }
  catch (err) {
    return null
  }
}

export const getAllProductCategories = async (): Promise<string[] | null> => {
  const baseURL = 'https://dummyjson.com/products/categories';
  try {
    const res = await fetch(baseURL)
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
    const resJSON = await res.json();
    return resJSON;
  }
  catch (err) {
    return null
  }
}

export function getUpdatedFetchParams(params: { [key: string]: string | string[] | undefined }) {
  function getValue(value: string | string[] | undefined) {
    if (Array.isArray(value)) {
      return value[0]
    }
    return value
  }

  const updatedParams: FetchParams = {
    brand: getValue(params.brand) || '',
    search: getValue(params.q) || '',
    category: getValue(params.category) || undefined,
    page: isNaN(parseInt(getValue(params.page) || '')) ? 0 : parseInt(getValue(params.page) ||'0'),
    minPrice: isNaN(parseInt(getValue(params.minPrice) || '')) ? 0 : parseInt(getValue(params.minPrice) || ''),
    maxPrice: isNaN(parseInt(getValue(params.maxPrice) || '')) ? 0 : parseInt(getValue(params.maxPrice) || ''),
  }
  return updatedParams
}
