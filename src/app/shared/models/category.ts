import { Book } from '../models/book';

export class Category {
    id!: number;
    name!: string;
    description!: string;
    books?: Book[];
}
