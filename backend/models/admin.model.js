import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },       
},{timestamps: true});

const admin = mongoose.model.admin || mongoose.model('admin', adminSchema);

export default admin;