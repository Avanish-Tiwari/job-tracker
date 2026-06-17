import "./JobCard.css"
import remove from "/remove.png"
import edit from "/edit.png"
import {useNavigate} from "react-router-dom"
import api from "../services/api"
export default function JobCard({ job }) {
  const navigate=useNavigate()
  const handleEdit=()=>{
   navigate("/edit",{
    state:{job:job}
   });
  }
  const handleDelete=async (e)=>{
    e.preventDefault();
    const response=await api.delete(`jobs/${job.id}`);
    console.log(response.data)
  }
  const date= new Date(job.applied_date).toDateString();
  return (
    <div className="card-container">
      <div className="job-info">
        <span>{job.company}</span>
        <span>{job.role}</span>
        <span>{job.status}</span>
        <span>{date}</span>
      </div>
      <span className="notes">{job.notes}</span>
      <button className="remove-button" onClick={handleDelete}><img src={remove} alt="remove button" /></button>
      <button className="edit-button" onClick={handleEdit}><img src={edit} alt="edit the job info" /></button>
    </div>
  );
}
