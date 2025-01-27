import { useEffect } from "react";
import PropTypes from "prop-types";
import "./Notification.css";

function Notification({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification notification-${type}`}>
      <p>{message}</p>
      <button className="notification-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
