// BooksGrid.tsx
import React from 'react';
import { Grid, GridItem, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

interface Book {
    id: number;
    title: string;
    link: string;
}

interface BooksGridProps {
    books: Book[];
}

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {books.slice(0, 12).map((book) => (
                <GridItem key={book.id} w="100%" h="10">
                    <LinkBox as={RouterLink} to={book.link} p="4" borderWidth="1px" borderRadius="lg" _hover={{ bg: "gray.100" }}>
                        <LinkOverlay href={book.link}>
                            {book.title}
                        </LinkOverlay>
                    </LinkBox>
                </GridItem>
            ))}
        </Grid>
    );
};

export default BooksGrid;