const pool = require("../models/db");

exports.getJobs = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id],
  );
  res.json(result.rows);
};

exports.addJob = async (req, res) => {
  const { company, role, status, applied_date, notes } = req.body;
  const result = await pool.query(
    "INSERT INTO jobs (user_id, company, role, status, applied_date, notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [req.user.id, company, role, status, applied_date, notes],
  );
  res.status(201).json(result.rows[0]);
};

exports.updateJob = async (req, res) => {
  const { company, role, status, applied_date, notes } = req.body;
  const result = await pool.query(
    "UPDATE jobs SET company=$1, role=$2, status=$3, applied_date=$4, notes=$5 WHERE id=$6 AND user_id=$7 RETURNING *",
    [company, role, status, applied_date, notes, req.params.id, req.user.id],
  );
  res.json(result.rows[0]);
};
exports.deleteJob = async (req, res) => {
  await pool.query("DELETE FROM jobs WHERE id=$1 AND user_id=$2", [
    req.params.id,
    req.user.id,
  ]);
  res.json({ message: "Deleted" });
};
