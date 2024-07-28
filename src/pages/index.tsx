import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <div className='top'>
            <div className='flex'>
                <Image src='/top-img.png' className='top-img' alt='見返り美人' width={200} height={500} />
                <div>
                    <div className='catch'>
                        <h1>振り返り美人</h1>
                        <p>1日を振り返れる人は美しい</p>
                    </div>
                    <Link href='/AddData' className='linkBtn'>さっそく振り返ってみる</Link>
                </div>
            </div>
        </div>
    );
}
