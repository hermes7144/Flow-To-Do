import React from 'react';
import { SyncLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className='flex items-center justify-center' style={{ height: 'calc(100vh - 57px)' }}>
      <SyncLoader color='#fe5a4a' />
    </div>
  );
}
