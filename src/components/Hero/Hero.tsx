import {PropsWithChildren} from "react";

interface HeroProps {
    title: string;
    description: string;
}

export const Hero = ({title, description, children}: PropsWithChildren<HeroProps>) => {
    return <div className={"hero min-h-screen bg-base-200"}>
        <div className={"text-center hero-content"}>
            <div className={"max-w-md"}>
                <h1 className={"font-bold text-5xl"}>{title}</h1>
                <p className={"py-6"}>{description}</p>
                {children}
            </div>
        </div>
    </div>
}