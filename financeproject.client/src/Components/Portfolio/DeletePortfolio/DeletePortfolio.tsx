import React, { SyntheticEvent } from 'react'


interface Props {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}


const DeletePortfolio: React.FC<Props> = ({ portfolioValue, onPortfolioDelete }:Props) => {

    return (
        <div>
            <form onSubmit={onPortfolioDelete}>
                <input hidden={true} readOnly={true} value={portfolioValue} />
                <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500 dark:text-black">
                    X
                </button>
            </form>
        </div>
    )

}

export default DeletePortfolio;