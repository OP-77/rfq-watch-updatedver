import { CircleCheck, Mail, Users } from "lucide-react";

const items = [
[CircleCheck, "Relevant RFQs", "Matched to your CAGE code and preferences."],
[Mail, "Timely Alerts", "Government opportunities sent to your inbox."],
[Users, "Team Access", "Keep every account user informed."]];


export default function InfoPanel({ title = "Never Miss a", accent = "Relevant RFQ", ending = "Again.", copy = "Add your CAGE code, choose who receives alerts, and get matching government RFQs delivered directly to your inbox." }) {
  return <section className="info-panel">
    <div className="info-shadow-box">
      <p className="rfq-eyebrow">Government RFQ Alerts</p>
      <h1>{title} <span>{accent}</span> {ending}</h1>
      <div className="gold-rule" />
      <p className="info-copy">{copy}</p>
      <div className="info-benefits">{items.map(([Icon, heading, copy]) => <div className="info-benefit" key={heading}>
        <Icon /><div><h3>{heading}</h3><p>{copy}</p></div>
      </div>)}</div>
    </div>
  </section>;
}