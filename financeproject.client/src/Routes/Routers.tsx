import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import HomePage from "../Pages/HomePage/HomePage"
import SearchPage from "../Pages/SearchPage/SearchPage"
import CompanyPage from "../Pages/CompanyPage/CompanyPage"
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile"
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement"
import DesingPage from "../Pages/DesingPage/DesingPage"
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet"
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement"
import LoginPage from "../Pages/LoginPage/LoginPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:"",element:<HomePage/>
            },
            {
                path: "login", element: <LoginPage />
            },
            {
                path: "search", element: <SearchPage />
            },
            {
                path: "desing-guide", element: <DesingPage />
            },
            {

                path: "company/:ticker", element: <CompanyPage />,
                children: [
                    {
                      path: "company-profile", element:<CompanyProfile/>

                    },
                    {
                      path: "income-statement", element:<IncomeStatement/>

                    },
                    {
                        path: "balance-sheet", element: <BalanceSheet />

                    },
                    {
                        path: "cashflow-statement", element: <CashflowStatement />

                    }
                ]
            }
            

        ]
            
    }


])