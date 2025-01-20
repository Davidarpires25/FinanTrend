import React from 'react'

import Table from '../../Components/Table/Table';
import RatioList from '../../Components/RatioList/RatioList';
import { testIncomeStatementData } from '../../Components/Table/TestData';
interface Props{
}
const tableConfig = [
    {
        label: "Market Cap",
        render: (company: any) => company.marketCapTTM,
        subTitle: "Total value of all a company's shares of stock",
    }
]

const DesingPage: React.FC<Props> = ():JSX.Element => {
    return (
        <div>
            <h1>FinShark Desing Page:</h1>
            <h2>Aqui encontrara varios aspectos del diseño del proyecto</h2>
            <RatioList data={testIncomeStatementData} config={tableConfig} />
            <Table data={testIncomeStatementData} configs={tableConfig}></Table>
        </div>
    )



}

export default DesingPage;

