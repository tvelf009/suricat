import { Box, FormControl,
    FormLabel,
    Input, Button, Alert, AlertIcon, InputGroup, InputRightElement, SimpleGrid, GridItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react"
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLngLiteral, LeafletMouseEvent } from 'leaflet';
import { MapComp } from "./mapComp";
import { ResponceBranches, ResponceCompany, SearchResult } from "../util/interfaces";
import API from "../util/api";
import CSS from 'csstype';
import { BASE_COORDINATE_LITERAL } from "../util/constant";

const gridStyle1:CSS.Properties = {
    border: "1px solid #e0e0e0",
    borderRadius: "5px"
}



const  BranchesAdd = () => {

    const [isAdded] = useState(false)
    const [position, setPosition] = useState<LatLngLiteral>(BASE_COORDINATE_LITERAL)
    const [allCompany, setAllCompany]  = useState<ResponceCompany[]>();
    const [address, setAddress] = useState<string>("")
    const [result, setResult] = useState<SearchResult[]>([
        {
            lat: BASE_COORDINATE_LITERAL.lat,
            lon: BASE_COORDINATE_LITERAL.lng,
            display_name: "Нет данных для отображения",
        }
    ])


    const showPointOnMap = async() => {
        const {data} =  await API.getCoordinateByAddress(address);
        setResult(data);
    }

    useEffect(() => {
        const load = async() => {
            const {data} = await API.getCompany();
            setAllCompany(data)

        }

        load();
    }, [])


    const submitForm = async(event:React.FormEvent) => {
        event.preventDefault();
        const { address, id_company  } = event.target as any;
        let req:ResponceBranches = {
            address: address.value,
            id_company: id_company.options[id_company.selectedIndex].value,
            lat: position.lat,
            lon: position.lng
        }

        const {addData, status} = await  API.addBranches(req);
        console.log(addData, status);
        
    }

    const AddMarker = () => {
        const map = useMapEvents({
            click(e:LeafletMouseEvent) {
                setPosition(e.latlng)
            }
        })
        map.setView(position, 17)

        return (
            <Marker position={position}>
              <Popup>
                Филиал
              </Popup>
            </Marker>
        );
    }

    const getToPoint = (lat:any, lon:any) => {
        let data:LatLngLiteral = {
            lat: lat,
            lng: lon
        };
        setPosition(data);
    }

    return (
        
        <Box >
                <form encType="multipart/form-data" onSubmit={submitForm}>
                {
                    isAdded ? (
                        <Alert status="success">
                            <AlertIcon />
                            Data uploaded to the server. Fire on!
                        </Alert>
                    ):(
                        null
                    )
                }
                <FormControl id="company" isRequired>
                    <FormLabel>Адрес филиала</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type="text"
                            placeholder="Введите адрес"
                            name="address"
                            value={address}
                            onChange={(e:any) => setAddress(e.target.value)}
                        />
                        <InputRightElement width="13rem">
                            <Button h="2rem" size="lg" onClick={showPointOnMap}>
                                Найти соответствие
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Box>
                    <SimpleGrid columns={[2, null, 12]} gap={5} mt={8}>
                        <GridItem colSpan={4} >  
                        <FormControl id="company" isRequired mb={5}>
                            <FormLabel>Выберите компанию </FormLabel>
                            <Select name="id_company" >
                                {
                                    allCompany?.map((item,index) => (
                                        <option value={item.id} key={index}>{item.company_name}</option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {
                            result.map((item, index) => (
                                <SimpleGrid key={index} style={gridStyle1} p={5} mb={3} onClick={() => getToPoint(item.lat, item.lon)}>
                                <GridItem >
                                    <Text >{item.display_name}</Text>
                                </GridItem>
                                </SimpleGrid>
                            ))
                        }
                        </GridItem>
                        <GridItem colSpan={8}>
                            <MapComp coords={position}>
                                <AddMarker />
                            </MapComp>
                        </GridItem>
                    </SimpleGrid>

                </Box>

                <Button mt={5} colorScheme="blue" type="submit">
                    Добавить
                </Button>
                </form>
        </Box>
    )
    

}

export default BranchesAdd;