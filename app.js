import React, { useState } from 'react';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const res = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedJson),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Invalid JSON', error);
        }
    };

    const handleFilterChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFilter([...filter, value]);
        } else {
            setFilter(filter.filter((item) => item !== value));
        }
    };

    return (
        <div>
            <h1>BFHL Frontend</h1>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <div>
                    <h2>Response:</h2>
                    {filter.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                    {filter.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                    {filter.includes('Highest lowercase alphabet') && (
                        <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>
                    )}
                </div>
            )}
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Numbers"
                        onChange={handleFilterChange}
                    /> Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Alphabets"
                        onChange={handleFilterChange}
                    /> Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Highest lowercase alphabet"
                        onChange={handleFilterChange}
                    /> Highest lowercase alphabet
                </label>
            </div>
        </div>
    );
}

export default App;
