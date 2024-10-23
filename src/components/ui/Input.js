export const Input = ({ type, value, placeholder, onChange }) => (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
  