import { ClockIcon } from "lucide-react"
import Markdown from 'react-markdown'

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
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@components/ui/use-toast"
import useProblem from "@hooks/useProblem"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API_ROUTES } from "@/lib/routes"


export default function DashboardNewProblemPage() {

  const { toast } = useToast();
  const { createProblem } = useProblem('');
  const navigate = useNavigate();

  const [questionDescription, setQuestionDescription] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [questionHint, setQuestionHint] = useState('');

  const [testCases, setTestCases] = useState('');
  const [functionName, setFunctionName] = useState('');
  const [language, setLanguage] = useState('');
  const [preloadedCode, setPreloadedCode] = useState('');


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

    if (testCases.length < 1) {
      return toast({
        variant: "destructive",
        title: "Missing Test Cases",
        description: "There must be atleast one test case defined."
      })
    }

    if (functionName.length < 1) {
      return toast({
        variant: "destructive",
        title: "Missing Test Function Name",
        description: "There must be a function name defined to call."
      })
    }

    if (language.length < 1) {
      return toast({
        variant: "destructive",
        title: "Missing Test Language",
        description: "There must be a language defined for test case."
      })
    }

    const { data, error } = await createProblem({
      title: questionTitle,
      description: questionDescription,
      difficulty: questionDifficulty,
      tags: questionTags,
      hint: questionHint
    });

    if (error) {
      return toast({
        variant: "destructive",
        title: "An error occured.",
        description: error.message
      })
    }

    try {
      const res = await axios.post(API_ROUTES.TESTS.POST(data._id), {
        preloadedCode,
        testCases,
        functionName,
        language
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }

    toast({
      title: "Success",
      description: "Problem was added."
    });

    navigate('/dash/problems');
  }

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Add a new problem.</h2>
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
                <Button disabled={true}>Delete</Button>
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
                      <Button>Submit</Button>
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
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="functionName">Function Name</Label>
                          <Input
                            id="functionName"
                            placeholder="eg: add"
                            value={functionName}
                            onChange={e => setFunctionName(e.target.value)}
                          />
                          <Label htmlFor="language">Language</Label>
                          <Input
                            id="language"
                            placeholder="eg: js"
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="preloaded">Preloaded Code</Label>
                          <Textarea
                            id="preloaded"
                            placeholder="// any preloaded code"
                            className="flex-1 lg:min-h-[580px]"
                            value={preloadedCode}
                            onChange={e => setPreloadedCode(e.target.value)}
                          />
                        </div>

                      </div>
                      <div>
                        <Label htmlFor="testCases">Test Cases (JSON)</Label>
                        <Textarea
                          id="testCases"
                          placeholder="[...]"
                          className="flex-1 min-h-[400px] lg:min-h-[700px]"
                          value={testCases}
                          onChange={e => setTestCases(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button disabled={true}>Submit</Button>
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