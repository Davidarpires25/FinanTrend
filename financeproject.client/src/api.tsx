import axios from 'axios'
import { CompanyBalanceSheet, CompanyCashFlow, CompanyCompData, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch, CompanyTenK } from './company';

interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
        `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An expected error has occured.";
    }
  }
}; 
          
    
export const getCompanyProfile = async (query:string) => {
    try {
        const data = await axios.get<CompanyProfile>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );

        return data;
    }
    catch (error: any) {
        console.log("Error message from API:",error.message)
    }
}


export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );
       
        return data;
    }
    catch (error: any) {
        console.log("Error message from API:", error.message)
    }
}

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?period=annual&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );

        return data;
    }
    catch (error: any) {
        console.log("Error message from API:", error.message)
    }
}

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?period=annual&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );

        return data;
    }
    catch (error: any) {
        console.log("Error message from API:", error.message)
    }
}

export const getCashFlowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?period=annual&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );

        return data;
    }
    catch (error: any) {
        console.log("Error message from API:", error.message)
    }
}

export const getCompData = async (query: string) => {
    try {
        const data = await axios.get<CompanyCompData[]>(
            `https://financialmodelingprep.com/api/v3/stock_peers?symbol=${query}&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );

        return data;
    }
    catch (error: any) {
        console.log("Error message from API:", error.message)
    }
}


export const getTenK = async (query: string) => {
    try {
        const data = await axios.get<CompanyTenK[]>(
            `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};

export const getHistoricalDividend = async (query: string) => {
    try {
        const data = await axios.get<CompanyHistoricalDividend>(
            `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${query}?apikey=rMs8Nqnv02GzhIMaoKRCAWRAnG7yu2mu`
        );
        return data;
    } catch (error: any) {
        console.log("error message: ", error.message);
    }
};