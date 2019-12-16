const protocol = 'http://'
const host = 'localhost';
const port = 4000;

const apiUrl = `${protocol}${host}:${port}`

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
