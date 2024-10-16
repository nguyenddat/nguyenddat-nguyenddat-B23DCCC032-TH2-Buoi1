// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [job, setJob] = useState('')
  const [jobs,setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'))
    return storageJobs ?? []
  }) 
  console.log(job)

  function handleSubmit() {
    setJobs(prev => {
      const newJobs = [...prev, job]
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem('jobs', jsonJobs)

      return [...prev, job]
    })
    setJob('')
  }
  return (
    <div style={{padding: 32}}>
      <h2>Todo List</h2>
      <input type='text' placeholder='Job Content' value={job} onChange={e => setJob(e.target.value)}></input>
      <button type='submit' onClick={handleSubmit}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
