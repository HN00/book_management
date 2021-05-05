import { Book } from './book';

export class Author {
    id!: number;
    name!: string;
    birthday!: Date;
    website?: string;
    cover?: string;
    books?: Book[];
}
