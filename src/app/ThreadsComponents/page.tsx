import React from 'react';
import CreateThread from './CreateThread';
import ThreadList from './ThreadList';


const ThreadsPage = () => {
  return (
    <div>
      <h1>Threads</h1>
      <CreateThread />
      <ThreadList />
    </div>
  );
};

export default ThreadsPage;
