import React from "react"
import { DarkModeState } from "./src/components/UI/ThemeHandler"
import {AuthProvider} from "./src/contexts/AuthContext";
import {FirestoreProvider} from "./src/contexts/FirestoreContext";

export function wrapRootElement({ element, props }) {
  return <DarkModeState {...props}>
    <AuthProvider><FirestoreProvider>{element}</FirestoreProvider></AuthProvider>
      </DarkModeState>
}
