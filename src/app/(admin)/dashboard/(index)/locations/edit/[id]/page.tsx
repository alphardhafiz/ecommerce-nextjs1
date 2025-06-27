import React from 'react'
import FormCategory from '../../_components/form-location'
import { getLocationById } from '../../lib/data';
import { redirect } from 'next/navigation';
import { TEdit } from '@/types';

export default async function EditPage({params}: TEdit) {
  const data = await getLocationById(params.id)
  
  if(!data){
    return redirect('/dashboard/categories')
  }
  
  return (
    <FormCategory type='EDIT' data={data} />
  )
}
