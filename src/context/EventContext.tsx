import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface Event { // ステート'events'配列の型定義 => { title: 'スタンプ', start: now }
    title: string;
    start: Date;
}

export interface EventContextType {
    events: Event[]; // Eventの型を'events'に反映
    setEvents: Dispatch<SetStateAction<Event[]>>; // 状態更新関数'setEvents'の型定義 この場合はEvent型
}

// createContextを使ってコンテキストを作成し型宣言 'EventContextType'もしくは'undefined'の型になる 初期値は'undefined' 
export const EventContext = createContext<EventContextType | undefined>(undefined);

// EventProvider関数の定義
// このコンポーネントは引数'children'を受け取り、型は'ReactNode'
// 'children'とはEventProvider内に含まれる子要素
export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<Event[]>([]); // 全体で共有したいステート 型はEvent型で初期値は空配列

    return (
        <EventContext.Provider value={{ events, setEvents }}> {/* 'events','setEvents'を共有 */}
            {children}
        </EventContext.Provider>
    );
};
