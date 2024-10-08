import React from 'react'
import  MainContent  from './main-content';
import { HOME } from '../../constants/home';

function ContentWomen() {
  return (
    <div>
        <MainContent image='/images/womenshop.jpg' titleButton={HOME.SHOP_WOMEN_BUTTON} title = {HOME.WOMEN_TITLE}/>
    </div>
  )
}

export default ContentWomen;