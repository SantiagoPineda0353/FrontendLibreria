interface AlertProps {
    type: 'error' | 'success';
    message: string;
    onClose: () => void;
  }
  
  export default function Alert({ type, message, onClose }: AlertProps) {
    return (
      <div className={`alert alert-${type}`}>
        <span>{message}</span>
        <button onClick={onClose}>&times;</button>
      </div>
    );
  }