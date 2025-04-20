import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const API_URL = import.meta.env.VITE_API_URL;
const CommentsSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://backend-service-m0q3.onrender.com/api/comments/${taskId}`,{withCredentials:true});
      setComments(res.data);
      console.log(comments);
    } catch (err) {
      console.error('Fetching comments error:', err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`https://backend-service-m0q3.onrender.com/api/comments/${taskId}`, {withCredentials:true,
        headers: {
          'Content-Type': 'application/json',
        },
      },{
        content: newComment
      },{
        content: newComment,
      });
      setComments((prev) => [...prev, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Add comment error:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments</h4>

      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment._id} className="border p-2 rounded bg-gray-50">
            <p className="text-sm text-black"><strong className="text-black">{comment.user?.name}</strong>: {comment.content}</p>
            <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="flex-1 border text-black rounded px-3 py-1"
        />
        <button onClick={handleAddComment} className="bg-blue-500 text-white px-3 py-1 rounded">
          Post
        </button>
      </div>
    </div>
  );
};

CommentsSection.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default CommentsSection;