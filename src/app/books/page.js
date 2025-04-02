import CardBook from "../components/layout/CardBook";

// Données fictives pour l'exemple
const mockBooks = [
  {
    id: 1,
    title: "Le Seigneur des Anneaux",
    author: "J.R.R. Tolkien",
    description: "Un jeune hobbit, Frodon Sacquet, hérite d'un anneau. Mais ce n'est pas un anneau ordinaire, c'est l'Anneau Unique, instrument du pouvoir du Seigneur des Ténèbres Sauron.",
    price: 29.99,
    stock: 15,
    coverImage: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    categories: [
      { id: 1, name: "Fantaisie" },
      { id: 2, name: "Aventure" }
    ]
  },
  {
    id: 2,
    title: "Harry Potter à l'école des sorciers",
    author: "J.K. Rowling",
    description: "Le jour de ses onze ans, Harry Potter, un orphelin élevé par un oncle et une tante qui le détestent, voit son existence bouleversée.",
    price: 24.99,
    stock: 10,
    coverImage: "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg",
    categories: [
      { id: 1, name: "Fantaisie" },
      { id: 3, name: "Jeunesse" }
    ]
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    description: "Dans une société totalitaire, un homme se rebelle contre le système qui l'oppresse.",
    price: 19.99,
    stock: 0,
    coverImage: "https://www.gallimard.fr/system/files/migrations/ouvrages/couvertures/G00686.jpg",
    categories: [
      { id: 4, name: "Science-Fiction" },
      { id: 5, name: "Dystopie" }
    ]
  },
  {
    id: 4,
    title: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    description: "Un pilote d'avion, échoué dans le désert du Sahara, rencontre un petit prince venu d'une autre planète.",
    price: 14.99,
    stock: 20,
    coverImage: "https://m.media-amazon.com/images/I/710wth0vXZL.jpg",
    categories: [
      { id: 3, name: "Jeunesse" },
      { id: 6, name: "Conte" }
    ]
  },
];

export const metadata = {
  title: "Explorer les livres | BookMarket",
  description: "Parcourez notre catalogue de livres et trouvez votre prochaine lecture préférée",
};

export default function BooksPage() {
  return (
    <main className="flex flex-col items-center justify-between p-6 md:p-24">
      <h1 className="mb-8">Explorer notre collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockBooks.map((book) => (
          <CardBook key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}