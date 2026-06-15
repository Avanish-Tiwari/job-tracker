import JobCard from "./JobCard";
import { useAuth } from "../context/AuthContext";

export default function JobsBoard({jobs:data}) {
  const { logout } = useAuth();
  if (!data) {
    return <section className="panel jobs-panel"><h2>Loading jobs...</h2></section>;
  }
  if (data.length == 0) {
    return (
      <section className="panel jobs-panel empty-state">
        <h2>No jobs yet</h2>
        <p>Add your first application to start tracking progress.</p>
        <button className="secondary-button" onClick={logout}>Logout</button>
      </section>
    );
  }
  return (
    <section className="panel jobs-panel">
      <div className="panel-heading">
        <p className="eyebrow">Applications</p>
        <h2>Job list</h2>
      </div>
    <div className="jobs-list">
      {data && data.map((job) => <JobCard key={job.id}  job={job} />)}
    </div>
    </section>
  );
}
