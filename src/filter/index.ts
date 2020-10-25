import {AuthFilter} from "./AuthFilter";
import {JsonValidatorFilter} from "./JsonValidatorFilter";
import {Filter} from "./Filter";

export {AuthFilter, JsonValidatorFilter, Filter}

const standerFilterChain: Filter[] = [new JsonValidatorFilter(), new AuthFilter()];
export default standerFilterChain;