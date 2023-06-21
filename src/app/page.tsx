"use client"
import dynamic from 'next/dynamic'
import { Suspense } from "react";


export default function Home() {
  const DynamicComponent = dynamic(() =>
  import('../components/otpVerify').then((mod) => mod.OTPVerify), {suspense: true}
)
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicComponent/>  
        </Suspense>
      </div>
    )
}

