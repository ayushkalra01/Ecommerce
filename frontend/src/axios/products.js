import axios from "axios";
export const getSortedProducts = async (sort, order, page) =>
  await axios.post(`/api/product/all`, {
    sort,
    order,
    page,
  });

export const getProductByCategories = async (slug, pageNumber) =>
  await axios.get(`/api/product/category/${slug}?pageNumber=${pageNumber}`);

export const getProductBySubCategories = async (slug, pageNumber) =>
  await axios.get(`/api/product/subcategory/${slug}?pageNumber=${pageNumber}`);

export const getProductByBrands = async (slug, pageNumber) =>
  await axios.get(`/api/product/brand/${slug}?pageNumber=${pageNumber}`);
