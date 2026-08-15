import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FlowLayout from "@/components/rfq/FlowLayout";

export default function CompanyDetails() {
  const navigate = useNavigate();
  const setup = JSON.parse(localStorage.getItem("rfqWatchSetup") || "{}");
  const secondaryCount = Math.max(0, Number(setup.amountUsers || 1) - 1);
  const [users, setUsers] = useState(setup.secondaryUsers?.length === secondaryCount ? setup.secondaryUsers : Array.from({ length: secondaryCount }, () => ({ name: "", email: "" })));
  useEffect(() => { if (secondaryCount === 0) navigate("/payment", { replace: true }); }, [secondaryCount, navigate]);
  const update = (index, field, value) => setUsers(users.map((user, i) => i === index ? { ...user, [field]: value } : user));
  const submit = (e) => { e.preventDefault(); localStorage.setItem("rfqWatchSetup", JSON.stringify({ ...setup, secondaryUsers: users })); navigate("/payment"); };
  return <FlowLayout step={2} title="Add Recipients" subtitle={`Add the ${secondaryCount} additional ${secondaryCount === 1 ? "recipient" : "recipients"} who should receive RFQ alerts.`} infoProps={{ title: "Keep Your", accent: "Whole Team", ending: "Informed." }}>
    <form className="rfq-form" onSubmit={submit}>
      <div className="secondary-list">{users.map((user, index) => <fieldset className="user-box" key={index}><legend>Recipient {index + 2}</legend><div className="form-grid">
        <label>Full Name <span>*</span><input value={user.name} onChange={(e) => update(index, "name", e.target.value)} placeholder="Enter full name" required /></label>
        <label>Email Address <span>*</span><input type="email" value={user.email} onChange={(e) => update(index, "email", e.target.value)} placeholder="user@company.com" required /></label>
      </div></fieldset>)}</div>
      <div className="form-divider" /><div className="form-actions"><button type="button" className="back-button" onClick={() => navigate("/create-account")}><ArrowLeft size={18} /> Back</button><button className="continue-button" type="submit">Continue to Payment <ArrowRight size={18} /></button></div>
    </form>
  </FlowLayout>;
}