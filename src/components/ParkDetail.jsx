import React from 'react';
import { useParams } from 'react-router-dom';

const ParkDetail = ({ parks }) => {
    const { parkId } = useParams();
    const park = parks.find(p => p.id === parkId);

    console.log(park);

    if (!park) {
        return <div>Park not found</div>;
    }

    return (
        <div>
            <h1>{park.fullName}</h1>
            <p>{park.description}</p>
            <ul>
                {park.activities.map(activity => (
                    <li key={activity.id}>{activity.name}</li>
                ))}
            </ul>
            <ul>
                {park.images.map(image => (
                    <li key={image.id}>
                        <img src={image.url} alt={image.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkDetail;
