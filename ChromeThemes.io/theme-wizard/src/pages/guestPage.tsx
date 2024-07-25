import React, { useState } from 'react';
import PresetList from 'src/components/presetList';


const GuestPage = () => {
    const [isSignedIn, setIsSignedIn] = useState(null);

    const handleSignIn = () => {
       // function to handle sign on
      };

    return(
        <div className="plasmo-h-screen plasmo-flex plasmo-flex-col plasmo-items-center plasmo-p-3  plasmo-bg-gray-500">
            <button  className=" plasmo-w-11/12 plasmo-px-6 plasmo-py-4 plasmo-text-white plasmo-text-xl plasmo-bg-blue-500 plasmo-rounded-lg" onClick={handleSignIn}>Sign In to create custom templates!</button>
            <h2 className="plasmo-text-gray-100 plasmo-p-2 plasmo-text-l">Or try some of ours... </h2>
            <PresetList />

        </div>
    )
}

export default GuestPage;