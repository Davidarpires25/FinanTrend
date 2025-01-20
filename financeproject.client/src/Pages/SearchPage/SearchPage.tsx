import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { searchCompanies } from '../../api';
import { CompanySearch } from '../../company';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/ListPortfolio/ListPortfolio';
import Search from '../../Components/Search/Search';


interface Props {
}

const SearchPage: React.FC<Props> = (): JSX.Element => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([])
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);

        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data)
        }
        
    }

    const onPortFolioCreate = (e: any) => {
        e.preventDefault();

        const exist = portfolioValues.find((value) => value === e.target[0].value);
        if (exist) return;
        const updatePortfolio = [...portfolioValues, e.target[0].value]
        setPortfolioValues(updatePortfolio);
        

    }

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        const removed = portfolioValues.filter((value) => {
            return value !== e.target[0].value
        })
        setPortfolioValues(removed);
    }


    return (
        <>

            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}></Search>
           
            <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete}></ListPortfolio>
            <CardList searchResults={searchResult} onPortFolioCreate={onPortFolioCreate}></CardList>
            {serverError && <div className="dark:text-white">Unable to connect to API</div>}

        </>
    )
}

export default SearchPage;