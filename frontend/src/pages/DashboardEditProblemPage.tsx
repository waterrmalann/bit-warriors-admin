import { ClockIcon } from "lucide-react";
import Markdown from 'react-markdown';

import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import { useToast } from "@components/ui/use-toast"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import useProblemById from "@hooks/useProblemById"

export default function DashboardEditProblemPage() {
    const firstFetch = useRef(true);
    const { toast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const { problem, mutate, editProblem, deleteProblem, error: problemError } = useProblemById(id || '');

    const [questionDescription, setQuestionDescription] = useState(() => problem?.description ?? '');
    const [questionTitle, setQuestionTitle] = useState(problem?.title ?? '');
    const [questionDifficulty, setQuestionDifficulty] = useState(problem?.difficulty ?? '');
    const [questionTags, setQuestionTags] = useState(problem?.tags.join(',') ?? '');
    const [questionHint, setQuestionHint] = useState(problem?.hint ?? '');

    useEffect(() => {
        if (problem && firstFetch.current) {
            setQuestionDescription(problem?.description);
            setQuestionTitle(problem?.title);
            setQuestionDifficulty(problem?.difficulty);
            setQuestionTags(problem?.tags.join(','));
            setQuestionHint(problem?.hint ?? '');
            firstFetch.current = false;
        }
    }, [problem])

    if (problemError) {
        return (
            <Navigate to="/not-found" replace={true} />
        )
    }

    async function handleDeletion() {
        const { error } = await deleteProblem();

        if (error) {
            return toast({
                variant: "destructive",
                title: "An error occured.",
                description: error.message
            });
        } else {
            toast({
                title: "Success",
                description: "Problem was deleted."
            });
            navigate('/dash/problems', { replace: true });
            mutate();
        }

    }

    async function handleSubmission() {
        if (questionTitle.length < 1) {
            return toast({
                variant: "destructive",
                title: "Invalid Data",
                description: "Enter a valid question title."
            })
        }
        if (!['easy', 'medium', 'hard'].includes(questionDifficulty.toLowerCase())) {
            return toast({
                variant: "destructive",
                title: "Invalid Data",
                description: "Question difficulty must be 'Easy', 'Medium', or 'Hard'"
            })
        }
        if (questionTags.split(',').length < 1) {
            return toast({
                variant: "destructive",
                title: "Invalid Data",
                description: "There must be atleast one question tag."
            })
        }

        const { error } = await editProblem({
            title: questionTitle,
            description: questionDescription,
            difficulty: questionDifficulty,
            tags: questionTags.split(','),
            hint: questionHint
        });

        if (error) {
            console.error(error);
            return toast({
                variant: "destructive",
                title: "An error occured.",
                description: error.message
            });
        } else {
            toast({
                title: "Success",
                description: "Problem was edited."
            });
            mutate();
        }
    }

    return (
        <>
            <div className="hidden h-full flex-col md:flex">
                <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <h2 className="text-lg font-semibold">Edit a problem.</h2>
                </div>
                <Separator />
                <Tabs defaultValue="insert" className="flex-1">
                    <div className="container h-full py-6">
                        <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                            <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                <div className="grid gap-2">
                                    <HoverCard openDelay={200}>
                                        <HoverCardTrigger asChild>
                                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Sections
                                            </span>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-[320px] text-sm" side="left">
                                            Go over each section and fill out the forms to create a new coding challenge.
                                        </HoverCardContent>
                                    </HoverCard>
                                    <TabsList className="grid grid-cols-3">
                                        <TabsTrigger value="insert">
                                            <span className="sr-only">Description</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className="h-5 w-5"
                                            >
                                                <rect
                                                    x="4"
                                                    y="3"
                                                    width="12"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="7"
                                                    width="12"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="11"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="15"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="8.5"
                                                    y="11"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="8.5"
                                                    y="15"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="13"
                                                    y="11"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                            </svg>
                                        </TabsTrigger>
                                        <TabsTrigger value="complete">
                                            <span className="sr-only">Information</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                                                    fill="currentColor"
                                                ></path>
                                                <rect
                                                    x="4"
                                                    y="15"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="8.5"
                                                    y="15"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="13"
                                                    y="15"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                            </svg>
                                        </TabsTrigger>
                                        <TabsTrigger value="edit">
                                            <span className="sr-only">Tests</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className="h-5 w-5"
                                            >
                                                <rect
                                                    x="4"
                                                    y="3"
                                                    width="12"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="7"
                                                    width="12"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="11"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="4"
                                                    y="15"
                                                    width="4"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <rect
                                                    x="8.5"
                                                    y="11"
                                                    width="3"
                                                    height="2"
                                                    rx="1"
                                                    fill="currentColor"
                                                ></rect>
                                                <path
                                                    d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                {/* components */}
                                <Button onClick={handleDeletion}>Delete</Button>
                            </div>
                            <div className="md:order-1">
                                <TabsContent value="complete" className="mt-0 border-0 p-0">
                                    <div className="flex h-full flex-col space-y-4">
                                        <Markdown className="prose min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]">
                                            {questionDescription || '*Enter question description to see markdown preview.*'}
                                        </Markdown>
                                        {/* <Textarea
                      placeholder="Write a description of the problem here in markdown."
                      className="font-mono min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    /> */}
                                        <div className="flex items-center space-x-2">
                                            <Button>Update</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Show history</span>
                                                <ClockIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="insert" className="mt-0 border-0 p-0">
                                    <div className="flex flex-col space-y-4">
                                        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">

                                            <Textarea
                                                id="question"
                                                placeholder="Enter question description (in Markdown)."
                                                className="font-mono h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                                                value={questionDescription}
                                                onChange={e => setQuestionDescription(e.target.value)}
                                            />
                                            <div className="rounded-md border bg-muted p-5">
                                                <Label htmlFor="titleInput">Title</Label>
                                                <Input
                                                    className="my-2" id="titleInput"
                                                    placeholder="Title of the problem"
                                                    value={questionTitle} onChange={e => setQuestionTitle(e.target.value)}
                                                />
                                                <Label htmlFor="difficultyInput">Difficulty</Label>
                                                <Select value={questionDifficulty} onValueChange={val => setQuestionDifficulty(val)}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Choose Difficulty" />
                                                    </SelectTrigger>
                                                    <SelectContent id="difficultyInput">
                                                        <SelectItem value="Easy">Easy</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="Hard">Hard</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Label htmlFor="tagInput">Tags</Label>
                                                <Input
                                                    className="my-2" id="tagInput"
                                                    placeholder="array, dsa"
                                                    value={questionTags} onChange={e => setQuestionTags(e.target.value)}
                                                />
                                                <Label htmlFor="hintInput">Hint</Label>
                                                <Input
                                                    className="my-2" id="hintInput"
                                                    placeholder="eg: try using dijikstra's algorithm"
                                                    value={questionHint} onChange={e => setQuestionHint(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button onClick={handleSubmission}>Submit</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Show history</span>
                                                <ClockIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="edit" className="mt-0 border-0 p-0">
                                    <div className="flex flex-col space-y-4">
                                        <div className="grid h-full gap-6 lg:grid-cols-2">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex flex-1 flex-col space-y-2">
                                                    <Label htmlFor="input">Preloaded Code</Label>
                                                    <Textarea
                                                        id="input"
                                                        placeholder="preloaded code"
                                                        className="flex-1 lg:min-h-[580px]"
                                                    />
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <Label htmlFor="instructions">Instructions</Label>
                                                    <Textarea
                                                        id="instructions"
                                                        placeholder="Solve it in O(n) time complexity."
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button>Submit</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Show history</span>
                                                <ClockIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </>
    )
}