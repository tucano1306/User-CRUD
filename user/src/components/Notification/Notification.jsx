// src/components/Notification/Notification.jsx
import { AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ message, type = 'info' }) => (
  <div className={`notification ${type}`}>
    <AlertCircle />
    <p>{message}</p>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'error'])
};

export default Notification;