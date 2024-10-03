const NavigationButton = ({ onClick, text, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3a4c98] hover:bg-[#2f3a73] text-white px-4 py-2 font-bold font-poppins ${className}`}
      >
      {text}
    </button>
  );
};

export default NavigationButton;
