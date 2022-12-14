import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { iResults } from '../unsplash_type';
import { API_URL, API_KEY } from '../config';

import { Header, SecArchitecture, SecHero, SecInterior, SecPeople } from '../components';

interface iProps {
    architectures: iResults[]
    interiors: iResults[]
    peoples: iResults[]
}

const Home:NextPage<iProps>= ({architectures, interiors, peoples}) => {
    
    return (
        <main>
            <Head><title>Home</title></Head>
            <SecHero />    
            <Header />    
            <SecArchitecture architectures={architectures} />    
            <SecInterior interiors={interiors} />    
            <SecPeople peoples={peoples} />    
        </main>
    )

}
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {

    const start = new Date().getTime();

    let architecture = await fetch(`${API_URL}/search/photos?query=architecture&per_page=6&client_id=${API_KEY}`);

    let interior = await fetch(`${API_URL}/search/photos?query=interior&per_page=4&client_id=${API_KEY}`);

    let people = await fetch(`${API_URL}/search/photos?query=people&per_page=8&client_id=${API_KEY}`);
    
    const [architectures, interiors, peoples] = await Promise.all([architecture.json(), interior.json(), people.json()]);

    console.log((new Date().getTime() - start) / 1000, "seconds taken");

    return {
        props: {
            architectures: architectures.results,
            interiors: interiors.results,
            peoples: peoples.results,
        }
    }

}