import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function CreateAccountExisting() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const [form, setForm] = useState({ fullName: saved.fullName || "", cageCode: saved.cageCode || "", email: saved.email || "", amountUsers: saved.amountUsers || 1 });
  const [emailError, setEmailError] = useState("");
  const update = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "cageCode" ? value.toUpperCase().slice(0, 5) : value });
    if (name === "amountUsers") {
      const newCount = Number(value);
      const oldCount = Number(form.amountUsers);
      if (newCount < oldCount) {
        const updated = { ...saved, secondaryUsers: [] };
        localStorage.setItem("rfqWatchSetup", JSON.stringify(updated));
      }
    }
    if (name === "email") {
      const current = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
      const recipientEmails = (current.secondaryUsers || []).map(u => (u.email || "").toLowerCase());
      setEmailError(recipientEmails.includes(value.toLowerCase()) ? "Duplicate email, please try another address." : "");
    }
  };
  const submit = (e) => { e.preventDefault(); if (emailError) return; const data = { ...saved, ...form, amountUsers: Number(form.amountUsers) }; localStorage.setItem("rfqWatchSetup", JSON.stringify(data)); navigate(data.amountUsers === 1 ? "/existing-customer-payment" : "/recipients-existing"); };
  return <FlowLayout step={1} title="Confirm Your Account" subtitle="Verify your CAGE code and contact details to keep your RFQ alerts coming." infoProps={{ title: "Keep Your", accent: "Alerts", ending: "Active.", copy: "Confirm your account details and choose who should keep receiving RFQ alerts. Stay ahead of your competition by activating your monthly subscription." }}>
    <form className="rfq-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Full Name <span>*</span><input name="fullName" value={form.fullName} onChange={update} placeholder="Enter your full name" required /></label>
        <label>CAGE Code <span>*</span><input name="cageCode" value={form.cageCode} onChange={update} placeholder="e.g. 7AB12" pattern="[A-Za-z0-9]{5}" title="Enter a valid 5-character CAGE code" required /><small>Enter your 5-character CAGE code.</small></label>
        <label>Email Address <span>*</span><input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required className={emailError ? "input-error" : ""} />{emailError ? <small className="!text-red-500 font-semibold">{emailError}</small> : <small>RFQ alerts will be sent to this address.</small>}</label>
        <label>Amount of Recipients <span>*</span><input name="amountUsers" type="number" min="1" max="50" value={form.amountUsers} onChange={update} required /><small>Include yourself in the total.</small></label>
      </div>
      <div className="form-divider" /><div className="form-actions"><button className="continue-button" type="submit">Continue <ArrowRight size={18} /></button></div>
    </form>
  </FlowLayout>;
}