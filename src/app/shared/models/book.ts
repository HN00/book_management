import { Author } from './author';
import { Category } from './category';

export class Book {
    id!: number;
    name!: string;
    description?: string;
    price!: number;
    year!: number;
    author?: Author;
    publisher!: string;
    cover?: string;
    categories?: Category[];
}
