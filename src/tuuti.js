import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import db from './firebase';
import useNotification from './sound';

function time() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; 
  const day = today.getDate();
  const formattedDate = year + "-" + month + "-" + day;
  return formattedDate;
}

function Tikoku() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(collection(db, '遅刻'), time()), (snapshot) => {
      const newData = snapshot.exists() ? {...snapshot.data() } : null;
      setData(newData ? [newData] : []);
    });

    return () => {
      // コンポーネントがアンマウントされるときにunsubscribe
      unsubscribe();
    };
  }, []); // useEffectを一度だけ実行するための空の依存リスト
  console.log(data)
  useNotification(data);
  return (
    <div>
      <p>遅刻</p>
      <ul>
        {data.map((item) => (
          // 各フィールドの値を順番に表示
          Object.values(item).map((value, index) => (
            //<li key={index}>{value}</li>
            <p className='waku'>{value}さん　打刻を忘れていませんか？</p>
          ))
        ))}
      </ul>
    </div>
  );
}

function Zangyo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(collection(db, '残業'), time()), (snapshot) => {
      const newData = snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
      setData(newData ? [newData] : []);
    });

    return () => {
      // コンポーネントがアンマウントされるときにunsubscribe
      unsubscribe();
    };
  }, []); // useEffectを一度だけ実行するための空の依存リスト
  useNotification(data);
  return (
    <div>
      <p>残業</p>
      <ul>
        {data.map((item) => (
          // 各フィールドの値を順番に表示
          Object.values(item).map((value, index) => (
            <li key={index}>{value}</li>
          ))
        ))}
      </ul>
    </div>
  );
}

export { Tikoku, Zangyo };
