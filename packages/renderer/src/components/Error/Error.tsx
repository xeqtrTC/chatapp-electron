import React from "react"
import { errorProps } from "../Hooks/stateInterface";

const Error = ({ error }: errorProps) => {
    return (
        <div className="bg-red-600 p-2 rounded text-white font-medium text-center">
            {error}
        </div>
    )
}

export default Error;