import {Robin, RobinProvider, CoreAction, CollectionRobin, CollectionRobinMethods} from '@simplus/robin'
import {PostRobin} from './robins/PostRobin'

import RobinReact from '@simplus/robin-react'

export const robins = {
    posts : new Robin({
        baseUrl:'//localhost:3005/posts'        
    }),
    postsCol : new PostRobin({
        baseUrl : '//localhost:3005/posts'
    })
}

const provider = new RobinProvider(robins)

RobinReact.setProvider(provider)