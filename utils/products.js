const protocol = 'https://'
const host = 'line-interview-api.herokuapp.com';

const apiUrl = `${protocol}${host}`

function getProductImageUrl(product) {
  return `${apiUrl}/img/${product._id}.${product.prd_image_ext}`
}

function getProductWithImage(product) {
  return {
    ...product,
    prd_image: `${apiUrl}/img/${product._id}.${product.prd_image_ext}`,
  };
}

exports.getProductImageUrl = getProductImageUrl;
exports.getProductWithImage = getProductWithImage;
