import { Box   } from "@chakra-ui/react"
import { Component } from "react";
import API from "../util/api";
import { ResponceBranches } from '../util/interfaces'
import { MapComp } from "./mapComp";
import { BASE_COORDINATE_LITERAL } from "../util/constant";
import MarkerComp from "./markerComp";

type Result = {
    data: ResponceBranches[],
    status: number
}

export class BranchesList extends Component<{}, Result>{

    readonly state = {
        status: 100,
        data: [{
            id: 0,
            address: "",
            id_company: 0,
            lat: 0,
            lon: 0,
            logo: "https://i.ibb.co/vcfqdjg/search.png"
        }]
    }

    async componentDidMount(){
        const {data, status}:{data:ResponceBranches[], status:number} = await API.getBranches();
        this.setState({
            data: data,
            status: status
        })
        console.log(this.state.data, status);        
    }
    
    render(){
        return (
            <Box>
                <MapComp coords={BASE_COORDINATE_LITERAL}>
                    {
                        this.state.status === 200 ? (
                            this.state.data.map((item, index) => (
                                <MarkerComp coords={[item.lat, item.lon]} logoUrl={item.logo} key={index} />
                            ))
                        ):(
                            null
                        )
                    }
                </MapComp>
            </Box>
        )
    }

}

export default BranchesList;