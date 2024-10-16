import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${encodeURIComponent(query)}&image_type=photo`);
      if (!response.ok) {
        throw new Error('Không thể tìm kiếm hình ảnh');
      }
      const data = await response.json();
      setImages(data.hits);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchImages();
    }
  };

  return (
    <div className="App">
      <h1>Tìm kiếm Hình ảnh</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập từ khóa tìm kiếm..."
        />
        <button type="submit">Tìm kiếm</button>
      </form>
      
      {isLoading && <p>Đang tải...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.webformatURL} alt={image.tags} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;