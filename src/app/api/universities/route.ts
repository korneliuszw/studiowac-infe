import {cache} from "react";
import universities from '../university.json'

export const getAllUniveritiesServer = cache(() => {
    return universities.map(university => {
        return {
            name: university.name
        }
    })
})