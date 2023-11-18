// useNotification.js
import { useEffect } from 'react';

const useNotification = (data, callback) => {
  useEffect(() => {
    if (data.length > 0) {
      // データが変更されたときに通知サウンドを再生
      const audio = new Audio('/teroren.mp3');
      audio.play();

      // 通知後の追加の処理があれば実行
      if (callback) {
        callback();
      }
    }
  }, [data, callback]);
};

export default useNotification;
