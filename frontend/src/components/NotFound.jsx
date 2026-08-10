import React from 'react'

const NotFound = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl text-blue-500 font-bold">
                404 Not Found
            </h1>
            <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
        </div>
    )
}

export default NotFound