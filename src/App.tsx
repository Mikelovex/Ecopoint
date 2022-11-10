import {
  ChakraProvider, extendTheme,
} from "@chakra-ui/react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import CreatePoint from "./pages/CreatePoint"
import PointDetail from "./pages/PointDetail"
import Point from "./pages/Point/Point"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { AuthContextProvider } from "./hooks/AuthContext"
import Profile from "./pages/Profile"
import CompanyPoints from "./pages/CompanyPoints"
import EditPoint from "./pages/EditPoint"
import Json from "./pages/Json"
import XML from "./pages/XML"
import FAQ from "./pages/FAQ"


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
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-point" element={<CreatePoint />} />
          <Route path="/view-points" element={<PointDetail />} />
          <Route path="/point/:id" element={<Point />} />
          <Route path="/edit/point/:id" element={<EditPoint />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company-points" element={<CompanyPoints />} />
          <Route path="/json" element={<Json />} />
          <Route path="/xml" element={<XML />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </ChakraProvider>
)
