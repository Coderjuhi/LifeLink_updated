import React from 'react'
import { Copyright } from "lucide-react";

import { BiSolidHeartCircle, } from 'react-icons/bi'

function Footer() {
    return (
        <>
            <section className="w-full bg-white mt-8">

                <div className="mx-auto text-center  w-full min-h-[18vh] ">
                    <div className="flex flex-col sm:flex-row justify-between items-center mr-2">
                        <div className="flex items-center text-lg font-semibold text-black">
                            <BiSolidHeartCircle className="text-purple-800 mr-2 ml-3" />
                            LifeLink
                        </div>
                        <div className='flex flex-row gap-4 mr-2 text-gray-600 '>
                            <div>Privacy</div>
                            <div>Terms</div>
                            <div>Contact</div>
                            <div>Help</div>
                        </div>
                    </div>
                    <div className='text-center text-gray-500 py-20 text-sm mt-5'>
                        <Copyright size={18} className='inline mr-1' />2025 LifeLink. Connecting lives through technology.
                    </div>
                </div>
            </section>




        </>
    )
}

export default Footer
