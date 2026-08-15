const steps = ["Create Account", "Secondary Users", "Payment"];

export default function StepProgress({ active }) {
  return (
    <div className="step-progress" aria-label={`Step ${active} of 3`}>
      {steps.map((label, index) => {
        const number = index + 1;
        return <div className="step-wrap" key={label}>
          <div className={`step-item ${number <= active ? "is-active" : ""} ${number < active ? "is-done" : ""}`}>
            <span>{number < active ? "✓" : number}</span><p>{label}</p>
          </div>
          {number < 3 && <div className={`step-line ${number < active ? "is-done" : ""}`} />}
        </div>;
      })}
    </div>
  );
}