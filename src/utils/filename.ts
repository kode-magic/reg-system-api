import * as path from "path";
import * as _ from "lodash";

const getName = (name: any) => {
    return `${Math.floor((new Date()).getTime() / 1000)}${path.extname(name)}`;
}

export default getName;