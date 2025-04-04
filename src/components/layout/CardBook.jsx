import Image from 'next/image';
import Link from 'next/link';
import { extractIdFromIri } from '@/lib/utils/normalizeData';
import { formatPrice } from '@/lib/utils/formatters';

export default function CardBook({ book }) {
  // Extraction des données avec gestion API Platform
  const bookId = book.id || extractIdFromIri(book['@id']);
  const title = book.title || 'Titre inconnu';
  const price = book.price ? formatPrice(parseFloat(book.price)) : 'Prix non défini';
  const coverImage = book.coverImage || '/img/placeholder-book.jpg';

  return (
    <div className="group rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Zone image avec fallback */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">

        <Image
          src={coverImage}
          alt={`Couverture de ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 250px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{title}</h3>

        <div className="text-sm text-gray-600 mb-2 space-y-1">
          {book.isbn && <p className="truncate">ISBN: {book.isbn}</p>}
          {book.parutionAt && <p>Année: {book.parutionAt}</p>}
          {book.publisher && <p className="truncate">Éditeur: {book.publisher}</p>}
        </div>

        <div className="mt-3 flex justify-between items-center">
          <span className="font-semibold text-primary-green">{price}</span>

          <Link
            href={`/books/${bookId}`}
            className="px-3 py-1 bg-primary-green text-white rounded hover:bg-green-700 transition-colors"
          >
            Détails
          </Link>
        </div>
      </div>
    </div>
  );
}