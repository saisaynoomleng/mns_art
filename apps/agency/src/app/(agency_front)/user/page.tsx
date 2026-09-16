'use client';

import { authClient } from '@/lib/authClient';
import React from 'react';

const UserDashboard = () => {
  return (
    <div>
      <button onClick={() => authClient.signOut()}>Log Out</button>
    </div>
  );
};

export default UserDashboard;
