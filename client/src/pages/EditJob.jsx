import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "./EditJob.css";
export default function EditJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.job;
  const [job, setJob] = useState(data);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${job.id}`, job);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="edit-page">
      <section className="panel edit-panel">
      <div className="panel-heading">
        <p className="eyebrow">Application details</p>
        <h1>Edit job</h1>
      </div>
      <form onSubmit={handleSubmit} className="edit-Form">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          required
          value={job.company}
          onChange={handleChange}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={job.role}
          onChange={handleChange}
          required
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          value={job.status}
          id="status"
          onChange={handleChange}
          required
        >
          <option value="" defaultChecked>
            Select
          </option>
          <option value="applied">Applied</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
        <label htmlFor="applied_date">Applied date</label>
        <input
          required
          type="date"
          id="applied_date"
          name="applied_date"
          value={job.applied_date ? job.applied_date.split("T")[0] : ""}
          disabled
        />
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={job.notes}
          onChange={handleChange}
        />
        <button type="submit">Update Job info</button>
        <button type="button" className="secondary-button" onClick={() => navigate("/dashboard")}>Back To Dashboard</button>
      </form>
      </section>
    </div>
  );
}
