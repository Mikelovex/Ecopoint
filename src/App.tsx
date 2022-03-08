import * as React from "react"
import {
  ChakraProvider, extendTheme,
} from "@chakra-ui/react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import CreatePoint from "./pages/CreatePoint"
import ViewPoint from "./pages/ViewPoint"


const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f0f0f5',
      }
    }
  }
})


export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-point" element={<CreatePoint />} />
        <Route path="/view-point" element={<ViewPoint />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
