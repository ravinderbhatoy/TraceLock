import { Card } from "flowbite-react";

const KPI = ({ title, value, icon, color, description, total }) => {
    return (
        <Card href="#" className='max-w-3xl bg-slate-900/60! background-blue-md!'>
            <h5 className={` text-2xl font-bold tracking-tight text-gray-900 ${color}`}>
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {value} / {total}
            </p>
        </Card>
    );
}

export default KPI