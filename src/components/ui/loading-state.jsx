export default function LoadingState({ message = "Chargement..." }) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full border-t-primary-green animate-spin"></div>
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    );
  }