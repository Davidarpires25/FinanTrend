import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getCashFlowStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../Helpers/NumberFormatting';

interface Props{}

const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.operatingCashFlow),
    },
    {
        label: "Investing Cashflow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.netCashUsedForInvestingActivites),
    },
    {
        label: "Financing Cashflow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(
                company.netCashUsedProvidedByFinancingActivities
            ),
    },
    {
        label: "Cash At End of Period",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.cashAtEndOfPeriod),
    },
    {
        label: "CapEX",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.capitalExpenditure),
    },
    {
        label: "Issuance Of Stock",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.commonStockIssued),
    },
    {
        label: "Free Cash Flow",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.freeCashFlow),
    },
];

const CashflowStatement: React.FC<Props> = ({prop}:Props): JSX.Element => {
    const ticker = useOutletContext<string>();
    const [cashflowStatement, setCashflowStatement] = useState<CompanyCashFlow[]>()

    useEffect(() => {

        const getCompanyCashFlow = async () => {
            const value = await getCashFlowStatement(ticker!)
            setCashflowStatement(value!.data);
        }
        getCompanyCashFlow();
    }, [ticker])


    return (

        <>
            {cashflowStatement ? (
                <Table data={cashflowStatement} configs={config} />
            
            ): (
                 <Spinner />
            )}

        </>

    )



}

export default CashflowStatement;