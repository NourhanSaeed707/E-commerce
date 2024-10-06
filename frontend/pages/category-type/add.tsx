import AddCategory from '@/components/category-type/add-category'
import { checkUserAuthentication } from '@/utils/checkUserAuthentication';
import { GetServerSideProps } from 'next';
import React from 'react'

function Add() {
  return (
    <AddCategory/>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default Add;
