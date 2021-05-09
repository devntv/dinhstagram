/* eslint-disable no-lone-blocks */
/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */

import { useEffect, useRef } from 'react'

export default function useCombineRefs(...refs) {
    const targetRef = useRef();
    useEffect(() => {
        refs.forEach(ref => {
            if(!ref) return 
            if(typeof ref === 'function'){
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs])

    return targetRef
}

{/* <input  ref= {useCombineRefs(prevRef, prevRef2)}/> */}