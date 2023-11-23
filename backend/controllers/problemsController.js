import Problem from "../models/Problem.js";
import asyncHandler from 'express-async-handler';

const GetProblems = asyncHandler(async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).send(problems);
    } catch (error) {
        res.status(500).send({ message: "Could not fetch problems.", error: error.message });
    }
})

const GetProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    try {
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).send({ message: "Problem not found" });
        }

        res.status(200).send({ message: "Problem fetched successfully", problem });
    } catch (error) {
        res.status(500).send({ message: "Error fetching problem", error: error.message });
    }
})

const PostProblem = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        difficulty,
        tags,
        hint
    } = req.body;

    const problem = await Problem.create({ title, description, difficulty, tags, hint });
    res.status(201).send({ problemId: problem._id });
})

const PutProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;
    const {
        title,
        description,
        difficulty,
        tags,
        hint
    } = req.body;

    try {
        const updatedProblem = await Problem.findByIdAndUpdate(problemId, {
            title,
            description,
            difficulty,
            tags,
            hint
        }, { new: true });

        if (!updatedProblem) {
            return res.status(404).send({ message: "Problem not found" });
        }

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

const DeleteProblem = asyncHandler(async (req, res) => {
    const { problemId } = req.params;

    try {
        const deletedProblem = await Problem.findByIdAndDelete(problemId);

        if (!deletedProblem) {
            return res.status(404).send({ message: "Problem not found" });
        }

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default { GetProblem, GetProblems, PostProblem, PutProblem, DeleteProblem }