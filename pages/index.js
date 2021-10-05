import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../components/Auth';
import LoadingScreen from '../components/LoadingScreen';

export default function Home() {
  const [auth] = useAuth();
  const router = useRouter();

  useEffect(() => {
    auth.user ? router.push('/schedule') : router.push('/login');
  },[auth.user])

  return (
    <LoadingScreen />
  )
}
