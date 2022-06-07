
const Product1 = require("../models/product.model");

// Filtering and Sorting Resuable Functionality

class apiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    
    filtering(){

        console.log("filteringData :", this);

        if(this.queryString.category === "") {
            return this;
        }
        let queryObj = {...this.queryString};
        console.log('queryObj:', queryObj)
        const excludedFields = ["page","sort","limit"];
        excludedFields.forEach((element) => delete queryObj[element]); // Delete from queryString or queryOjb
        console.log('excludedFields:', excludedFields)
        console.log('queryObj:', queryObj)
        let queryStr = JSON.stringify(queryObj);
        console.log('queryStr:', queryStr)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
        console.log('queryStr:', queryStr)
        this.query.find(JSON.parse(queryStr));
        // console.log('this:', this)
        return this;
    };
    
    sorting(){
        if(this.queryString.sort) {
            console.log('this.queryString.sort:', this.queryString.sort)
            
            const sortBy = this.queryString.sort.split(",").join(" ");
            console.log('sortBy:', sortBy)
            
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    };
    pagination(){
        console.log('this.queryString:', this.queryString)
        const page = this.queryString.page * 1 || 1;
        console.log('page:', page);


        const limit = this.queryString.limit * 1 || 5;
        console.log('limit:', limit)
        const skip = (page-1) * limit;
        console.log('skip:', skip)
        this.query = this.query.skip(skip).limit(limit);
        // console.log('this:', this)
        return this;
    };
}

const getAllProduct = async (req,res,next) => {
    try {

        // const features = new apiFeatures(Product1.find(), req.query).filtering().sorting().pagination();
        // const features = new apiFeatures(Product1.find(), req.query).pagination().filtering().sorting();
        // console.log('features:', features)

        // const products = await features.query; 
        // console.log('products:', products)

        console.log("req.query :", req.query);
        const page = req.query.page * 1 || 1;
        console.log('page:', page)
        const limit = 5;
        const skip = (page-1) * limit;
        console.log('skip:', skip)

        const products = await Product1
        .find(req.query.category !== "" ? {category : req.query.category} : {})
        .sort(req.query.sort !== "" ? {price : `${req.query.sort === "price" ? Number(1) : Number(-1)}`} : {})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
        console.log('products:', products)

        // if(req.query.category === "") {

        // }

        // else {
        //     console.log('req.query.category:', req.query.category)

        //     products = await products.find({category : req.query.category}).lean().exec();
            
        //     console.log('products:', products)
        // }


        return res.status(200).json({
            products : products,
        })
    }
    catch(error) {

        return res.status(500).json({
            message : error.message
        })

    }
}


const addProduct = async (req,res,next) => {
    try {
        const product = await Product1.create(req.body);

        return res.status(201).json({
            product : product
        })
    }
    catch(error) {

        return res.status(500).json({
            message : error.message
        })

    }
}



module.exports = {
    getAllProduct,
    addProduct
}