import Icon from "./Icon";
import PanelTitle from "./PanelTitle";

function PriceEvaluationCard() {
  return (
    <section className="panel">
      <PanelTitle icon="shield" title="Price Evaluation" />
      <div className="evaluation-box">
        <span className="check-ring">
          <Icon name="check" size={38} />
        </span>
        <div>
          <strong>Fair Deal</strong>
          <p>
            The market price is within a reasonable range compared to SR value
            in this location.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PriceEvaluationCard;
