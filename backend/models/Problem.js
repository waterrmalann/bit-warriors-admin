import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

const problemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
        default: () => nanoid()
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    constraints: {
        type: [String],
        required: true,
        default: []
    },
    examples: {
        type: [String],
        required: true,
        default: []
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    hint: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;