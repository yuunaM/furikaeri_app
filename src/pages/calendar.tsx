import React, { useState, useEffect } from 'react';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dynamic from 'next/dynamic';
import Modal from 'react-modal';
import stampAnimate from '../../public/stamp.json';
import styles from "@/styles/Home.module.css";

Modal.setAppElement('#__next');
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [lastClicked, setLastClicked] = useState<Date | null>(null);
    const [calendarStamp, setCalendarStamp] = useState<any[]>([]);
    const [changeArea, setChangeArea] = useState<JSX.Element | null>(null);

    useEffect(() => {
        const lastClickedTime = localStorage.getItem('lastClickedTime');
        if (lastClickedTime) {
            setLastClicked(new Date(lastClickedTime));
        }

        const savedStamps = localStorage.getItem('calendarStamp');
        if (savedStamps) {
            setCalendarStamp(JSON.parse(savedStamps));
        }

        const clickTime = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(0, 0, 0, 0);

            if (lastClicked) {
                const hoursPassed = (now.getTime() - lastClicked.getTime()) / (1000 * 60 * 60);
                if (hoursPassed >= 24) {
                    setChangeArea(<p className='lottie_wrap'><Lottie animationData={stampAnimate} loop={false} /></p>);
                    const newStamp = { title: 'スタンプ', start: new Date() };
                    const updatedStamps = [...calendarStamp, newStamp];
                    setCalendarStamp(updatedStamps);
                    // ローカルストレージにスタンプ情報を保存
                    localStorage.setItem('calendarStamp', JSON.stringify(updatedStamps));
                } else {
                    setChangeArea(<p>本日分のログインスタンプは終了です</p>);
                }
            } else {
                localStorage.removeItem('lastClickedTime');
                setLastClicked(null);
            }
        };

        clickTime();
        const interval = setInterval(clickTime, 60000);
        return () => clearInterval(interval);
    }, [lastClicked]);

    const clickhandle = () => {
        const now = new Date();
        const lastClickedTime = localStorage.getItem('lastClickedTime');

        if (!lastClickedTime) {
            // 初回クリック時の処理
            setChangeArea(<p className='lottie_wrap'><Lottie animationData={stampAnimate} loop={false} /></p>);
            setCalendarStamp([{ title: 'スタンプ', start: now }]);
        }

        localStorage.setItem('lastClickedTime', now.toString());
        setLastClicked(now);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const renderEventContent = (eventContent: EventContentArg) => {
        return (
            <img src="/stamp.png" alt="スタンプ" style={{ width: '100%', height: '100%' }} />
        );
    };

    return (
        <>
            <button onClick={clickhandle}>LOGIN STAMP</button>
            <Modal isOpen={isModalOpen} onRequestClose={handleClose}>
                {changeArea}
                <button className='ui_btn' onClick={handleClose}>Got it!</button>
            </Modal>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarStamp}
                eventContent={renderEventContent}
            />
        </>
    );
}
