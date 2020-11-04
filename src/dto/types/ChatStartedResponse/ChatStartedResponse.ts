import {IUserSchema} from "../../../model/User";

interface ChatStartedResponse {
    upUserId: IUserSchema["_id"],
    downUserId: IUserSchema["_id"],
    enemyId:  IUserSchema["_id"],
    youStart: boolean,

}

export {ChatStartedResponse}