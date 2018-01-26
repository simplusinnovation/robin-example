import * as React from "react";
import * as ReactDOM from "react-dom";
import "antd/dist/antd.less";
import {PostForm} from './components/PostForm'
import {Post} from './components/Post'
import {Card} from "antd"

import {connectRobin} from '@simplus/robin-react'
import {robins} from './robin'

const { posts, postsCol } = robins

const t =  {
    login(a){
        postsCol.find({})
        return a
    }
}


@connectRobin([posts, postsCol])
class App extends React.Component{
    componentDidMount() {
        t.login(5)

        postsCol.find({})
        postsCol.random()
        postsCol.scope('test').find({})
    }
    
    render(){
        const results = postsCol.getCollection() || []
        const results1 = postsCol.getCollection('test') || []
        postsCol.isFetched('find')

        return <div>
            <h2>Random</h2>

            <Post {...postsCol.getResult('random')} date={new Date((postsCol.getResult('random') || {}).date)}/>
            <h2>Others</h2>
        
            {results.map( (p) => {
                return <Post {...p} key={p.id} date={new Date(p.date)}></Post>
            })}
        </div>
    }
}


ReactDOM.render( <div>
        <Card>
            <Card title="Post">
                <PostForm></PostForm>
            </Card>
        </Card>
        <Card>
            <App/>
        </Card>
</div> , document.getElementById('mount'))