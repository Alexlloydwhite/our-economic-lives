import userReducer from './user.reducer';

describe('Testing userReducer', () => {
    test('Initial state should be an empty object', () => {
        let action = {};
        let state = undefined;
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual({});
    });

    test('Testing SET_USER', () => {
        let action = {
            type: 'SET_USER',
            payload: { username: 'alex', id: 1}
        }
        let state = { username: 'alex', id: 1 }
        let returnedState = userReducer(state, action);
        expect(returnedState);
    });
});