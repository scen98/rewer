import { ICast, IEntryCast } from "../../common/cast";

export const castPath = {
    getCastTypes: "/jsondb/cast_types.json",
    insertCast: "/cast/insert_cast",
    insertCasts: "/cast/insert_casts",
    updateCast: "/cast/update_cast",
    deleteCast: "/cast/delete_cast"
}

export function compareCastType(cast1: ICast, cast2: ICast){
    if(cast1.castTypeId < cast2.castTypeId){
        return -1;
    }
    if(cast1.castTypeId > cast2.castTypeId){
        return 1;
    }
    return 0;
}

export function compareDate(cast1: IEntryCast, cast2: IEntryCast){
    if(new Date(cast1.entryDate) < new Date(cast2.entryDate)){
        return -1;
    }
    if(new Date(cast1.entryDate) > new Date(cast2.entryDate)){
        return 1;
    }
    return 0;
}
