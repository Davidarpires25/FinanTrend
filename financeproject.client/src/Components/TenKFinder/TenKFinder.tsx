import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../company';
import TenKFinderItem from './TeknFinderItem/TenkFinderItem';
import Spinner from '../Spinner/Spinner';
import { getTenK } from '../../api';


interface Props {
    ticker: string;

}


const TenKFinder: React.FC<Props> = ({ ticker }: Props): JSX.Element => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>()

    useEffect(() => {
        const getCompanyTenK = async () => {
            const value = await getTenK(ticker!);
            setCompanyData(value?.data);
        }
        getCompanyTenK();

    }, [])

    return (
        <div className="inline-flex rounded-md shadow-sm m-4" role="group">
            {companyData ? (
                companyData?.slice(0, 5).map((tenK) => {
                    return <TenKFinderItem tenK={tenK} />;
                })
            ) : (
                <Spinner />
            )}
        </div>
    );
};


export default TenKFinder;