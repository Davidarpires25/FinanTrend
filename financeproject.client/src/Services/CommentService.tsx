import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handleError } from "../Helpers/HandlerError";


const api = "https://localhost:7211/api/Comment/";


export const commentPostAPI = async (title: string, content: string, symbol: string) => {
    try {

        const data = await axios.post<CommentPost>(api + `${symbol}`, {
            title: title,
            content: content,
        });

        return data;
    } catch (error) {

        handleError(error);
    }
};


export const commentGetAPI = async (symbol: string) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {

        const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`,config);

        return data;
    } catch (error) {

        handleError(error);
    }
};