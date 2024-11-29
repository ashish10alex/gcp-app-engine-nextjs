"use client"

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {ToogleTheme} from './toogleTheme'
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);

  const { toast } = useToast()

  const getDataFromBigquery = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/get_data_from_bigquery');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
  }

  const updateDataInBigQuery = async() => {
    try{
      const update = {
        new: qty
      }
      toast({
        title: "Updating data in BigQuery",
        description: `Setting quantity to ${qty}`,
      })
      const response = await axios.post('/api/update_data_in_bigquery', update);
      toast({
        title: "Updated data in BigQuery",
        description: `Set quantity to ${qty}`,
      })
    } catch (error){
        console.error(`Error updating data`, error)
    }
  }

  const updateQty = async (quantity:string) => {
    setQty(Number(quantity))
  }

  return (
    <>
    <div className="flex justify-end mt-4 p-4">
      <ToogleTheme/>
    </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

    <div className='flex flex-col space-y-4'>
      <Input placeholder='New quantity' onChange={(e) => {updateQty(e.target.value)}} />
      <div className='flex space-x-4'>
        <Button onClick={getDataFromBigquery}>Get Data from BigQuery</Button>
        <Button onClick={updateDataInBigQuery}>Update Data in BigQuery</Button>
      </div>
    </div>

      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <pre>Data from API: {JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data loaded yet.</p>
      )}
    </div>
    </>
  );
}