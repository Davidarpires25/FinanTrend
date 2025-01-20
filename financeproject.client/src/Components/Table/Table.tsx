import React from 'react'


type Props = {
    data: any,
    configs:any
}






const Table: React.FC<Props> = ({data,configs}: Props):JSX.Element => {

    const renderRow = data.map((company:any) => {

        return (
            <tr key={company.cik}>
                {configs.map((val: any) => {
                    return (<td className="p-3 dark:text-white">{val.render(company)}</td>

                    );

                })}
            </tr>
        )

    });

    const renderedHeaders = configs.map((config:any) => {
        return (
            <th className="p-4 text-left text-xs font-medium text-fray-500 uppercase tracking-wider dark:text-white dark:bg-darkCard"
                key={config.label}>{config.label}</th>
        );

    });

    return (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-darkBg">
            <table className="min-w-full divide-y divide-gray-200 m-5">
                <thead className="bg-gray-50">
                    {renderedHeaders}
                </thead>
              
                <tbody>
                    {renderRow}
                </tbody>
            </table>
        </div>
    )
    
}


export default Table;