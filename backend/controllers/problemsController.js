import Problem from "../models/Problem.js";
import asyncHandler from 'express-async-handler';

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'admin-service',
    brokers: ['localhost:29092'],
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
  console.log("💬 Established connection with Kafka.");
};

run().catch(console.error);

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

        res.status(200).json(problem);
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

    const message = { key: 'problem_created', value: JSON.stringify(problem) };
    await producer.send({
        topic: 'PROBLEM_CREATION',
        messages: [message],
    });

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
        const data = { title, description, difficulty, tags, hint };

        const updatedProblem = await Problem.findByIdAndUpdate(problemId, data, { new: true });

        if (!updatedProblem) {
            return res.status(404).send({ message: "Problem not found" });
        }

        const message = { key: 'problem_updated', value: JSON.stringify({ id: updatedProblem.problemId, data: data }) };
        await producer.send({
            topic: 'PROBLEM_UPDATION',
            messages: [message],
        });

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

        const message = { key: 'problem_deleted', value: JSON.stringify({ id: deletedProblem.problemId }) };
        await producer.send({
            topic: 'PROBLEM_DELETION',
            messages: [message],
        });

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default { GetProblem, GetProblems, PostProblem, PutProblem, DeleteProblem }