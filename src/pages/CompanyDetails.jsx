import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function CompanyDetails() {
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const secondaryCount = Math.max(0, Number(setup.amountUsers || 1) - 1);
  const [users, setUsers] = useState(() => {
    const existing = setup.secondaryUsers || [];
    return Array.from({ length: secondaryCount }, (_, i) => existing[i] || { name: "", email: "" });
  });
  const [errors, setErrors] = useState({});
  useEffect(() => { if (secondaryCount === 0) navigate("/payment", { replace: true }); }, [secondaryCount, navigate]);
  const checkDuplicates = (userList) => {
    const allEmails = [(setup.email || "").toLowerCase(), ...userList.map(u => (u.email || "").toLowerCase())];
    const errs = {};
    userList.forEach((user, i) => {
      const email = (user.email || "").toLowerCase();
      if (email && allEmails.filter(e => e === email).length > 1) errs[i] = "Duplicate email, please try another address.";
    });
    return errs;
  };
  const update = (index, field, value) => { const updated = users.map((u, i) => i === index ? { ...u, [field]: value } : u); setUsers(updated); setErrors(checkDuplicates(updated)); };
  const submit = (e) => { e.preventDefault(); const errs = checkDuplicates(users); setErrors(errs); if (Object.keys(errs).length) return; localStorage.setItem("rfqWatchSetup", JSON.stringify({ ...setup, secondaryUsers: users })); navigate("/payment"); };
  return <FlowLayout step={2} title="Add Recipients" subtitle={`Add the ${secondaryCount} additional ${secondaryCount === 1 ? "recipient" : "recipients"} who should receive RFQ alerts.`} infoProps={{ title: "Keep Your", accent: "Whole Team", ending: "Informed." }}>
    <form className="rfq-form" onSubmit={submit}>
      <div className="secondary-list">{users.map((user, index) => <fieldset className="user-box" key={index}><legend>Recipient {index + 2}</legend><div className="form-grid">
        <label>Full Name <span>*</span><input value={user.name} onChange={(e) => update(index, "name", e.target.value)} placeholder="Enter full name" required /></label>
        <label>Email Address <span>*</span><input type="email" value={user.email} onChange={(e) => update(index, "email", e.target.value)} placeholder="recipient@company.com" required className={errors[index] ? "input-error" : ""} />{errors[index] && <small className="!text-red-500 font-semibold">{errors[index]}</small>}</label>
      </div></fieldset>)}</div>
      <div className="form-divider" /><div className="form-actions"><button type="button" className="back-button" onClick={() => { localStorage.setItem("rfqWatchSetup", JSON.stringify({ ...setup, secondaryUsers: users })); navigate("/create-account"); }}><ArrowLeft size={18} /> Back</button><button className="continue-button" type="submit">Continue to Payment <ArrowRight size={18} /></button></div>
    </form>
  </FlowLayout>;
}