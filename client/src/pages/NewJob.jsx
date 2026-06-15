import api from "../services/api"
export default function NewJob({onJobAdded}) {
  const now = new Date();
  const year = now.getFullYear();
  // Add leading zero to month if needed
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  // Set date to the 1st of the current month
  const firstDayOfMonth = `${year}-${month}-01`;
  const currentDay= `${year}-${month}-${day}`
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form=e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try{
        const response=await api.post("/jobs/",data);
        console.log(response.data)
        onJobAdded(response.data)
        form.reset();
    }catch(err){
        console.error(err.message)
    }

  };
  return (
    <aside className="panel new-job-panel">
      <div className="panel-heading">
        <p className="eyebrow">New application</p>
        <h2>Add job</h2>
      </div>
      <form onSubmit={handleSubmit} className="form-stack">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          required
        />
        <label htmlFor="role">Role</label>
        <input type="text" id="role" name="role" required />
        <label htmlFor="status">Status</label>
        <select name="status" id="status" required>
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
          min={firstDayOfMonth}
          max={currentDay}
        />
        <label htmlFor="notes">Notes</label>
        <input type="text" id="notes" name="notes" />
        <button type="submit">Add To Job Tracker</button>
      </form>
    </aside>
  );
}
