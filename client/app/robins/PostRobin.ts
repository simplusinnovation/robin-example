import {CollectionRobin} from '@simplus/robin'
import {Post} from '../../../common/Post'
import * as update from 'immutability-helper';

export class PostRobin extends CollectionRobin<Post>{
    
    constructor(options){
        super(options)

        this.addReducerMiddleware(`like`, (state, action) => {
            let i = state.collection.findIndex( v => {
                return v.id === action.data.id
            })
            
            if(i >= 0){
                state = update(state, {
                    collection : {
                        [i] : {
                            likes : { $set : state.collection[i].likes+1 } 
                        }
                    }
                })
            }

            return state
        })
    }

    like(id: string) {
        this.get('like', `/${id}/like`)
    }

    random() {
        this.get('random', `/random`)
    }
} 