import { Slider } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { generatePkce } from '../util/PkceUtil';
import { writeStringArray } from '../util/fileWriter';

function Bulkgen() {

    const [bulkTokenSize, setBulkTokenSize] = useState<number>(43);
    const [noOfRecords, setNoOfRecords] = useState<number>(6000);

    // const [state, setState] = useState<string>();
    // const [dataArray, setDataArray] = useState<{ cc: string, cv: string }[]>([]);
    // const [lines, setLines] = useState<string[]>(['"Code Challenge","Code Verifier"']);

    const handleBulkTokenSizeChange = (event: Event, newValue: number | number[]): void => {
        setBulkTokenSize(newValue as number)
    }

    const handleNoOfRecordsChange = (event: Event, newValue: number | number[]): void => {
        setNoOfRecords(newValue as number)
    }

    const download = async (): Promise<void> => {
        const dataArray: { cc: string, cv: string }[] = [];
        const lines: string[] = ['"Code Verifier","Code Challenge"'];
        async function handle(i: number) {
            const res = await generatePkce(bulkTokenSize);
            dataArray.push({
                cc: res.codeChallenge,
                cv: res.codeVerifier
            })
            lines.push('"' + res.codeVerifier + '"' + ',' + '"' + res.codeChallenge + '"')
            // console.log(i + '-' + res.codeChallenge + ',' + res.codeVerifier)
            if (i == noOfRecords - 1) {
                // setState('done')
                // setDataArray(dataArray)
                // setLines(lines)
                writeStringArray(lines, 'csv', 'pixie')
            }
        }
        for (let i = 0; i < noOfRecords; i++) {
            handle(i);
        }

    }

    return (
        <div className='md:grid md:grid-cols-12 border-2 p-5 gap-5 hidden'>
            <label className='text-xl font-semibold col-span-12 p-5'>BULK DOWNLOAD</label>
            <label className='col-span-2'>No of records</label>
            <div className='col-span-3'>
                <Slider className="text-primary-text" max={10000} min={1} valueLabelDisplay="on" value={noOfRecords} onChange={handleNoOfRecordsChange} />
            </div>
            <label className='col-span-2'>Random byte size</label>
            <div className='col-span-3'>
                <Slider className="text-primary-text" max={96} min={32} valueLabelDisplay="on" value={bulkTokenSize} onChange={handleBulkTokenSizeChange} />
            </div>
            <button className="col-span-2 border-r-8 border-l-8 bg-button-bg text-button-text p-3 hover:bg-button-bg-hover hover:text-button-text-hover" 
                onClick={download}>
                Download CSV
                {/* <Link className="" href={'/bulk?noOfRecords=' + noOfRecords + '&bulkTokenSize=' + bulkTokenSize} >Download CSV</Link> */}
            </button>
        </div>
    )
}

export default Bulkgen