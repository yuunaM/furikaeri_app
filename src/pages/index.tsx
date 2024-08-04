import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <div className='top jpn_bg'>
            <p className='mizuhiki'><Image src='/mizuhiki.svg' alt='水引' layout='responsive' width={1800} height={200} /></p>
            <div className='flex'>
                <p className='img_wrap'><Image src='/top-img.png' className='top-img' alt='見返り美人' layout='responsive' width={200} height={500} /></p>
                <div>
                    <div className='catch'>
                        <h1>FURIKAERI<br />BIJIN</h1>
                        <p className='sub_catch'>1日を振り返れる人は美しい</p>
                    </div>
                    <Link href='/AddData' className='linkBtn'>さっそく振り返る</Link>
                </div>
            </div>
            <p className='cloud set_left'><Image src='/cloud_left.png' alt='雲' layout='responsive' width={537} height={496} /></p>
            <p className='cloud set_right'><Image src='/cloud_right.png' alt='雲' layout='responsive' width={634} height={537} /></p>
        </div>
    );
}
