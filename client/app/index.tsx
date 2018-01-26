import * as React from "react";
import * as ReactDOM from "react-dom";
import "antd/dist/antd.less";
import {PostForm} from './components/PostForm'
import {Post} from './components/Post'
import {Card} from "antd"

class App extends React.Component{
    componentDidMount() {}
    
    render(){
        return <div>
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