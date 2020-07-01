const { ProductModel, UserModel } = require('../models');

module.exports = {
  getProducts: (req, res, next) => {
    const { id } = req.params;
    ProductModel.find(id ? { _id: id } : {})
      .then((products) => {
        res.json(products);
      })
      .catch(next);
  },

  postProduct: (req, res, next) => {
    const newProduct = req.body;
    const { _id: userId } = req.user;
  
    ProductModel.create({ ...newProduct, creatorId: userId })
      .then((product) => {
        Promise.all([
          UserModel.updateOne(
            { _id: userId },
            { $push: { products: product._id } }
          ),
          product,
        ]);
      })
      .then(() => {
        res.status(201).send({ msg: 'Successful create product' });
      })
      .catch(next);
  },
  putProduct: (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    ProductModel.updateOne({ _id: id }, { ...updatedProduct })
      .then((data) => {
        res.send({ msg: 'Successful updated product', data });
      })
      .catch(next);
  },
  delProduct: (req, res, next) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    ProductModel.deleteOne({ _id: id })
      .then(() => {
        return UserModel.updateOne(
          { _id: userId },
          { $pull: { products: id } }
        ); // Check!!!
      })
      .then(() => {
        res
          .status(200)
          .send({ msg: `Successful updated product with id: ${id}` });
      })
      .catch(next);
  },
};
