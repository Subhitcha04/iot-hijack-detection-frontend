export const Card = ({ children, className }) => (
    <div className={`shadow-lg p-6 rounded-lg bg-white ${className}`}>{children}</div>
  );
  
  export const CardHeader = ({ children }) => (
    <div className="border-b pb-4">{children}</div>
  );
  
  export const CardTitle = ({ children, className }) => (
    <h3 className={`text-lg font-bold ${className}`}>{children}</h3>
  );
  
  export const CardContent = ({ children }) => (
    <div>{children}</div>
  );
  