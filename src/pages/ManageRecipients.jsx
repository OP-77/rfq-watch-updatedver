import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Trash2, UserPlus, Users } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function ManageRecipients() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const [primary, setPrimary] = useState(saved.email || "");
  const [primaryName, setPrimaryName] = useState(saved.fullName || "");
  const [recipients, setRecipients] = useState(() => (saved.secondaryUsers || []).map(u => ({ ...u })));
  const [errors, setErrors] = useState({});

  const allEmails = () => {
    const list = [primary.toLowerCase(), ...recipients.map(r => (r.email || "").toLowerCase())];
    return list;
  };

  const checkDuplicates = (list) => {
    const emails = [primary.toLowerCase(), ...list.map(r => (r.email || "").toLowerCase())];
    const errs = {};
    list.forEach((r, i) => {
      const email = (r.email || "").toLowerCase();
      if (email && emails.filter(e => e === email).length > 1) errs[i] = "Duplicate email, please try another address.";
    });
    return errs;
  };

  const addRecipient = () => {
    const updated = [...recipients, { name: "", email: "" }];
    setRecipients(updated);
    setErrors(checkDuplicates(updated));
  };

  const updateRecipient = (index, field, value) => {
    const updated = recipients.map((r, i) => i === index ? { ...r, [field]: value } : r);
    setRecipients(updated);
    setErrors(checkDuplicates(updated));
  };

  const removeRecipient = (index) => {
    const updated = recipients.filter((_, i) => i !== index);
    setRecipients(updated);
    setErrors(checkDuplicates(updated));
  };

  const save = (e) => {
    e.preventDefault();
    const errs = checkDuplicates(recipients);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const newCount = 1 + recipients.length;
    const updated = { ...saved, fullName: primaryName, email: primary, secondaryUsers: recipients, amountUsers: newCount };
    localStorage.setItem("rfqWatchSetup", JSON.stringify(updated));
    navigate("/order-confirmation");
  };

  const currentTotal = 50 + Math.max(0, recipients.length) * 5;
  const monthlyTotal = currentTotal;

  return (
    <FlowLayout
      step={2}
      title="Manage Recipients"
      subtitle="Add, edit, or remove recipients. Billing updates automatically when you make changes."
      infoProps={{
        title: "Keep Your",
        accent: "Team",
        ending: "In Sync.",
        copy: "Manage who receives RFQ alerts. Add new team members or remove access anytime — your monthly subscription adjusts automatically."
      }}
    >
      <form className="rfq-form" onSubmit={save}>
        <fieldset className="user-box">
          <legend>Primary Recipient</legend>
          <div className="form-grid">
            <label>Full Name <span>*</span>
              <input value={primaryName} onChange={(e) => setPrimaryName(e.target.value)} placeholder="Enter full name" required />
            </label>
            <label>Email Address <span>*</span>
              <input type="email" value={primary} onChange={(e) => setPrimary(e.target.value)} placeholder="you@company.com" required />
            </label>
          </div>
        </fieldset>

        <h3 className="section-title flex items-center gap-2"><Users size={18} className="text-[#2c5a89]" /> Additional Recipients</h3>
        <div className="secondary-list">
          {recipients.length === 0 && <p className="text-slate-400 text-sm">No additional recipients yet. Click "Add Recipient" to add one.</p>}
          {recipients.map((r, index) => (
            <fieldset className="user-box" key={index}>
              <legend className="flex items-center justify-between w-full">
                <span>Recipient {index + 2}</span>
                <button type="button" className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 text-xs" onClick={() => removeRecipient(index)}>
                  <Trash2 size={14} /> Remove
                </button>
              </legend>
              <div className="form-grid">
                <label>Full Name <span>*</span>
                  <input value={r.name} onChange={(e) => updateRecipient(index, "name", e.target.value)} placeholder="Enter full name" required />
                </label>
                <label>Email Address <span>*</span>
                  <input type="email" value={r.email} onChange={(e) => updateRecipient(index, "email", e.target.value)} placeholder="recipient@company.com" required className={errors[index] ? "input-error" : ""} />
                  {errors[index] && <small className="!text-red-500 font-semibold">{errors[index]}</small>}
                </label>
              </div>
            </fieldset>
          ))}
        </div>

        <button type="button" className="back-button mb-2" onClick={addRecipient}>
          <UserPlus size={18} /> Add Recipient
        </button>

        <div className="form-divider" />

        <div className="fee-card">
          <div><strong>${monthlyTotal.toFixed(2)}/mo</strong><span>{1 + recipients.length} {1 + recipients.length === 1 ? "recipient" : "recipients"} · $50 base + $5 per additional</span></div>
        </div>

        <div className="form-divider" />
        <div className="form-actions">
          <button type="button" className="back-button" onClick={() => navigate("/")}>
            <ArrowLeft size={18} /> Back
          </button>
          <button className="continue-button" type="submit">
            Save Changes <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </FlowLayout>
  );
}