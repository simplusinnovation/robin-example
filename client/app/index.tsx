import * as React from "react";
import * as ReactDOM from "react-dom";
import {connectRobin} from "@simplus/robin-react"
import {robins} from "./robin"
import "antd/dist/antd.less";
import {PostForm} from './components/PostForm'
import {Post} from './components/Post'
import {Card} from "antd"

const {test} = robins

@connectRobin([test])
class App extends React.Component{
    componentDidMount() {
        test.get('test','/')
    }
    
    render(){
        const res = test.getResult('test')
        if(!res) {
            return <div></div>
        }
        return <div>
            {res.map( post => {
                return <Post
                    {...post}
                    key={post.id}
                    date={new Date(post.date)}
                />
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