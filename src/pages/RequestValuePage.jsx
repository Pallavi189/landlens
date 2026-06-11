import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { propertyTypes } from "../utils/constants";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  property_type: propertyTypes[0],
  site_size: "",
  message: "",
};

function RequestValuePage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!form.name || !form.email || !form.location) {
      setStatus("Please enter your name, email, and location.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("user_requests").insert({
      ...form,
      status: "pending",
    });

    setLoading(false);

    if (error) {
      setStatus("Request submit error. Please try again.");
      return;
    }

    setStatus("Request submitted successfully.");
    setForm(initialForm);
  }

  return (
    <main className="standard-page">
      <section className="form-layout">
        <div>
          <p className="eyebrow">Request Verification</p>
          <h1>Can&apos;t find your location?</h1>
          <p>
            Send the locality and property details. The LandLens team can verify
            the SR value and add it to the database.
          </p>
        </div>

        <form className="request-form panel" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={updateField} />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
              />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={updateField} />
            </label>
            <label>
              <span>Location</span>
              <input
                name="location"
                value={form.location}
                onChange={updateField}
              />
            </label>
            <label>
              <span>Property Type</span>
              <select
                name="property_type"
                value={form.property_type}
                onChange={updateField}
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Site Size</span>
              <input
                name="site_size"
                value={form.site_size}
                onChange={updateField}
                placeholder="Example: 1200 sqft"
              />
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={updateField}
            />
          </label>
          {status ? <p className="form-status">{status}</p> : null}
          <button className="btn btn-primary" type="submit">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default RequestValuePage;
