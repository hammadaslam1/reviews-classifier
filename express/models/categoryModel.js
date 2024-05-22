import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_title: Array,
  all_products_href: Array,
  product_rating_points: Array,
  product_ratings: Array,
  product_price: Array,
  product_images_src: Array,
  product_description: Array,
  reviews: Array,
  category: Array,
  subcategory: Array,
});

const getProductModel = (collectionName) => {
  return mongoose.model(collectionName, productSchema);
};

export default getProductModel;
