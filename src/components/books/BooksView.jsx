import CardBook from "@/components/layout/CardBook";
import BookFilters from "./BookFilters";
import Pagination from "@/components/ui/pagination";
import LoadingState from "@/components/ui/loading-state";
import ErrorState from "@/components/ui/error-state";

export default function BooksView({
  books = [],
  categories = [],
  currentPage,
  totalPages,
  isLoading,
  error,
  onPageChange,
  onFiltersChange,
  activeFilters
}) {
  if (isLoading) {
    return <LoadingState message="Chargement des livres..." />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explorer notre collection</h1>
      
      {/* Filtres */}
      <BookFilters 
        categories={categories}
        activeFilters={activeFilters}
        onFiltersChange={onFiltersChange}
      />
      
      {/* Grille de livres */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {books.length > 0 ? (
          books.map((book) => (
            <CardBook key={book.id || book['@id']} book={book} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">Aucun livre disponible.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </main>
  );
}