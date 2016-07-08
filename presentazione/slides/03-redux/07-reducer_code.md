### Esempio Reducer

```javascript
function xyzReducer(state = initialState, action) {
  switch (action.type) {
    case XYZ_CONSTANT_ACTION:
      return (
      	Object.assign({}, state, {xyzValue: action.xyz})
      )
    default:
      return state
  }
}
```