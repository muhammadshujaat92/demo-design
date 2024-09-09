"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaLessThan } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { buttonData, setActiveBtn } from '../_redux/api/buttons';

const Buttons = () => {
    const [activeOption, setActiveOption] = useState("Industry experts");
    const dispatch = useDispatch();
    const { items, activeBtn } = useSelector(state => state.buttonData)
    const { button1, button2, button3, button4, button5 } = items[0]?.attributes || {};

    const buttons = [
        { label: button1 || "", href: '/' },
        { label: button2 || "", href: '/team' },
        { label: button3 || "", href: '/outcome' },
        { label: button4 || "", href: '/' },
        { label: button5 || "", href: '/' }
    ];

    useEffect(() => {
        dispatch(buttonData())
    }, [dispatch])

    return (
        <>
            {buttons.map((button, index) => (
                <Link key={index} href={button.href} onClick={() => dispatch(setActiveBtn(button.label))} className={`flex justify-between items-center w-full text-left px-4 py-3 mb-2 rounded-l-[5rem] transition-colors ${activeBtn === button.label ? "bg-red-700 text-white font-bold " : "bg-gray-200 text-gray-900 font-bold hover:bg-red-500 hover:text-white"}`}><FaLessThan />{button.label}</Link>
            ))}
        </>
    )
}

export default Buttons