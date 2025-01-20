import React, { SyntheticEvent } from 'react'
import "./Card.css"
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortFolio';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    searchResult: CompanySearch;
    onPortFolioCreate:(e: SyntheticEvent )=>void ;
 

};

const Card: React.FC<Props> = ({ id, searchResult, onPortFolioCreate }: Props): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 md:flex-row dark:bg-darkCard" key={id} id={id}>
            <h2 className="font-bold text-center text-black md:text-left dark:text-white">
                <Link to={`/company/${searchResult.symbol}/company-profile`}>{searchResult.name} ({searchResult.symbol})</Link>
            </h2>
            <p className="text-black dark:text-white">{searchResult.currency}</p>
            <p className="font-bold text-black dark:text-white">
                {searchResult.exchangeShortName} - {searchResult.stockExchange}
            </p>
            <AddPortfolio onPortFolioCreate={onPortFolioCreate} symbol={searchResult.symbol}></AddPortfolio>
        </div>
    )
}

export default Card