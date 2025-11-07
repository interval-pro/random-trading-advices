interface ConfirmExitModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
}

export const ConfirmExitModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel,
  title = "Are you sure?",
  message = "Make sure you saved the information before exit",
  confirmText = "Exit",
  cancelText = "Cancel",
  confirmButtonClass = "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30"
}: ConfirmExitModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 max-w-md w-full border border-slate-700/50 shadow-2xl shadow-black/60">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-semibold py-3 px-6 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 border border-slate-600/50 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

