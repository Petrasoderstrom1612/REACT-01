// import React from 'react'
import { useIsFetching } from '@tanstack/react-query'
import {PacmanLoader} from 'react-spinners'


const GlobalLoadingSpinner = () => {
    const isFetching = useIsFetching();
  return (
    <div id="global-loading-spinner"><PacmanLoader 
    loading={!!isFetching}
    size={20}
    speedMultiplier={1.5}
    color="#007bff"
    /></div>
)
}

export default GlobalLoadingSpinner

//   return isFetching ? (
//     <div id="global-loading-spinner"><PacmanLoader/></div>
//   ): null