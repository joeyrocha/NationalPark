import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function NationalParkApi() {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('california'); // Initial query value
    const [submitQuery, setSubmitQuery] = useState('california'); // Query to be submitted
    
    useEffect(() => {
        setLoading(true);
        axios.get(`https://developer.nps.gov/api/v1/parks?q=${submitQuery}&api_key=${import.meta.env.VITE_NATIONAL_PARKS_API_KEY}`)
            .then(response => {
                setParks(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [submitQuery]); // Dependency on submitQuery

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitQuery(query); // Update submitQuery to trigger useEffect
    };

    return (
        <div>
            <h2>National Parks in CA</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search parks by state"
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading parks data...</p>}
            {error && <p>Error fetching parks data: {error.message}</p>}
            {parks.length > 0 && (
                <div>
                    {parks.map(park => (
                        <div key={park.id}>
                            <h1>{park.fullName}</h1>
                            <p>{park.description}</p>
                            {park.images && park.images.length > 0 && (
                                <img
                                    src={park.images[0].url}
                                    alt={park.images[0].altText}
                                    title={park.images[0].title}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
