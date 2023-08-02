import {ServiceClient} from "./generated/api/WingClients";
import axios from "axios";
import {useQuery} from "react-query";

export function useApi ()  {

    let serviceClient = new ServiceClient(undefined, axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            transformResponse: data => data // this line here
        })
    );
    const {data, isLoading} = useQuery('drop', () => serviceClient.index().then((res) => res), {
        cacheTime: Infinity
    })

    return {data, isLoading}

}
