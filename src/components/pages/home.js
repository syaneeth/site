import '../../App.css';
import React from 'react';
import MainSection from '../mainSection';
import Cards from '../cards';
import Footer from '../Footer';

function Home() {
    return (
        <>
            <MainSection/>
            <Cards />
            <Footer />
        </>
    );
}

export default Home;