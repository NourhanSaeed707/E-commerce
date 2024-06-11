import React from 'react'
import  MainContent  from './MainContent';
import { HOME } from '../../constants/home';

function ContentMen() {
  return (
 
   <div>
       <MainContent image='/images/manshop.jpg' titleButton={HOME.SHOP_MEN_BUTTON} title = {HOME.MEN_TITLE}/>
   </div>
  )
}

export default ContentMen;