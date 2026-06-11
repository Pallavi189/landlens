import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      const { data, error } = await supabase
        .from("user_requests")
        .select("id, name, email, location, property_type, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error) setRequests(data || []);
    }

    fetchRequests();
  }, []);

  return (
    <main className="standard-page">
      <section className="admin-layout">
        <div>
          <p className="eyebrow">Admin Preview</p>
          <h1>LandLens Admin Dashboard</h1>
          <p>
            Placeholder dashboard for monitoring localities, SR values, and
            pending user requests. Authentication can be added later.
          </p>
        </div>

        <div className="metric-grid">
          <Metric label="Total Localities" value="--" />
          <Metric label="Total SR Values" value="--" />
          <Metric label="Pending Requests" value="--" />
        </div>

        <section className="panel">
          <h2 className="section-title">Recent User Requests</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Property Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length ? (
                  requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.location}</td>
                      <td>{request.property_type}</td>
                      <td>{request.status || "pending"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No recent requests found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default AdminDashboard;
