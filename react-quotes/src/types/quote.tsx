interface Quote {
    id?: number;
    creatorId: string,
    text: string,
    author: string,
    book: string,
    tags: Array<string>
}

export default Quote;