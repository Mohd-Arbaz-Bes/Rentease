import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:  String,
    category: String,
    pricePerMonth: Number,
    deposit: Number,
    tenureOptions: [Number],
    stock: Number,
    description: String,
    image: String
}, { timestamps: true });

export default mongoose.model('Product', productSchema);