import React from 'react'





  

type Props = {
    config: any
    data:any
}

const RatioList: React.FC<Props> = ({ config ,data}:Props): JSX.Element => {
    const renderedRow = config.map((row:any) => {
        return (
            <li className="py-3 sm:py-4 ">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {row.label}
                        </p>
                        <p className="text-sm text-grav-500 dark:text-slate-500 truncate">
                            {row.subTitle && row.subTitle}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {row.render(data)}
                    </div>
                </div>
            </li>
        )

    })
    return (
        <div className="bg-white shadow rounded-lg ml-4 mt-4 mb-4 p-4 sm:p-6 h-full dark:bg-darkBg">
            <ul className="divide-y divided-gray-200">
                {renderedRow}
            </ul>
            
        </div>
    )
}

export default RatioList;