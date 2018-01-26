import {Robin, RobinProvider, CoreAction} from "@simplus/robin"

import RobinReact from "@simplus/robin-react"

export const robins = {
    test : new Robin({baseUrl : "//localhost:3005/posts"})
}

const provider = new RobinProvider(robins)

RobinReact.setProvider(provider)
