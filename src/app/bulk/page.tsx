'use client'

import { useEffect, useState } from "react";
import { generatePkce } from "../util/PkceUtil";
import { NextResponse } from "next/server";
import { writeStringArray } from "../util/fileWriter";
import Link from "next/link";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

function GenPage() {


    const router: ReadonlyURLSearchParams = useSearchParams()

    console.log(router.get('noOfRecords'))
    console.log(router.get('bulkTokenSize'))

    const noOfRecords: number = router.get('noOfRecords') ? Number(router.get('noOfRecords')) : 1000;
    const bulkTokenSize: number = router.get('bulkTokenSize') ? Number(router.get('bulkTokenSize')) : 43;

    const [state, setState] = useState<string>();
    const [dataArray, setDataArray] = useState<{ cc: string, cv: string }[]>([]);
    const [lines, setLines] = useState<string[]>(['"Code Challenge","Code Verifier"']);

    useEffect(() => {

        const dataArray: { cc: string, cv: string }[] = [];
        async function handle(i: number) {
            const res = await generatePkce(bulkTokenSize);
            dataArray.push({
                cc: res.codeChallenge,
                cv: res.codeVerifier
            })
            lines.push('"' + res.codeVerifier + '"' + ',' + '"' + res.codeChallenge + '"')
            console.log(i + '-' + res.codeChallenge + ',' + res.codeVerifier)
            if (i == noOfRecords - 1) {
                setState('done')
                setDataArray(dataArray)
                setLines(lines)
                writeStringArray(lines, 'csv', 'pixie')
            }
        }
        for (let i = 0; i < noOfRecords; i++) {
            handle(i);
        }
    }
        , []);


    return (
        <div className="h-[100vh] flex flex-col gap-5 items-center text-center align-middle justify-center bg-background-bg">
            Bulk csv generation - {state}. No of records - {dataArray?.length}
            <button>
                <Link href="/">
                    Go Back
                </Link>
            </button>
        </div>
    );
}

export default GenPage;