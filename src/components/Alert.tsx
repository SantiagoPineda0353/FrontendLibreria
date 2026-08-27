import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
  onClose: () => void;
}

export default function Alert({ type, message, onClose }: AlertProps) {
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  return (
    <div className={`alert alert-${type}`}>
      <Icon size={18} strokeWidth={2} />
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}><X size={16} /></button>
    </div>
  );
}