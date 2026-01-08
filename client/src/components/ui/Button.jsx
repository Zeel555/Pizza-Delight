import PropTypes from 'prop-types';

function Button({
  variant,
  children,
  className: additionalClassNames,
  ...props
}) {
  let classes = '';

  switch (variant) {
    case 'primary':
      classes = 'bg-green-600 hover:bg-green-700 text-white py-3 px-4 my-2';
      break;
    case 'secondary':
      classes = 'bg-white hover:bg-gray-100 text-green-600 py-3 px-4 my-2';
      break;
    case 'outline':
      classes =
        'bg-transparent hover:bg-green-600 text-green-600 hover:text-white border-2 border-green-600 py-3 px-4 my-2 transition-all duration-300';
      break;
    case 'danger':
      classes = 'bg-red-500 hover:bg-red-600 text-white py-3 px-4 my-2';
      break;
    default:
      classes = 'bg-green-600 hover:bg-green-700 py-3 px-4 my-2';
      break;
  }

  if (additionalClassNames) {
    classes += ` ${additionalClassNames}`;
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
