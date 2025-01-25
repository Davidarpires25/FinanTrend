import React from 'react'
import { CommentGet } from '../../Models/Comment'
import StockCommentListItem from './StockCommentLisItem/StockCommentListItem'


type Props= {
    comments: CommentGet[];

}



const StockCommentList: React.FC<Props> = ({ comments }: Props) : JSX.Element => {

    return (
        <>
            {comments ? comments.map((comment) => {
                return <StockCommentListItem comment={comment}></StockCommentListItem>
            
            
            }):""}
            
        </>
        
    )
}


export default StockCommentList;