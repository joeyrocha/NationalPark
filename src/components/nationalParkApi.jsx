import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function NationalParkApi({ setParksData }) { // Renamed prop
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('california'); // State for the input field
    const [submittedQuery, setSubmittedQuery] = useState('california'); // State for the submitted query

    useEffect(() => {
        setLoading(true);
        axios.get(`https://developer.nps.gov/api/v1/parks?q=${query}&api_key=${import.meta.env.VITE_NATIONAL_PARKS_API_KEY}`)
            .then(response => {
                setParks(response.data.data);
                setParksData(response.data.data); // Update parent state
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [submittedQuery, setParksData]); // Depend on submittedQuery

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmittedQuery(query); // Update the submitted query on form submit
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className='search-input'
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search parks by state"
                />
                <button className='submit-button' type="submit">Search</button>
            </form>
            {loading && <p>Loading parks data...</p>}
            {error && <p>Error fetching parks data: {error.message}</p>}
            {parks.length > 0 && (
                <div className='results-container'>
                    {parks.map(park => (
                        <div className='search-result-container' key={park.id}>
                            <h1 className='state-park-name'>
                                <Link to={`/parks/${park.id}`}>{park.fullName}</Link>
                            </h1>
                            <p className='park-description'>{park.description}</p>
                            {park.images && park.images.length > 0 && (
                                <img
                                    className='park-pics'
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
