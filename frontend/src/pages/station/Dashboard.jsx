import KPI from '@/components/KPI'
import { HiFire, HiInformationCircle } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import axiosClient from '@/api/axiosClient'
import { Spinner } from 'flowbite-react'

const Dashboard = () => {
    const [states, setStates] = useState()
    const [loading, setIsloading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/users/station/dashboard/')
                setStates(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsloading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='grid grid-cols-1 gap-8 p-8 max-w-4xl mx-auto md:grid-cols-3 sm:grid-cols-2'>
            <KPI title="Filed" value={states?.filed} total={states?.total} icon={<HiFire />} color="text-red-500" description="Total number of complaints" />
            <KPI title="Investigating" value={states?.under_investigation} total={states?.total} icon={<HiInformationCircle />} color="text-yellow-500" description="Total number of complaints" />
            <KPI title="Resolved" value={states?.resolved} total={states?.total} icon={<HiInformationCircle />} color="text-green-500" description="Total number of complaints" />
        </div>
    )
}

export default Dashboard