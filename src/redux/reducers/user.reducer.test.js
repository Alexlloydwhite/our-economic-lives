import userReducer from './user.reducer';

describe('Testing userReducer', () => {
    test('Initial state should be an empty object', () => {
        let action = {};
        let state = undefined;
        let returnedState = userReducer(state, action);
        expect(returnedState).toEqual({});
    });
});