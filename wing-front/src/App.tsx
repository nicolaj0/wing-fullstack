import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "react-query";
import {Drop} from "./Drop";

function App() {

    const queryClient = new QueryClient()

    return <QueryClientProvider client={queryClient}>
        <Drop/>
    </QueryClientProvider>
}


export default App;
