'use client'

import { useEffect, useState } from "react";
import { generatePkce } from "../util/PkceUtil";
import { NextResponse } from "next/server";
import { writeStringArray } from "../util/fileWriter";
import Link from "next/link";

function GenPage() {
    const limit: number = 1000;

    const [state, setState] = useState<string>();
    const [dataArray, setDataArray] = useState<{ cc: string, cv: string }[]>([]);
    const [lines, setLines] = useState<string[]>(['"Code Challenge","Code Verifier"']);

    useEffect(() => {

        const dataArray: { cc: string, cv: string }[] = [];
        async function handle(i: number) {
            const res = await generatePkce();
            dataArray.push({
                cc: res.codeChallenge,
                cv: res.codeVerifier
            })
            lines.push('"' + res.codeVerifier + '"' + ',' + '"' + res.codeChallenge + '"')
            console.log(i + '-' + res.codeChallenge + ',' + res.codeVerifier)
            if (i == limit - 1) {
                setState('done')
                setDataArray(dataArray)
                setLines(lines)
                writeStringArray(lines, 'csv', 'pixie')
            }
        }
        for (let i = 0; i < limit; i++) {
            handle(i);
            // res.then(data => {
            //     dataArray.push({
            //         cc: data.codeChallenge,
            //         cv: data.codeChallenge
            //     })
        }
        // for (let i =0 ; i< 100;i++) {
        //     console.log(dataArray[i]?.cv + ',' + dataArray[i]?.cc)
        // }
    }
        , []);




    return (
        <div className="h-[100vh] flex flex-row-2 items-center text-center align-middle justify-center bg-background-bg">
            Bulk csv generation - {state}. No of records - {dataArray?.length}
        </div>
    );
}

export default GenPage;