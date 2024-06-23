'use client'

import { useEffect, useState } from "react";
import { generatePkce } from "../util/PkceUtil";
import { NextResponse } from "next/server";

function GenPage() {

    const [cv, setCV] = useState<string>();
    const [cc, setCC] = useState<string>();

    useEffect(() => {
        const res = generatePkce();
        res.then(data => {
            setCV(data.codeVerifier)
            setCC(data.codeChallenge)
        }
        );
    }, []);

    return JSON.stringify( {
            codeVerifier: cv,
            codeChallenge: cc
    });
}

export default GenPage;