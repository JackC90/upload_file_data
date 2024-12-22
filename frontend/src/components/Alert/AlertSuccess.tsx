const AlertSuccess = ({ message }: { message: string }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default AlertSuccess;
