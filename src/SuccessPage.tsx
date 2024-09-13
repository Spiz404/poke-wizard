import { useState, useEffect } from "react";
import CircularIndeterminate from "./CircularIndeterminate";
import { Alert } from "@mui/material";
const SuccessPage = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const wait = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        wait().then(() => setLoading(false));
    }, []);

    if (loading)  {
        return <CircularIndeterminate/>
    }
    return (
        <div>
            <Alert severity="success">Your request has been processed</Alert>
        </div>
    );
}   

export default SuccessPage;
