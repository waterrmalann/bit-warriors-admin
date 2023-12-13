import Problem from "../models/Problem.js";
import asyncHandler from 'express-async-handler';

import { Kafka } from 'kafkajs';
import slugify from "slugify";

const kafka = new Kafka({
    clientId: 'admin-service',
    brokers: ['localhost:29092'],
});

// const admin = kafka.admin();

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "problem-ack-consumption" })

const run = async () => {
    // await admin.connect();
    // await admin.createTopics({
    //     waitForLeaders: true,
    //     topics: [
    //         { topic: 'PROBLEM_CREATION' },
    //         { topic: 'PROBLEM_UPDATION' },
    //         { topic: 'PROBLEM_DELETION' },
    //     ],
    // })
    await producer.connect();
    await consumer.connect();
    console.log("💬 Established connection with Kafka.");

    await consumer.subscribe({ topics: ['PROBLEM_ACK'] });
    console.log("\t - Subscribed to PROBLEM_ACK");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString());
            switch (topic) {
                case "PROBLEM_ACK": {
                    console.log("[PROBLEM_ACK] A problem CRUD was acknowledged for " + data.topic);
                    if (data.topic === 'PROBLEM_CREATION') {
                        await Problem.findOneAndUpdate({ problemId: data.problemId }, { isPublished: true })
                    }
                    break;
                }
            }
        },
    });
};

run().catch(console.error);



const GetProblems = asyncHandler(async (req, res) => {
    try {
        let problems;
        const { id } = req.query;
        if (id) {
            problems = await Problem.find({
                $or: [
                    { problemId: id }, // Find exact match
                    { problemId: { $regex: new RegExp(`^${id}`, 'i') } }
                ]
            }).sort({ modifiedAt: -1 });
        } else {
            problems = await Problem.find().sort({ modifiedAt: -1 });
        }
        // console.log(problems);
        // const problems = await Problem.find().sort({ modifiedAt: -1 });
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

    const slug = slugify(title);

    const problem = await Problem.create({ title, description, slug, difficulty, tags, hint });

    const message = { key: 'problem_created', value: JSON.stringify(problem) };
    try {
        await producer.send({
            topic: 'PROBLEM_CREATION',
            messages: [message],
        });
        console.log(`[kafka] creation message was sent ${JSON.stringify(message)}`)
    } catch (err) {
        console.error(`err: [kafka/problem_updated] ${err}`);
    }

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

    let slug = slugify(title);

    try {
        const data = { title, slug, description, difficulty, tags, hint };

        const updatedProblem = await Problem.findByIdAndUpdate(problemId, data, { new: true });

        if (!updatedProblem) {
            return res.status(404).send({ message: "Problem not found" });
        }

        const message = { key: 'problem_updated', value: JSON.stringify({ id: updatedProblem.problemId, data: data }) };

        try {
            await producer.send({
                topic: 'PROBLEM_UPDATION',
                messages: [message],
            });
            console.log(`[kafka] updation message was sent ${JSON.stringify(message)}`)
        } catch (err) {
            console.error(`err: [kafka/problem_updated] ${err}`);
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

        const message = { key: 'problem_deleted', value: JSON.stringify({ id: deletedProblem.problemId }) };
        try {
            await producer.send({
                topic: 'PROBLEM_DELETION',
                messages: [message],
            });
            console.log(`[kafka] deletion message was sent ${JSON.stringify(message)}`)
        } catch (err) {
            console.error(`err: [kafka/problem_updated] ${err}`);
        }

        res.status(200).send({ success: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default { GetProblem, GetProblems, PostProblem, PutProblem, DeleteProblem }