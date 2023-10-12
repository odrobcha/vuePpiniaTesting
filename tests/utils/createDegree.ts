import type {Degree} from "@/api/types";

export const CreateDegree = (degree:Partial<Degree>):Degree =>{
    return {
        id: 1,
        degree: "Masters",
        ...degree
    }
}