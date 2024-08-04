import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ThreadList: React.FC = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/threads');
        if (!response.ok) throw new Error('Error fetching threads');
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <ul>
      {threads.map((thread: any) => (
        <li key={thread._id}>
          <Link href={`/Thread/${thread._id}`}>
            <a>{thread.content}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ThreadList;
