import { Link } from "react-router-dom";
import Icon from "./Icon";

function RequestCard() {
  return (
    <div className="request-card">
      <Icon name="help" size={28} />
      <div>
        <h2>Can&apos;t find your location?</h2>
        <p>
          Submit a request and our team will fetch the verified SR value for
          you.
        </p>
        <Link className="request-button" to="/request-value">
          Request SR Value
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </div>
  );
}

export default RequestCard;
