import {DropOperation, ServiceClient} from "./generated/api/WingClients";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";

export function useApi (): {data: DropOperation| undefined, isLoading: boolean}  {

    const serviceClient = new ServiceClient(undefined, axios.create({
            baseURL: 'http://localhost:3001',
            transformResponse: data => data // this line here
        })
    );

    const {data, isLoading} = useQuery( {
        queryKey: ['drop'],
        queryFn: () => serviceClient.index().then((reponse) => reponse),
        cacheTime: Number.POSITIVE_INFINITY
    })

    return {data, isLoading}

}
