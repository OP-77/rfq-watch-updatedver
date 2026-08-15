import BrandHeader from "@/components/rfq/BrandHeader";
import InfoPanel from "@/components/rfq/InfoPanel";
import StepProgress from "@/components/rfq/StepProgress";

export default function FlowLayout({ step, children, title, subtitle, infoProps }) {
  return <div className="rfq-page">
    <BrandHeader />
    <main className="rfq-layout">
      <InfoPanel {...infoProps} />
      <section className="flow-card">
        <StepProgress active={step} />
        <div className="flow-heading"><h2>{title}</h2><p>{subtitle}</p></div>
        {children}
      </section>
    </main>
  </div>;
}