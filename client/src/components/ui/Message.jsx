import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa';

const Message = ({ children }) => {
  // ✅ Guard: prevent crashes
  if (!children || typeof children === 'boolean') return null;

  const successStyles =
    'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative';
  const warningStyles =
    'bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative';
  const errorStyles =
    'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
  const infoStyles =
    'bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative';

  const iconComponents = {
    success: FaCheckCircle,
    warning: FaExclamationCircle,
    error: FaTimesCircle,
    info: FaInfoCircle,
  };

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  // ✅ Normalize message input
  let status = 500;
  let message = '';

  if (typeof children === 'string') {
    message = children;
  } else if (typeof children === 'object') {
    status = children.status || 500;
    message = children.message || 'Something went wrong';
  }

  let alertStyle = infoStyles;
  let Icon = iconComponents.info;

  if (status >= 200 && status <= 299) {
    alertStyle = successStyles;
    Icon = iconComponents.success;
  } else if (status >= 400 && status <= 499) {
    alertStyle = warningStyles;
    Icon = iconComponents.warning;
  } else if (status >= 500) {
    alertStyle = errorStyles;
    Icon = iconComponents.error;
  }

  return (
    <div className={alertStyle} role="alert">
      <Icon className="inline-flex mr-2" />
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.any,
};

export default Message;
