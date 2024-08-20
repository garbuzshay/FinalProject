const NavigationButton = ({ onClick, text, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 font-bold ${className}`}
    >
      {text}
    </button>
  );
};

export default NavigationButton;
