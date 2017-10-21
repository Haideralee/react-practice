import { ADD_TASK } from '../actions/tasks';

addTask = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return action.payload;
        default:
            return state
    }
}

export tasks = (state = [], action) => {
    switch (action.type) {

        case ADD_TASK:
            return [
                ...state,
                addTask(undefined, action)
            ];
        default:
            return state
    }
};