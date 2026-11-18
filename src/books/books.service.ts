import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
}

@Injectable()
export class BooksService {
  private books: Book[] = [
    { id: 1, title: 'Kobzar', author: 'Taras Shevchenko', year: 1840 },
    { id: 2, title: 'Tyhrolovy', author: 'Ivan Bahrianyi', year: 1905 },
  ];
  private nextId = 3;

  findAll(author?: string): Book[] {
    if (author)
      return this.books.filter(
        (book) => book.author.toLowerCase() === author.toLowerCase(),
      );
    return this.books;
  }

  getOne(id: number): Book {
    const book = this.books.find(book => book.id === id);
    if (!book)
      throw new NotFoundException(`book_not_found`);

    return book;
  }

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.nextId++,
      ...createBookDto,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const book = this.getOne(id);
    Object.assign(book, updateBookDto);
    return book;
  }

  remove(id: number): void {
    const index = this.books.findIndex(item => item.id === id);
    if (index === -1)
      throw new NotFoundException(`book_not_found`);
    this.books.splice(index, 1);
  }
}
