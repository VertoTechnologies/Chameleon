import React, { useState } from 'react';

const CreateThread: React.FC = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorId: 'user_id', content }),
      });

      if (!response.ok) throw new Error('Error creating thread');

      setContent('');
      // Optionally, refresh thread list here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Post Thread</button>
    </form>
  );
};

export default CreateThread;
