import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function NationalParkApi() {

    // Make a request for a user with a given ID

    const [parks, setParks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        // Make a request for a user with a given ID
        axios.get(`https://developer.nps.gov/api/v1/parks?q=california&api_key=6kYXB4PMtxJQ4QH577h0sFJeM5kBu2BXgfWcX095`)
            .then(response => {
                // handle success
                setParks(response.data.data);
                console.log(response)
                setLoading(false)
            })
            .catch(error => {
                // handle error
                console.log("eeror fetching and parsing data", error);
                setError(error)
                setLoading(false)
            })
            .finally(function () {
                // always executed
            });

    }, []);//

    return (
        <div>
            <h2>National Parks in CA</h2>
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
                                    src={park.images[0].url}  // Display only the first image
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