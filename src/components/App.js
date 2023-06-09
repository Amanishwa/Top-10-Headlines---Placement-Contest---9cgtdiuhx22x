import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [API_KEY] = useState('bcbe08a5e529efa2f4960c432d0a5f0b');
  const [API_URL] = useState(
    'https://gnews.io/api/v4/top-headlines?apikey=${API_KEY}&max=10&lang=en&category='
    );
    

  useEffect(() => {
    setLoading(true);
    fetch('${API_KEY}&{category}')
    .then((response)  => response.json())
    .then((data) => {
      setNewsData(data.articles);
      setLoading(false);
    })
    .catch(error =>
      console.log(error));
    }, [category, API_URL]);
    const handleCategoryChange =(event) =>{
     const newCategory = event.target.value;
      setCategory(newCategory);
    };

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={handleCategoryChange}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ? (
      <p className='loader'>Loading...</p>
      ) : (
      <ol className='news-list'>
        {newsData.map((news, index) =>(
        <li key={index}>
          <img className='news-img' src={news.image} alt=""/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{news.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{news.description}</p>
              <p className='news-source'><strong>Source:</strong> {news.source.name}</p>
            </section>
          </section>
        </li>
        ))}
      </ol>
      )}
    </div>
  )
}


export default App;
