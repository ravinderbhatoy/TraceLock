import React from 'react'

const NotAuthorized = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl text-white-500 font-bold">
                You&apos;re Not Authorized to perform this action.
            </h1>
        </div>
    )
}

export default NotAuthorized