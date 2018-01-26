import * as React from 'react'
import {Card, Button} from 'antd'
import {Post as PostOwnProps} from '../../../common/Post'

import {robins} from '../robin'

const {postsCol} = robins

export class Post extends React.Component<PostOwnProps>{
    render() {
        return <Card style={{marginBottom : '1rem'}} title={<p><Button onClick={() => {
            postsCol.like(this.props.id)
        }}>{this.props.likes} Likes </Button> <strong>{this.props.title}</strong> - <small>From : {this.props.author} - at : {this.props.date.toDateString()}</small></p>}>
            <p>{this.props.text}</p>
        </Card> 
    }
}