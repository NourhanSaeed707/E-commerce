import AddSize from '@/components/sizes/AddSize'
import { checkUserAuthentication } from '@/utils/checkUserAuthentication';
import { GetServerSideProps } from 'next';
import React from 'react'

function AddPage() {
  return (
    <div>
      <AddSize/>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default AddPage;
