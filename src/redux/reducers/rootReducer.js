import { combineReducers } from "redux"
import customizer from "./customizer/"
import navbar from "./navbar/Index"

const rootReducer = combineReducers({
  customizer: customizer,
  navbar: navbar
})

export default rootReducer
