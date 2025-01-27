import React from 'react'
import { CommentGet } from '../../../Models/Comment';


interface Props {
    comment: CommentGet
}


const StockCommentListItem: React.FC<Props> = ({ comment }:Props): JSX.Element => {

    return (
        <div className="relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full  rounded-lg bg-white  dark:bg-darkBg dark:text-white">
            
            <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                    <p className="text-dark text-sm dark:text-gray-500" >@{comment.createdBy}</p>
                    <div className="flex flex-row justify-between">
                        <p className=" relative text-xl whitespace-nowrap truncate overflow-hidden ">
                            {comment.title}
                        </p>
                    </div>
                   
                </div>
            </div>
            <p className="-mt-4 text-gray-500 dark:text-white" >{comment.content}</p>
        </div>
        
    )
}

export default StockCommentListItem;