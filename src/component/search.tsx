import React from 'react';
import { Box,
    SimpleGrid,
    GridItem,
    Text,
    Input,
    FormLabel, FormControl, FormHelperText, Select, Button, Center, Divider, HStack, IconButton } from "@chakra-ui/react";
import { MapComp } from './mapComp';
import { LatLngExpression, LatLngLiteral } from 'leaflet';
import CSS from 'csstype';
import { ResponceSearch, SearchResult } from '../util/interfaces';
import API from '../util/api';
import {  Marker, Popup, useMap, Polyline  } from 'react-leaflet';
import { MarkunreadTwoTone } from '@material-ui/icons';
import { SearchIcon } from '@chakra-ui/icons';


const boxStyle2:CSS.Properties = {
    background: "#fff"
}

const gridStyle1:CSS.Properties = {
    border: "1px solid #e0e0e0",
    borderRadius: "5px"
}

const position = [
  {
    id: 1,
    name: "Курьер"
  },
  {
    id: 5,
    name: "ВМенеджер"
  }
]


  
function degreesToRadians(degrees:any) {
    return degrees * Math.PI / 180;
}
  
function distanceInKmBetweenEarthCoordinates(lat1:number, lon1:number, lat2:number, lon2:number) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}




export const Search = () => {

    
  const [result, setResult] = React.useState<SearchResult[]>([
    {
        lat: 42.869953100000004,
        lon: 74.68968257146773,
        display_name: "Нет данных для отображения",
    }
  ])
  const [address, setAddress] = React.useState<string>("");
  const [coordinates, setCoordinates] = React.useState<LatLngLiteral>({
    lat: 42.8734304,
    lng: 74.5807762
  });
  const [vacany, setVacancy] = React.useState<ResponceSearch[]>();
  const limeOptions = { color: 'red' }
  const [isLoadRes, setIsLoadRes] = React.useState<Boolean>(false);
  const [polyline, setPolyline] = React.useState<LatLngExpression[]>([[42.86, 74.68]]);
  const [markerOne, setMarkerOne] = React.useState<LatLngExpression>([42.86, 74.68]);
  const [markerTwo, setMarkerTwo] = React.useState<LatLngExpression>([42.86, 74.68]);
  


  const getCompares = async() => {
    const {data} =  await API.getCoordinateByAddress(address);
    setResult(data)
    console.log(result);  
  }

  const setAddressF = (e:React.ChangeEvent<any>) => {
    setAddress(e.target.value)
  }

  const getToPoint = async(lat:any, lon:any) => {
      let data: LatLngLiteral = {
        lat: lat,
        lng: lon
      };
      setCoordinates(data);
  }

  const getVacancy = async() => {
    const {data}:{data:ResponceSearch[]} = await API.searchVacancy(5);
    setVacancy(data);    
  }

  const MarkerSet = (lat1:number,lng1:number,lat2:number,lng2:number) => {
    
    setMarkerOne([lat1, lng1]);
    setMarkerTwo([lat2, lng2]);
    setPolyline([
      [lat1, lng1],
      [lat2, lng2]
    ])

    setIsLoadRes(true);
    console.log(lat1, lng1, lat2, lng2);
    
  }

  const CreateLineAndMarker = () => {
    return (
      <>
        <Marker position={markerOne}>
          <Popup>
            <Button onClick={getVacancy}>
              Найти рядом вакансии
            </Button>
          </Popup>
        </Marker>
        <Marker position={markerTwo}>
          <Popup>
            <Button onClick={getVacancy}>
              Найти рядом вакансии
            </Button>
          </Popup>
        </Marker>
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </>
    );
  }

  const ChangeCenter = ({coords}:{coords:LatLngExpression}) => {
    const smap = useMap();
    smap.setView(coords, 17);
  
    return (
      <Marker position={coords}>
        <Popup>
          <Button onClick={getVacancy}>
            Найти рядом вакансии
          </Button>
        </Popup>
      </Marker>
    );
  }


    return (
        <Box boxShadow="xl" m={5} style={boxStyle2} p={2}>
              <Box >
                <Text fontSize="xl">Поиск</Text>
              </Box>
              <Divider mt={3} mb={3} />
              <SimpleGrid columns={[1, null, 3]} gap={10}>
                <GridItem>
                  <FormControl id="address">
                    <FormLabel>Адрес соискателя</FormLabel>
                    <Input type="address" onChange={setAddressF}/>
                    <FormHelperText>Пример: Бишкек Чуй 256.</FormHelperText>
                  </FormControl>
                </GridItem>
                <GridItem>
                <FormControl id="country">
                  <FormLabel>Выберите тип должности</FormLabel>
                  <Select name="position_id">
                    {
                      position.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))
                    }
                  </Select>
                </FormControl>
                </GridItem>
                <GridItem>
                  <Button mt={8} onClick={getCompares} isFullWidth colorScheme="blue">
                  ПОИСК
                </Button>
                </GridItem>
              </SimpleGrid>

              <SimpleGrid columns={[2, null, 12]} gap={5}>
                <GridItem colSpan={6}>
                  <SimpleGrid columns={[2, null, 12]} gap={5} >
                        <GridItem colSpan={2}>
                          <Text>
                            Компания
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            Адрес
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            Позиция
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <Text>
                            Кол-во
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            Расстояние
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2}>
                          Показать
                        </GridItem>
                    </SimpleGrid>
                  {
                    vacany?.map((item, index) => (
                      <SimpleGrid columns={[2, null, 12]} gap={5} key={index} p={3}>
                        <GridItem colSpan={2} >
                          <Text>
                            {item.company_name}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            {item.address}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            {item.position_name}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <Text>
                            {item.count}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={2} >
                          <HStack>
                          <Text>
                            {distanceInKmBetweenEarthCoordinates(coordinates.lat, coordinates.lng, item.lat, item.lon).toFixed(2)} км
                          </Text>
                          </HStack>
                        </GridItem>
                        <GridItem colSpan={2}>
                          <IconButton
                              mt={2}
                              colorScheme="blue"
                              aria-label="Search database"
                              icon={<SearchIcon />}
                              onClick={() => MarkerSet(coordinates.lat, coordinates.lng, item.lat, item.lon)}
                            />
                        </GridItem>
                    </SimpleGrid>
                    ))
                  }
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
                <GridItem colSpan={6}>
                  <MapComp coords={coordinates} >
                      <ChangeCenter coords={coordinates}/>
                      {
                        isLoadRes? (
                          <CreateLineAndMarker />
                        ):(
                          null
                        )
                      }
                      
                  </MapComp>
                </GridItem>
              </SimpleGrid>
              <Divider mt={3} mb={3} />
              <Box>
                <Center>
                <Button>
                  
                </Button>
                </Center>
              </Box>
              
            </Box>
    )
}


export default Search;