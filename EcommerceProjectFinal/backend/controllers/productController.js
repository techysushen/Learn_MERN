import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


///api/products

const getProducts=asyncHandler(async (req,res) => {
  const keyword = req.query.keyword ? { name : { $regex:req.query.keyword,$options:'i'} }:{}
  const pageSize =3;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({...keyword})
  const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
  res.json({products,page,pages:Math.ceil(count/pageSize)})
})

///api/products
const getProductById=asyncHandler(async (req,res) => {
    const product=await Product.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404);
        throw new Error("Product Not Found");
        //res.json({message:"Product Not Found"})
    }
    
})

///api/products/:id
const deleteProduct=asyncHandler(async (req,res) => {
    const product=await Product.findById(req.params.id);
    if(product){
        await product.deleteOne();
        res.json({message:'Product Removed'})
    }else{
        res.status(404);
        throw new Error("Product Not Found");
        //res.json({message:"Product Not Found"})
    }
    
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: 'Sample Name',
      price: 0,
      user: req.user._id,
      image: '/image/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample Description'
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })

  // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {

    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    } = req.body;
  
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name
      product.price = price
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
      product.description = description
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export {getProductById, getProducts, deleteProduct, createProduct, updateProduct};