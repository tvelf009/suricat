import { Text, Box, Divider, IconButton, HStack, Center, SimpleGrid, GridItem   } from "@chakra-ui/react"
import { Component } from "react";
import API from "../util/api";
import { ResponceSearch } from '../util/interfaces'
import { EditIcon } from '@chakra-ui/icons'

type Result = {
    data: ResponceSearch[],
    status: number
}

export class VacancyList extends Component<{}, Result>{

    readonly state = {
        status: 100,
        data: [{
            id: 0,
            address: "",
            id_company: 0,
            lat: 0,
            lon: 0,
            company_name: "",
            count: 0,
            position_name: "",
            company_logo: "",
            salary: ""
        }]
    }

    async componentDidMount(){
        const {data, status}:{data:ResponceSearch[], status:number} = await API.getVacancy();
        this.setState({
            data: data,
            status: status
        })
        console.log(this.state.data, status);        
    }
    
    render(){
        return (
            <Box>
                {
                    this.state.status === 200 ? (
                        this.state.data.map((item, index) => (
                            <>
                                <SimpleGrid key={index} columns={[2, null, 6]}>
                                    <GridItem>
                                        <Text mt={5}>{item.company_name}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text mt={5}> {item.address} </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text mt={5}> {item.position_name} </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text mt={5}> {item.count} </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text mt={5}> {item.salary} </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text  mt={5}>
                                            изменить
                                        </Text>
                                    </GridItem>
                                </SimpleGrid>
                                <Divider/>
                            </>
                        ))
                    ):(
                        <Text>
                            Загрузка данных
                        </Text>
                    )

                }
            </Box>
        )
    }

}

export default VacancyList;