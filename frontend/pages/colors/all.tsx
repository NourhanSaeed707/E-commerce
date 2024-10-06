import ListColors from '@/components/colors/list-colors'
import { checkUserAuthentication } from '@/utils/checkUserAuthentication';
import { GetServerSideProps } from 'next';
import React from 'react'

function GetAllPage() {
  return (
    <div>
        <ListColors/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default GetAllPage;