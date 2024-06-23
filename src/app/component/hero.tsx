'use client'
import React, { useState } from 'react'
import { generatePkce, generatePkceFromString } from '../util/PkceUtil';

const hero = () => {
    const [codeVerifier, setCodeVerifier] = useState<string>();
    const [codeChallenge, setCodeChallenge] = useState<string>();

    const [codeVerifierInput, setCodeVerifierInput] = useState<string>('');


    const generate = async (): Promise<void> => {
        const { codeVerifier, codeChallenge } = await generatePkce();
        setCodeVerifier(codeVerifier)
        setCodeChallenge(codeChallenge)
        console.log("Code Verifier:", codeVerifier);
        console.log("Code Challenge:", codeChallenge);
    }

    const generateChallenge = async (): Promise<void> => {
        const { codeVerifier, codeChallenge } = await generatePkceFromString(codeVerifierInput);
        setCodeVerifier(codeVerifier)
        setCodeChallenge(codeChallenge)
        console.log("Code Verifier:", codeVerifier);
        console.log("Code Challenge:", codeChallenge);
    }

    const valueChanged = (value: number): void => {
        console.log("valueChanged:", valueChanged);
    }

    const textChanged = (event: any) => {
        setCodeVerifierInput(event.target.value);
    }

    return (
        <div className="border-2 border-red-400 grid grid-cols-3 items-center h-[750px] sm:h-[76vh] overflow-auto">
            <section className='col-span-3 border-2 border-red-700 grid grid-col-3'>
                <div className="">
                </div>
                <div className='col-span-3 items-center text-center'>
                    <button onClick={generate}>Generate New</button>
                </div>
                <div className='col-span-3'>
                    <label>Code verifier</label>
                    {codeVerifier && <label> ({codeVerifier?.length} chars)</label>}
                    <textarea className='w-full border-r-4 border-gray-800' value={codeVerifier}></textarea>
                </div>
                <div className='col-span-3'>
                    <label>Code challenge</label>
                    {codeChallenge && <label> ({codeChallenge?.length} chars)</label>}
                    <textarea className='w-full border-r-4 border-gray-500' value={codeChallenge}></textarea>
                </div>
            </section>
            <section className='col-span-3 border-2'>
                Already got a Verifier?
                <div className='col-span-3 items-center text-center'>
                    <button onClick={generateChallenge} >Get Challenge</button>
                    <textarea className='w-full border-r-4 border-gray-800' value={codeVerifierInput} onChange={textChanged}></textarea>
                </div>
            </section>
        </div>
    )
}

export default hero