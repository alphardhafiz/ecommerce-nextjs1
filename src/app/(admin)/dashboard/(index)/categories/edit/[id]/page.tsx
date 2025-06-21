import React from 'react'
import FormCategory from '../../_components/form-category'
import { getCategoryById } from '../../lib/data';
import { redirect } from 'next/navigation';

type Tparams = {
  id: string;
}

interface EditPageProps {
  params: Tparams
}

export default async function EditPage({params}: EditPageProps) {
  const data = await getCategoryById(params.id)
  
  if(!data){
    return redirect('/dashboard/categories')
  }
  
  return (
    <FormCategory type='EDIT' data={data} />
  )
}
