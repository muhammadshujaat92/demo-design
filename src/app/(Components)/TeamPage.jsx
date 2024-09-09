"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';
import Buttons from './Buttons';
import { useDispatch, useSelector } from 'react-redux'
import { teamPageData } from '../_redux/api/teamPage'
import Spinner from './Spinner';

const TeamPage = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.teamPageData);
    const { heading, paragraph, title, images } = state?.items[0]?.attributes || {};
    const imageURl = "https://supportive-presence-667b49df8e.strapiapp.com";
    useEffect(() => {
        dispatch(teamPageData())
    }, [dispatch])

    if (state.status === 'loading') {
        return (
            <div className="h-screen bg-white flex justify-center items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <section className="bg-white text-center lg:h-screen">
            <div className="lg:px-20 h-full lg:flex flex-col justify-center">
                <div className="lg:flex justify-center items-center flex-col py-8 lg:py-0">
                    <h2 className="text-gray-600 uppercase text-[20px] lg:text-lg tracking-widest mb-4">{heading}</h2>
                    <h3 className="text-[25px] lg:text-3xl font-bold my-[8px] lg:mt-2 lg:mb-0 text-black">{title}</h3>
                    <p className="text-gray-800 text-[15px] lg:text-lg lg:my-6 lg:w-[55rem] lg:mx-[55rem]">{paragraph}</p>
                </div>
                <div className="lg:flex flex-wrap justify-between items-center">
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:gap-4'>
                        {images ? (
                            images.data.map((image) => {
                                const url = image?.attributes?.url || "";
                                const Img = `${url}`;
                                return (
                                    <div key={image.attributes.id} className="w-[10rem] md:w-[13rem] lg:w-[15rem]">
                                        <Image src={Img} alt='Img' width={200} height={200} className='w-full' />
                                    </div>
                                )
                            })
                        ) : (
                            <div>hgjhghjg</div>
                        )}

                    </div>
                    <div className="lg:w-[25rem] max-w-[25rem] lg:max-w-2/5 p-4">
                        <Buttons />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeamPage