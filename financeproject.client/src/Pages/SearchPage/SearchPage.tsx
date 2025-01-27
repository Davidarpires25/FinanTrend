import { ChangeEvent, SyntheticEvent,useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CompanySearch } from "../../company";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { PortfolioGet } from "../../Models/Portfolio";
import { searchCompanies } from "../../api";
import { portfolioGetAPI, portfolioAddAPI, portfolioDeleteAPI } from "../../Services/PortfolioService";






const SearchPage: React.FC = (): JSX.Element => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        getPortfolio();
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const getPortfolio = () => {
        portfolioGetAPI()
            .then((res) => {
                if (res?.data) {
                    setPortfolioValues(res.data);
                }
            })
            .catch((e) => {
                console.log(e)
                setPortfolioValues(null);
            });
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        portfolioAddAPI(e.target[0].value)
            .then((res) => {
         
                    toast.success("Stock added to portfolio!",res);
                    getPortfolio(); // Actualiza el portafolio después de agregar
                
            })
            .catch((e) => {
                toast.warning("Could not add stock to portfolio!", e.message);
            });
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteAPI(e.target[0].value).then((res) => {
            if (res?.status === 200) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio(); // Actualiza el portafolio después de eliminar
            }
        });
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };

    return (
        <div className= " min-h-screen">
            <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange} />
            <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
            <CardList searchResults={searchResult} onPortFolioCreate={onPortfolioCreate} />
            {serverError && <div className="dark:text-white">Unable to connect to API</div>}
        </div >
    );
};

export default SearchPage;

