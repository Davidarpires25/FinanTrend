
import { toast } from "react-toastify";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { CommentGet } from "../../Models/Comment";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
    symbol: string;
};

type CommentFormInputs = {
    title: string;
    content: string;

}

const StockComment = ({ symbol }: Props) => {
    const [comments, setComments] = useState<CommentGet[]>();
    const [loading, setLoading] = useState<boolean>();


    const getComments = async () => {
        setLoading(true)
        await commentGetAPI(symbol).then((response) => {
            setLoading(false);
            
            setComments(response?.data);
        })

    }
    useEffect(() => {
        getComments();
    },[])


    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, symbol).then((response) => {
            if (response) {
                toast.success("Comment Create Successfully")
                getComments();
            }
        }).catch((e)=>{
            toast.warning(e);
        });

    }
    return (
        <div className="flex flex-col w-[600px] ">
            <StockCommentForm symbol={symbol} handleComment={handleComment} />
            {loading ? <Spinner /> : <StockCommentList comments={comments!}/>}
            
        </div>
    );
};

export default StockComment;