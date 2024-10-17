import Image from 'next/image'
import { motion } from 'framer-motion'
import React from 'react'
import { MY_IMAGE } from '@/common/constants'

const HeroImage = () => {
  return (
    <motion.div
      className='mx-auto mt-8 hidden max-h-[300px] w-full max-w-[300px] cursor-pointer rounded-md sm:flex lg:mt-0'
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex w-full rounded before:absolute before:inset-0 before:h-full before:w-full before:rounded before:mix-blend-screen before:content-[''] after:absolute after:left-6 after:top-6 after:z-[-1] after:h-full after:w-full after:rounded after:border after:border-primary after:transition after:duration-200 after:ease-in after:content-[''] hover:before:bg-transparent hover:before:mix-blend-normal hover:after:translate-x-[-8px] hover:after:translate-y-[-8px]">
        <Image
          src={MY_IMAGE.src}
          width={300}
          height={300}
          className='relative w-full max-w-full rounded-md object-cover mix-blend-multiply hover:mix-blend-normal'
          alt='Raphael Mansueto 1x1 picture'
        />
      </div>
    </motion.div>
  )
}

export default HeroImage
