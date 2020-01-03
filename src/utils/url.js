export default {
  getProductList: (path, rowIndex, pageSize) => 
  `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`,
  getProductDetail: id => `/mock/product_detail/${id}.json`,
  getShopDetail: id => `/mock/shops/${id}.json`
};
