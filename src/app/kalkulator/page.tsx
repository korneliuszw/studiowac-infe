import {categories} from "@/components/Categories/categories";
import React from "react";
import Category from "@/components/Categories/Category";


export default function Calculator() {
    return (
        <form className={"gap-2 items-center grid grid-cols-3 bg-base-100 p-3 m-auto md:w-2/3 lg:w-1/2"}>
            {Object.keys(categories).map(field => <Category category={categories[field]} key={field}
                                                            categoryKey={field}/>)}
            <button className={"btn btn-primary col-span-full justify-self-center max-w-xl"} type={"submit"}>Oblicz
            </button>
        </form>
    )
}