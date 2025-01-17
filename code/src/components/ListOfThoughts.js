import React, { useState, useEffect } from 'react'
import ThoughtCard from './ThoughtCard'
import { API_URL_THOUGHTS } from '../Reusables/urls';

const ListTextField = () => {
    // use states as variables. first is default seconds sets the value
    const [thoughtList, setThoughtList] = useState([]);

    //useEffect descides when and what should render (at what point of mounting the component)
    useEffect(() => {
        fetchThoughtList();
    }, []);

    const fetchThoughtList = () => {
        fetch(API_URL_THOUGHTS)
            .then(res => res.json())
            .then(thoughts => setThoughtList(thoughts))
            .catch(err => console.error(err))
    }

    const onLiked = thoughtId => {
        const updateThoughtList = thoughtList.map(thought => {
            if (thought._id === thoughtId) {
                thought.hearts +=1
            }
            return thought
        })
        setThoughtList(updateThoughtList)
    }

    return (
        <>
            {thoughtList.map(thought => (
                <div>
                    <ThoughtCard
                    key={thought._id}
                    thought={thought}
                    onLiked={onLiked}
                    />
                </div>
            ))}
        </>
    )
}

export default ListTextField