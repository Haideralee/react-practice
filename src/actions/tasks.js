export const ADD_TASK = 'ADD_TASK';

export function addTask(object) {
    return {
        type: ADD_TASK,
        object
    };
}