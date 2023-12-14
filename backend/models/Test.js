import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },
    problemId: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    preloadedCode: {
        type: String
    },
    functionName: {
        type: String,
    },
    testCases: [{
        _id: false,
        label: String,
        params: [String],
        expect: String
    }],
    isPublished: {
        // Keeps track of whether the appropriate service (Test Service) has acknowledged this test.
        type: Boolean,
        default: false
    }
    }, {
        timestamps: true
    }
);

const testModel = mongoose.model('Test', testSchema);

export default testModel;