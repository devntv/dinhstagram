/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import BarLoader from "react-spinners/BarLoader"
import { css } from "@emotion/core";
import useUser from '../../hooks/user-use'
import { getSuggestedProfiles } from '../../services/firebase'
import Header from "../header"
import ViewAllSuggestedFollow from './view-allFollow'

const override = css`
  display: flex;
  margin: 0 auto;
  width: 100%;
  position: relative;

}
`;


export default function ViewAllSuggested() {
    const { user } = useUser()
    const {docId, username, fullName, userId, following} = user
    const [profiles, setProfiles] = useState(null)
    const [loadView, setLoadView] = useState(false)

	useEffect(() => {
		async function suggestedProfiles() {
            setLoadView(true)
			const response = await getSuggestedProfiles(userId, following)
			setProfiles(response)
            setLoadView(false)
            
		}	
		if (userId) {
			suggestedProfiles()
		}
		
	}, [userId])

    useEffect(()=>{
      profiles === null ? setLoadView(true) : setLoadView(false)
    }, [profiles])
    

  

    return (
        <div className='bg-gray-background h-screen'>
            <Header />
            <div className='flex flex-col justify-center max-w-lg relative mt-20 mx-auto bg'>
                
                    <div className='flex relative justify-start mb-2 ml-2'>
                        <h4 className='font-semibold text-gray-base text-sm'>Gợi ý</h4>
                    </div>

                    <div className='bg-white w-full h-auto overflow-hidden relative '>
                        {profiles === null ? <BarLoader css={override} loading={loadView} color='#0095f6'  /> : profiles?.map((profile) => (
                            <ViewAllSuggestedFollow 
                                    key={profile?.docId}
                                    profileDocId={profile.docId}
                                    username={profile?.username}
                                    loggedInUserdocId ={docId}
                                    profileId={profile.userId}
                                    userId ={userId}
                            />
                        ))}
                    </div>
                    
            
               
            </div>
        </div>
    )
}