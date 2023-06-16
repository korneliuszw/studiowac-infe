import {PropsWithChildren} from "react";

export const CalculatorForm = ({children}: PropsWithChildren<{}>) => {
    return (
        <>
            <form action={"/kalkulator/wyniki"}
                  className={"gap-2 items-center grid grid-cols-3 bg-base-100 p-3 m-auto md:w-2/3 lg:w-1/2"}>
                {children}
            </form>
        </>
    )
}