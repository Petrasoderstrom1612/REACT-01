import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import type { Book } from "../../services/BooksAPI.types";

interface BookListProps {
	books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
	if (!books.length) {
		return <p>No books for you!</p>;
	}

	return (
		<ListGroup>
			{books.map((book) => (
				<ListGroup.Item key={book.id}>
					<div>{book.title}</div>
					<Row className="text-small text-muted">
						{book.author && <Col>Author: {book.author.name}</Col>}
						<Col>Pages: {book.pages}</Col>
						<Col>Published: {book.published}</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default BookList;
