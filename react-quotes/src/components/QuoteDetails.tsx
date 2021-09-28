import React from "react";
import { useParams } from "react-router-dom";
import useQuoteDetailService from "../hooks/useQuoteDetailSevice";
import {Button, Grid} from "@mui/material";

interface RouteParams {
    id: string
}

const QuoteDetails = () => {
    const params = useParams<RouteParams>();
    const service = useQuoteDetailService(params.id);
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <div>
                    {service.status === 'loading' && <div>Loading...</div>}
                    {service.status === 'loaded' &&
                        <div>
                            <h1>{service.payload.text}</h1>
                            <h2>{service.payload.author}</h2>
                            <h3>{service.payload.book}</h3>
                            <h4>{service.payload.tags.map(tag => <Button color={"primary"}>{tag}</Button>)}</h4>
                            {document.queryCommandSupported('copy') &&
                                <div>
                                    <Button onClick={() => navigator.clipboard.writeText(service.payload.text)}>Copy the text</Button>
                                    <Button onClick={() => navigator.clipboard.writeText([service.payload.author, service.payload.book].join(", "))}>Copy citing information</Button>
                                </div>
                                }
                        </div>
                    }
                    {service.status === 'error' && <div>Error, the backend moved to the dark side.</div>}
                </div>
            </Grid>
            <Grid item xs={6}>
                Placeholder
            </Grid>
        </Grid>

    )
}

export default QuoteDetails;