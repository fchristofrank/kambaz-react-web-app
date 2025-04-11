import React, { useState } from 'react';

const Search: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Mock search logic
        if (value) {
            setResults([
                `${value} Result 1`,
                `${value} Result 2`,
                `${value} Result 3`,
            ]);
        } else {
            setResults([]);
        }
    };

    const handleClick = () => {
        alert(`Search query: ${query}`);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', marginTop: '50px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                    style={{
                        flex: 1,
                        padding: '10px',
                        fontSize: '18px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        transition: 'box-shadow 0.3s ease',
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = '0 0 10px rgba(0, 123, 255, 0.5)')}
                    onBlur={(e) => (e.target.style.boxShadow = 'none')}
                />
                <button
                    onClick={handleClick}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Search
                </button>
            </div>
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
                {results.map((result, index) => (
                    <li
                        key={index}
                        style={{
                            padding: '10px',
                            borderBottom: '1px solid #eee',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease, transform 0.2s ease',
                        }}
                        onClick={(e) => {
                            const target = e.currentTarget;
                            target.style.backgroundColor = '#f0f8ff';
                            target.style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                target.style.backgroundColor = '';
                                target.style.transform = 'scale(1)';
                            }, 300);
                        }}
                    >
                        {result}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;