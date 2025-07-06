// src/components/AdminUpload.jsx
import { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      setMessage("Please provide a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      setUploading(true);
      const token = localStorage.getItem("adminToken"); // make sure you store this at login
      const res = await axios.post("http://localhost:5000/api/media/upload", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Upload successful!");
      setFile(null);
      setTitle("");
      setCategory("");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Image/Video</h2>
      {message && <p className="mb-2 text-sm text-center">{message}</p>}

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
