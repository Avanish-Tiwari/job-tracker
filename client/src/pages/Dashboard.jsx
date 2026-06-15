import { useAuth } from "../context/AuthContext";
import NewJob from "./NewJob";
import JobsBoard from "./JobsBoard";
import { useEffect, useState } from "react";
import api from "../services/api";
export default function Dashboard() {
  const [jobs, setJobs] = useState(null);
  const { logout } = useAuth();
  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/jobs/");
      setJobs(response.data);
    }
    fetchData();
  }, []);
  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <>
      <div className="dashboard-page">
        <header className="app-header">
          <div>
            <p className="eyebrow">Job Tracker</p>
            <h1>Dashboard</h1>
          </div>
          <button className="secondary-button" onClick={logout}>Logout</button>
        </header>
        <main className="dashboard-grid">
          <NewJob onJobAdded={handleAddJob} />
          <JobsBoard jobs={jobs}  />
        </main>
      </div>
    </>
  );
}
