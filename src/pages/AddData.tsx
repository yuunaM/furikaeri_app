import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Loading from '../components/loading';

export default function AddData() {
    const [loading, setLoading] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [radio, setRadio] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    useEffect(() => {
        if (comment && radio) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [comment, radio]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, 'data'), {
                comment: comment,
                feeling: radio,
                createdAt: serverTimestamp()
            });
        } finally {
            setLoading(false);
            setComment('');
            setRadio(0);
            console.log('完了');
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className='addArea'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>今日の心持ち</h3>
                            <label>
                                <input type='radio' name='feeling' value={1} onChange={(e) => setRadio(Number(e.target.value))} checked={radio === 1} />良き哉
                            </label>
                            <label>
                                <input type='radio' name='feeling' value={2} onChange={(e) => setRadio(Number(e.target.value))} checked={radio === 2} />凡庸
                            </label>
                            <label>
                                <input type='radio' name='feeling' value={3} onChange={(e) => setRadio(Number(e.target.value))} checked={radio === 3} />忌まわしい
                            </label>
                        </div>
                        <div>
                            <h3>今日の振り返り</h3>
                            <textarea style={{ width: '300px', height: '100px' }} onChange={(e) => setComment(e.target.value)} placeholder='まこと由々しき事態'></textarea>
                        </div>
                    </form>
                    <button type='submit' onClick={handleSubmit} disabled={!isFormValid} className='linkBtn'>データを遣わす</button>
                </div>
            )}
        </>
    );
}