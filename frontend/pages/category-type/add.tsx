import AddCategory from '@/components/category-type/AddCategory'
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
