import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function CreateAccount() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const [form, setForm] = useState({ fullName: saved.fullName || "", cageCode: saved.cageCode || "", email: saved.email || "", amountUsers: saved.amountUsers || 1 });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.name === "cageCode" ? e.target.value.toUpperCase().slice(0, 5) : e.target.value });
  const submit = (e) => { e.preventDefault(); const data = { ...saved, ...form, amountUsers: Number(form.amountUsers) }; localStorage.setItem("rfqWatchSetup", JSON.stringify(data)); navigate(data.amountUsers === 1 ? "/payment" : "/company-details"); };
  return <FlowLayout step={1} title="Create Your Account" subtitle="Enter your contact details and tell us how many users need access.">
    <form className="rfq-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Full Name <span>*</span><input name="fullName" value={form.fullName} onChange={update} placeholder="Enter your full name" required /></label>
        <label>CAGE Code <span>*</span><input name="cageCode" value={form.cageCode} onChange={update} placeholder="e.g. 7AB12" pattern="[A-Za-z0-9]{5}" title="Enter a valid 5-character CAGE code" required /><small>Enter your 5-character CAGE code.</small></label>
        <label>Email Address <span>*</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /><small>RFQ alerts will be sent to this address.</small></label>
        <label>Amount of Users <span>*</span><input name="amountUsers" type="number" min="1" max="50" value={form.amountUsers} onChange={update} required /><small>Include yourself in the total.</small></label>
      </div>
      <div className="form-divider" /><button className="continue-button" type="submit">Continue <ArrowRight size={18} /></button>
    </form>
  </FlowLayout>;
}