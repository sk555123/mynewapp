const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema =  new Schema({
    product_name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps:true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports=Blog;

