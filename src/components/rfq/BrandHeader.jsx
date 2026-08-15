import { Link } from "react-router-dom";

const LIT_LOGO = "https://media.base44.com/images/public/6a7fda35ce3693e5050df072/e87f0cfc0_lit_logo_white.svg";

export default function BrandHeader() {
  return (
    <header className="rfq-header">
      <Link to="/" className="rfq-brand">
        <img src={LIT_LOGO} alt="LIT" className="rfq-lit-logo" />
        <span><strong>RFQ Watch</strong> <small>Lite</small></span>
      </Link>
    </header>
  );
}