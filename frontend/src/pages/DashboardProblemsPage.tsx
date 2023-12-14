import { Button } from '@/components/ui/button';
import { ProblemCard } from '@components/problems/ProblemCard';
import { Input } from '@components/ui/input';
import useProblem from '@hooks/useProblem';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardProblemsPage = () => {
  const [searchBar, setSearchBar] = useState('');
  const { problems } = useProblem(searchBar);

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Problems</h2>
          <div className="flex items-center space-x-2">
            <Link to="/dash/new-problem"><Button>+ New Problem</Button></Link>
          </div>
        </div>
        <div className="space-y-4">
          <Input name="Searchbar" placeholder="Search" className="border-gray-500 md:w-[100px] lg:w-[500px]" value={searchBar} onChange={e => setSearchBar(e.target.value)} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {problems?.map((e) => 
              <ProblemCard key={e._id} title={e.title} code={`#${e.problemId}`} _id={e._id} updatedAt={new Date()} isPublished={e.isPublished} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardProblemsPage