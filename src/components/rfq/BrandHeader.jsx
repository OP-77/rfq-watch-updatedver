import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function BrandHeader() {
  return (
    <header className="rfq-header">
      <Link to="/" className="rfq-brand">
        <span className="rfq-logo"><Mail size={21} /></span>
        <span><strong>RFQ</strong> WATCH<small>Government opportunities. Delivered.</small></span>
      </Link>
    </header>
  );
}