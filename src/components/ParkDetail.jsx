import React from 'react';
import { useParams } from 'react-router-dom';

const ParkDetail = ({ parks }) => {
    const { parkId } = useParams();
    const park = parks.find(p => p.id === parkId);

    console.log(park);

    if (!park) {
        return <div>Park not found</div>;
    }

    const limitedActivities = park.activities.slice(0, 5);

    return (
        <div>
            <h1 className='parkdetail-name'>{park.fullName}</h1>
            <p className='parkdetail-description'>{park.description}</p>

            
            
            <ul className='park-activities'>
                {limitedActivities.map(activity => (
                    <li className='park-activity' key={activity.id}>{activity.name}</li>
                ))}
            </ul>
            <ul className='park-images'>
                {park.images.map(image => (
                    <li 
                        className='park-image'
                        key={image.id}>
                        <img src={image.url} alt={image.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkDetail;
