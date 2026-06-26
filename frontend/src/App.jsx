import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import HeroCard from './components/HeroCard';
import AuthorCarousel from './components/AuthorCarousel';
import RecentRequests from './components/RecentRequests';
import AuthorCard from './components/AuthorCard';
import ArchiveCard from './components/ArchiveCard';
import DocumentReader from './components/DocumentReader';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [archives, setArchives] = useState([]);
  const [requests, setRequests] = useState([]);

  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [category, setCategory] = useState('All');
  const [century, setCentury] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArchive, setSelectedArchive] = useState(null);

  const categories = ['All', 'Poetry', 'Traditions', 'History', 'Research'];
  const centuries = ['All', '19th Century', '20th Century', '21st Century'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/authors');
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchArchives = async () => {
    try {
      let url = `http://localhost:5000/api/archives?category=${category}&century=${century}&search=${searchQuery}`;
      if (selectedAuthorId) {
        url += `&author_id=${selectedAuthorId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setArchives(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchRequests();
  }, []);

  useEffect(() => {
    fetchArchives();
  }, [category, century, searchQuery, selectedAuthorId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setActiveTab('home');
  };

  const handleOpenArchive = (archive) => {
    setSelectedArchive(archive);
  };

  const handleCloseArchive = () => {
    setSelectedArchive(null);
    fetchRequests();
    fetchArchives();
  };

  return (
    <div className="min-h-screen bg-slate-shell flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl overflow-hidden min-h-[80vh] flex flex-col">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

        {activeTab === 'home' && (
          <div className="flex-1 p-8 flex flex-col space-y-6">
            <SearchBar
              onSearch={setSearchQuery}
              category={category}
              setCategory={setCategory}
              century={century}
              setCentury={setCentury}
              categories={categories}
              centuries={centuries}
            />

            <div className="grid grid-cols-12 gap-8 flex-1">
              <div className="col-span-12 md:col-span-5 flex flex-col space-y-6 border-r border-gray-100 pr-0 md:pr-8">
                <HeroCard />
                <AuthorCarousel
                  authors={authors}
                  selectedAuthorId={selectedAuthorId}
                  onSelectAuthor={setSelectedAuthorId}
                />
                <RecentRequests requests={requests} />
              </div>

              <div className="col-span-12 md:col-span-7 flex flex-col space-y-8">
                <div>
                  <h2 className="text-xl font-serif text-charcoal mb-4">Popular writers</h2>
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none">
                    {authors.map((auth) => (
                      <AuthorCard
                        key={auth.id}
                        author={auth}
                        onClick={() => setSelectedAuthorId(auth.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-serif text-charcoal mb-4">Academic papers & oral histories</h2>
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none">
                    {archives.length > 0 ? (
                      archives.map((arc) => (
                        <ArchiveCard
                          key={arc.id}
                          archive={arc}
                          onClick={() => handleOpenArchive(arc)}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">No archive records found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="flex-1 p-8 max-w-2xl mx-auto flex flex-col justify-center text-center">
            <h2 className="text-3xl font-serif text-charcoal mb-4">Rwandan Archives</h2>
            <p className="text-charcoal leading-relaxed font-serif text-base mb-4">
              A digital home dedicated to preserving and sharing Rwanda's cultural heritage. Our platform centralizes oral histories, academic research papers, traditional poetry, and historical records into a searchable, curated repository.
            </p>
            <p className="text-charcoal leading-relaxed font-serif text-base">
              Created for educators, researchers, students, and the public, the archives safeguard Rwanda's legacy, ensuring the wealth of ancient cosmology, traditions, and post-conflict reconstructions remains accessible to future generations.
            </p>
          </div>
        )}

        {activeTab === 'login' && (
          <AdminLogin onLoginSuccess={(u) => { setUser(u); setActiveTab('admin'); }} />
        )}

        {activeTab === 'admin' && (
          user ? <AdminDashboard /> : <AdminLogin onLoginSuccess={(u) => { setUser(u); setActiveTab('admin'); }} />
        )}
      </div>

      <DocumentReader archive={selectedArchive} onClose={handleCloseArchive} />
    </div>
  );
}

export default App;
