"use client"
import React, { useEffect } from 'react'
import Buttons from './Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { outComePageData } from '../_redux/api/outcomePage'
import Spinner from './Spinner'

const OutCome = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.outComePageData);
    const { title, heading, paragraph, paragraph1, paragraph2, paragraph3 } = state?.items[0]?.attributes || {};

    useEffect(() => {
        dispatch(outComePageData())
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
                    <h2 className="text-gray-600 uppercase text-[20px] lg:text-lg tracking-widest mb-6">{heading}</h2>
                    <h3 className="text-[25px] lg:text-3xl font-bold my-[8px] lg:mt-2 lg:mb-0 text-black">{title}</h3>
                    <p className="text-gray-800 text-[15px] lg:text-lg lg:my-6 lg:w-[55rem] lg:mx-[55rem]">{paragraph}</p>
                </div>
                <div className="lg:flex flex-wrap justify-between items-center">
                    <div className="lg:relative lg:flex-1 max-w-full lg:max-w-1/2 lg:p-4">
                        <div className='text-black px-3 md:text-lg text-start'>
                            <p>{paragraph1}</p>
                            <p className='my-6'>{paragraph2}</p>
                            <p>{paragraph3}</p>
                        </div>
                    </div>
                    <div className="lg:w-[25rem] max-w-[25rem] lg:max-w-2/5 p-4">
                        <Buttons />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OutCome