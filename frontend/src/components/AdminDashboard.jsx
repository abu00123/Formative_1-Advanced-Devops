import React, { useState, useEffect } from 'react';
import { Edit, Trash, X } from 'lucide-react';

function AdminDashboard() {
  const [archives, setArchives] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingArchive, setEditingArchive] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [category, setCategory] = useState('Poetry');
  const [century, setCentury] = useState('20th Century');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');

  const categories = ['Poetry', 'Traditions', 'History', 'Research'];
  const centuries = ['19th Century', '20th Century', '21st Century'];

  const fetchAuthors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArchives = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/archives');
      const data = await res.json();
      setArchives(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchArchives();
  }, []);

  const resetForm = () => {
    setEditingArchive(null);
    setTitle('');
    setAuthorId('');
    setCategory('Poetry');
    setCentury('20th Century');
    setCoverUrl('');
    setContent('');
  };

  const handleEditClick = (archive) => {
    setEditingArchive(archive);
    setTitle(archive.title || '');
    setAuthorId(archive.author_id || '');
    setCategory(archive.category || 'Poetry');
    setCentury(archive.century || '20th Century');
    setCoverUrl(archive.cover_url || '');
    setContent(archive.content || '');
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this archive?')) return;
    setError('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/archives/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }

      setSuccessMsg('Archive deleted successfully');
      fetchArchives();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('token');
      const method = editingArchive ? 'PUT' : 'POST';
      const url = editingArchive
        ? `http://localhost:5000/api/archives/${editingArchive.id}`
        : 'http://localhost:5000/api/archives';

      const payload = {
        title,
        author_id: authorId ? parseInt(authorId) : null,
        category,
        century,
        cover_url: coverUrl,
        content
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save archive');
      }

      setSuccessMsg(editingArchive ? 'Archive updated successfully' : 'Archive created successfully');
      resetForm();
      fetchArchives();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 p-8 grid grid-cols-12 gap-8">
      <div className="col-span-12 md:col-span-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col space-y-4 h-fit">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
            {editingArchive ? 'Edit Archive' : 'Add New Archive'}
          </h3>
          {editingArchive && (
            <button onClick={resetForm} className="text-gray-400 hover:text-charcoal">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
        {successMsg && <p className="text-xs text-green-500 font-semibold">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Author
            </label>
            <select
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue"
            >
              <option value="">Select Author</option>
              {authors.map((auth) => (
                <option key={auth.id} value={auth.id}>
                  {auth.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                Century
              </label>
              <select
                value={century}
                onChange={(e) => setCentury(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue"
              >
                {centuries.map((cen) => (
                  <option key={cen} value={cen}>
                    {cen}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Document Text Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-charcoal outline-none focus:border-brand-blue font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-charcoal hover:bg-gray-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            {editingArchive ? 'Update Archive' : 'Create Archive'}
          </button>
        </form>
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col space-y-4">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
          Archives Catalog
        </h3>

        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Title</th>
                <th className="px-6 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Author</th>
                <th className="px-6 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Category</th>
                <th className="px-6 py-3 text-[10px] text-gray-400 uppercase tracking-wider font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-charcoal">
              {archives.map((arc) => (
                <tr key={arc.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-semibold">{arc.title}</td>
                  <td className="px-6 py-4 text-gray-500">{arc.author_name || 'Unknown'}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-brand-blue text-[10px] font-semibold">
                      {arc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditClick(arc)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-charcoal transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(arc.id)}
                        className="p-1 hover:bg-red-50 rounded text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
