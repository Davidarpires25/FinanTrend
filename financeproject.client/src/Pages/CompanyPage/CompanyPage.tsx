import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CompanyProfile } from '../../company';
import { getCompanyProfile } from '../../api';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Tile from '../../Components/Tile/Tile';
import Spinner from '../../Components/Spinner/Spinner';
import CompFinder from '../../Components/CompFinder/CompFinder';
import TenKFinder from '../../Components/TenKFinder/TenKFinder';


interface Props {

}

const CompanyPage: React.FC<Props> = (props: Props): JSX.Element => {
    const { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();


    


    useEffect(() => {
        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker!);
            setCompany(result?.data[0]);


        }
        getProfileInit();
    }, [ticker])
    

    return (
        <div>
            {company ? (
                <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden dark:bg-darkBg">

                  <Sidebar></Sidebar>
                    <CompanyDashboard ticker={ticker!}>
                        <Tile title="Company Title" subTitle={company.companyName}></Tile>
                        <Tile title="Price" subTitle={'$' + company.price.toString()}></Tile>
                        <Tile title="DCF" subTitle={"$" + company.dcf.toString()}></Tile>
                        <Tile title="Sector" subTitle={company.sector}></Tile>
                        <CompFinder ticker={company.symbol} />
                        <TenKFinder ticker={company.symbol} />
                        <p className="bg-white shadow rounded text.medium text-gray-900 p-3 mt-1 mt-4  dark:bg-darkBg dark:text-white">
                            {company.description}
                        </p>

                    </CompanyDashboard>

                </div>
            
            ) : (
                <Spinner />
            
            )}

        </div>
    )
}


export default CompanyPage;