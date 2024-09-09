"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Buttons from "./(Components)/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { homePageData } from "./_redux/api/homePage";
import Spinner from "./(Components)/Spinner";

export const apiURL = (turl) => {
  const baseUrl = `https://supportive-presence-667b49df8e.strapiapp.com/api/${turl}?populate=*`
  return baseUrl
}

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.homePageData)

  useEffect(() => {
    dispatch(homePageData())
  }, [dispatch])


  const { Title, circleContentTitle, circleContentPara, paragraph, heading1 } = state?.items[0]?.attributes || {};
  // const { title, para } = circleContent || {};
  const imageURl = "https://supportive-presence-667b49df8e.strapiapp.com"
  const { url } = state?.items[0]?.attributes?.image?.data?.attributes || {}
  const Img = url ? `${url}` : "";

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
          <h2 className="text-gray-600 uppercase text-[20px] lg:text-lg tracking-widest mb-6">{heading1}</h2>
          <h3 className="text-[25px] lg:text-3xl font-bold my-[8px] lg:mt-2 lg:mb-0 text-black">{Title}</h3>
          <p className="text-gray-800 text-[15px] lg:text-lg lg:my-6 lg:w-[55rem] lg:mx-[55rem]">{paragraph}</p>
        </div>
        <div className="lg:flex flex-wrap justify-between items-center">
          <div className="lg:relative lg:flex-1 max-w-full lg:max-w-1/2 lg:p-4">
            <div className="relative flex justify-center items-center flex-col md:flex-row gap-4 lg:gap-0">
              <div className="relative top-0 md:left-[5rem] bg-red-700 bg-opacity-80 text-white lg:p-6 rounded-[10rem] w-[16rem] py-[3rem] px-[2rem] lg:px-6 lg:rounded-[20rem] max-w-xs lg:h-[20rem] lg:w-[20rem] lg:flex flex-col justify-center text-start">
                <h4 className="font-semibold mb-2 ml-5" id="active-title">
                  {circleContentTitle}
                </h4>
                <p className="ml-5" id="active-description">
                  {circleContentPara}
                </p>
              </div>
              <div className="w-[16rem] lg:w-[20rem] max-w-[20rem]">
                <Image
                  src={Img}
                  alt={"IMage"}
                  width={400}
                  height={400}
                  className="rounded-[20rem] w-full"
                  id="active-image"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-[25rem] max-w-[25rem] lg:max-w-2/5 p-4">
            <Buttons />
          </div>
        </div>
      </div>
    </section>
  );
}