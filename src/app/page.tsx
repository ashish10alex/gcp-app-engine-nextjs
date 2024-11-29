"use client"

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {ToogleTheme} from './toogleTheme'

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
    <div className="flex justify-end mt-4 p-4">
      <ToogleTheme/>
    </div>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={getDataFromBigquery}>Get Data from BigQuery</Button>

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