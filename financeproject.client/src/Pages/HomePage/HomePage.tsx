import React from 'react'
import Hero from '../../Components/Hero/Hero';


interface Props { }


const HomePage: React.FC<Props> = (props: Props):JSX.Element => {

    return (
        <div >
            <Hero></Hero>
        </div>
    )

}


export default HomePage;