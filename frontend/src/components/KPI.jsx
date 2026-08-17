import { Card } from "flowbite-react";

const KPI = ({ title, value, icon, color, description, total }) => {
    return (
        <Card href="#" className='max-w-3xl bg-slate-900/60! background-blue-md!'>
            <h5 className={` text-2xl font-bold tracking-tight ${color}`}>
                {value} <br />
                {title}
            </h5>
        </Card >
    );
}

export default KPI