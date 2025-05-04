import React from 'react';
import './Explorer.css';

const SearchResults = ({ results, onResultClick }) => {
    return (
        <div className="search-results-page">
            <ul className="search-results-list">
                {results.map((item, i) => (
                    <li key={i} className="search-result-item">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onResultClick(item.url);
                            }}
                            className="result-link"
                        >
                            <h3>{item.title}</h3>
                            <p>{item.snippet}</p>
                            <small>{item.url}</small>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;

