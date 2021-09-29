interface Quote {
    id?: number;
    creatorId: string,
    creatorUsername?: string,
    creationDate: Date,
    text: string,
    author: string,
    book: string,
    tags: Array<string>
}

export default Quote;