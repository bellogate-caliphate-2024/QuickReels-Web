// components/UnauthorizedModal.tsx
import StatusModal from '../auth/statusModal';

interface UnauthorizedModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

const UnauthorizedModal: React.FC<UnauthorizedModalProps> = ({
  isVisible,
  onClose,
  message,
}) => {
  return (
    <StatusModal
      isVisible={isVisible}
      onClose={onClose}
      type="error"
      title="Unauthorized"
      message={message}
    />
  );
};

export default UnauthorizedModal;
