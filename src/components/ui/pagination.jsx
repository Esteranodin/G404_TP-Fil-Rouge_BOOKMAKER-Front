export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5,
  className = "",
  buttonClassName = "px-3 py-1 rounded bg-gray-200 hover:bg-gray-300",
  activeClassName = "bg-primary-green text-white",
  disabledClassName = "opacity-50 cursor-not-allowed"
}) {

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      // Calculer le début et la fin des pages à afficher
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        end = 4;
      }

      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`flex justify-center items-center gap-2 mt-6 ${className}`}>
      {/* Bouton précédent */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`${buttonClassName} ${currentPage === 1 ? disabledClassName : ""}`}
        aria-label="Page précédente"
      >
        &laquo;
      </button>

      {/* Numéros de page */}
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page
                ? activeClassName
                : buttonClassName
              }`}
          >
            {page}
          </button>
        )
      ))}

      {/* Bouton suivant */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${buttonClassName} ${currentPage === totalPages ? disabledClassName : ""}`}
        aria-label="Page suivante"
      >
        &raquo;
      </button>
    </div>
  );
}