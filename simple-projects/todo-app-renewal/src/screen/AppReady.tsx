import { FC, memo, useCallback, useState } from 'react';
import AppLoading from 'expo-app-loading';

import { icon } from '../theme';
import { cacheImages } from '../api/cache';
import SplashScreen from './SplashScreen';

interface ISplash {
  onComplete: (isComplete: boolean) => void;
}

const AppReady: FC<ISplash> = ({ onComplete }) => {
  const [isPreloading, setIsPreloading] = useState(false);

  const startAsync = useCallback(async () => {
    await Promise.all<any>([...cacheImages(icon)]);
  }, []);

  const onFinish = useCallback(async () => {
    setIsPreloading(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });

    onComplete(true);
  }, [onComplete]);

  return isPreloading ? (
    <SplashScreen />
  ) : (
    <AppLoading
      startAsync={startAsync}
      onFinish={onFinish}
      onError={console.warn}
    />
  );
};

export default memo(AppReady);
