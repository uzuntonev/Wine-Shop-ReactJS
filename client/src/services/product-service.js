import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/products';

const productService = {
  getAllProducts: function (data) {
    return axios
      .get(baseUrl, {
        withCredentials: true,
      })
      .catch(console.error);
  },
  getProductById: function (id) {
    return axios
      .get(`${baseUrl}/${id}`, {
        withCredentials: true,
      })
      .catch(console.error);
  },
  createProduct: function (data) {
    return axios
      .post(baseUrl, data, {
        withCredentials: true,
      })
      .catch(console.error);
  },
  getUserProducts: function () {
    return axios
      .get(`${baseUrl}/my-products`, {
        withCredentials: true,
      })
      .catch(console.error);
  },
};

export default productService;
