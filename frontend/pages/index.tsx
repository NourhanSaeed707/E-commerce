import React from 'react'
import Navbar  from '@/components/layout/Navbar';
import ContentWomen  from '@/components/Home/content-women';
import ContentMen  from '@/components/Home/content-men';

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