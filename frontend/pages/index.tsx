import React from 'react'
import Navbar  from '../components/layout/Navbar';
import ContentWomen  from '../components/Home/ContentWomen';
import ContentMen  from '../components/Home/ContentMen';

 function Home() {
   return (
     <main>
        <Navbar />
        <ContentWomen />
        <ContentMen />
    </main>
   )
 }
 
 export default Home;