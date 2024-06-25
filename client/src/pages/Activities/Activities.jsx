import React, { useEffect } from 'react';
import SquishyCard from '../../public/CardComponent';
import { Box } from '@mui/material';
import {Skeleton } from '@mui/material';
import axiosClient from '../../axios-client'


const Activities = () => {
    const [render, setRender] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/activity')
            .then(({ data }) => {
                setLoading(false);
        
            })
            .catch((error) => {
                setLoading(false);
            })
    }
    const dummyData = [
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
        { tag: "Academic", title: "Dummy Event 1", description: "This is the description for Dummy Event 1" },
        { tag: "Sports", title: "Dummy Event 2", description: "This is the description for Dummy Event 2" },
        { tag: "Music", title: "Dummy Event 3", description: "This is the description for Dummy Event 3" },
      ];
    return (
        <div>
            <div className="flex flex-col items-center justify-center mx-10 pt-10">
                <h3 className="text-3xl md:text-5xl font-bold text-center">
                    Find Your Next Perfect Activity!
                </h3>
                <p className="text-md md:text-xl text-slate-700 my-4 md:my-6 text-center w-1/2">
                    Explore a wide range of activities for every interest. From academic to sports, find and join your next experience with ease!
                </p>

            </div>
            <Box className="w-[80%] grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 max-2xl:grid-cols-3 gap-4 max-w-8xl mx-auto px-4 py-8" >
                {loading ? dummyData.map((data, index) => (
                    <Skeleton key={index} variant="rounded" className='rounded border-2 mx-auto w-fit'  >
                        <SquishyCard key={index} {...data} setRender={setRender} />
                    </Skeleton>
                )) :
                    dummyData.map((data, index) => (
                        <SquishyCard key={index} {...data} setRender={setRender} />
                    ))
                }
            </Box>
        </div>
    );
}

export default Activities;