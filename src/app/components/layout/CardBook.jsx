import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { formatPrice } from "../../../lib/utils/formatters";

export default function CardBook({ book }) {
  return (
    <Link href={`/books/${book.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={book.coverImage || "/images/placeholder-book.jpg"}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-bold line-clamp-1 mb-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
          <div className="flex gap-2 flex-wrap mb-2">
            {book.categories?.map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
          </div>
          <p className="text-sm line-clamp-2 text-muted-foreground">
            {book.description}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="font-bold text-primary">{formatPrice(book.price)}</p>
          <Badge variant="outline" className={book.stock > 0 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}>
            {book.stock > 0 ? "En stock" : "Épuisé"}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}