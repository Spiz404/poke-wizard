import { useState, useEffect } from "react";
import CircularIndeterminate from "./CircularIndeterminate";
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
            <h1>your request has been processed</h1>
        </div>
    );
}   

export default SuccessPage;
