'use client';

import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserDashboard = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push('/');
              },
            },
          })
        }
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDashboard;
