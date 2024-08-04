'use client'

import React, { useState } from 'react';

interface CreateCommentProps {
  threadId: string;
}

const CreateComment: React.FC<CreateCommentProps> = ({ threadId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/api/threads/${threadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authorId: 'user_id', content }), // Replace 'user_id' with actual user ID
      });

      if (response.status === 401) {
        // Unauthorized, handle login or session issue
        setError('You must be logged in to post a comment.');
        return;
      }

      if (!response.ok) throw new Error('Error posting comment');

      // Clear the form and error
      setContent('');
      setError('');
      // Optionally, you might want to trigger a refresh of the comments list
      // e.g., by using a callback function passed as a prop or a state update in the parent component
    } catch (error) {
      setError('An error occurred while posting your comment.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Write a comment..."
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
