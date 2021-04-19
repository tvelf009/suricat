import React from 'react';
import { Box,
    SimpleGrid,
    GridItem,
    Text,
    Input,
    FormLabel, FormControl, FormHelperText, Select, Button, Center, Divider, HStack, IconButton} from "@chakra-ui/react";
import { MapComp } from './mapComp';
import { Icon, IconOptions, LatLngExpression, LatLngLiteral } from 'leaflet';
import CSS from 'csstype';
import { ResponceSearch, SearchResult } from '../util/interfaces';
import API from '../util/api';
import {  Marker, Popup, useMap, Polyline  } from 'react-leaflet';
import { ViewIcon } from '@chakra-ui/icons';
import { BASE_COORDINATE_EXPRESSION, BASE_COORDINATE_LITERAL } from '../util/constant';



const boxStyle2:CSS.Properties = {
    background: "#fff"
}

const gridStyle1:CSS.Properties = {
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    backgroundColor: "#ee7b5e",
    cursor: "pointer",
    color: "#fff"
}

const textStyle1:CSS.Properties = {
  color: "#000",
  fontSize: "18px",
  fontWeight: "bolder"
}

const gridStyle2:CSS.Properties = {
  border: "1px solid #e0e0e0",
  borderRadius: "5px",
  backgroundColor: '#f3f2f2'
}

const position = [
  {
    id: 11,
    name: "Комплектовщик"
  },
  {
    id: 12,
    name: "Уборщик"
  },
  {
    id: 13,
    name: "Грузчик"
  },
  {
    id: 14,
    name: "Разнорабочие"
  },
  {
    id: 15,
    name: "Работник склада"
  },
  {
    id: 16,
    name: "Автокурьер"
  },
  {
    id: 17,
    name: "Велокурьер"
  },
  {
    id: 13,
    name: "Пеший курьер"
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
        lat: BASE_COORDINATE_LITERAL.lat,
        lon: BASE_COORDINATE_LITERAL.lng,
        display_name: "Нет данных для отображения",
    }
  ])
  const [address, setAddress] = React.useState<string>("");
  const [coordinates, setCoordinates] = React.useState<LatLngLiteral>(BASE_COORDINATE_LITERAL);
  const [vacany, setVacancy] = React.useState<ResponceSearch[]>();
  const limeOptions = { color: 'red' }
  const [isLoadRes, setIsLoadRes] = React.useState<Boolean>(false);
  const [polyline, setPolyline] = React.useState<LatLngExpression[]>([BASE_COORDINATE_EXPRESSION]);
  const [markerOne, setMarkerOne] = React.useState<LatLngExpression>(BASE_COORDINATE_EXPRESSION);
  const [markerTwo, setMarkerTwo] = React.useState<LatLngExpression>(BASE_COORDINATE_EXPRESSION);
  const [logoUrl, setLogoUrl] = React.useState<string>("https://i.ibb.co/ZxWDKDF/logo-5ka.png");
  const [showVacancyBlock, setShowVacancyBlock] = React.useState<Boolean>();
  const [selectedPosition, setSelectedPosition] = React.useState<string>("1");

  


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

    const {data}:{data:ResponceSearch[]} = await API.searchVacancy(selectedPosition);
    setVacancy(data);
    setShowVacancyBlock(true);   

  }

  const MarkerSet = (lat1:number,lng1:number,lat2:number,lng2:number, logo:string) => {
    
    setMarkerOne([lat1, lng1]);
    setMarkerTwo([lat2, lng2]);
    setPolyline([
      [lat1, lng1],
      [lat2, lng2]
    ])
    setLogoUrl(logo)
    setIsLoadRes(true);
  }

  const CreateLineAndMarker = () => {
    
    const iconOptions:IconOptions = {
      iconUrl: logoUrl,
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      popupAnchor: [0, 0],
      className: "markerStyle1",
    } 

    const ic = new Icon(iconOptions);
    

    return (
      <>
        <Marker position={markerOne} >
          <Popup>
            <Button onClick={getVacancy}  >
              Найти рядом вакансии
            </Button>
          </Popup>
        </Marker>
        <Marker position={markerTwo} icon={ic}>
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
      <Marker position={coords} >
        <Popup>
          <Button onClick={getVacancy}>
            Найти рядом вакансии
          </Button>
        </Popup>
      </Marker>
    );
  }


    return (
        <Box boxShadow="xl" m={5} style={boxStyle2} p={3}>
              <Box >
                <Text fontSize="xl">Поиск</Text>
              </Box>
              <Divider mt={3} mb={3} />
              <Box >
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
                  <Select name="position_id" defaultValue={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
                    {
                      position.map((item, index) => (
                        <option value={item.id} key={index}>{item.name}</option>
                      ))
                    }
                  </Select>
                </FormControl>
                </GridItem>
                <GridItem>
                  <Button mt={8} onClick={getCompares} isFullWidth color="blue.800">
                  ПОИСК
                </Button>
                </GridItem>
              </SimpleGrid>
              </Box>
              <Divider mt={5} mb={5} />
              <SimpleGrid columns={[2, null, 12]} gap={5} >
                <GridItem colSpan={6}>
                  {

                      showVacancyBlock? (
                        <>
                        <Text fontSize="xl">
                          Расчет расстояния от сотрудника до филиалов
                        </Text>
                          <SimpleGrid columns={[2, null, 12]} gap={5} pt={5} pl={5} pr={5}>
                            <GridItem colSpan={3}>
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
                            <GridItem colSpan={1}>

                            </GridItem>
                          </SimpleGrid>
                          {
                            vacany?.map((item, index) => (
                              
                              <SimpleGrid columns={[2, null, 12]} style={gridStyle2} gap={5} key={index}  mt={3} mb={3} p={5} >
                                <GridItem colSpan={3} mt={1}>
                                    <Text style={textStyle1}>
                                      {item.company_name}
                                    </Text>
                                </GridItem>
                                <GridItem colSpan={2} mt={1}>
                                  <Text style={textStyle1}>
                                    {item.address}
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={2} mt={1}>
                                  <Text style={textStyle1}>
                                    {item.position_name}
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={2} mt={1}>
                                  <Text style={textStyle1}>
                                    {item.count}
                                  </Text>
                                </GridItem>
                                <GridItem colSpan={2} mt={1} >
                                  <HStack>
                                    <Center>
                                  <Text style={textStyle1}>
                                    {distanceInKmBetweenEarthCoordinates(coordinates.lat, coordinates.lng, item.lat, item.lon).toFixed(2)} км
                                  </Text>
                                  </Center>
                                  </HStack>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <IconButton
                                      colorScheme="blue"
                                      aria-label="Search database"
                                      icon={<ViewIcon />}
                                      onClick={() => MarkerSet(coordinates.lat, coordinates.lng, item.lat, item.lon, item.company_logo)}
                                      variant="outline"
                                    />
                                </GridItem>
                            </SimpleGrid>
                            ))
                            
                          }
                          <Divider mt={3} mb={3}/>
                        </>
                      ):(
                        null
                      )
                  }

                  <Text fontSize="xl" mb={3}>
                    Совпадения по улицам. Выберите правильный.
                  </Text>
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