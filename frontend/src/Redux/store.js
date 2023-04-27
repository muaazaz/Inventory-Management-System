import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleWare = createSagaMiddleware()

const store = configureStore({
    reducer: rootReducer,
    middleware: ()=>[sagaMiddleWare]
})
 sagaMiddleWare.run(rootSaga)
export default store;