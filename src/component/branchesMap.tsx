import { Box } from "@chakra-ui/react"
import { MapComp } from "./mapComp";
import { BASE_COORDINATE_LITERAL } from "../util/constant";
import { useEffect, useState } from "react";
import API from "../util/api";
import { ResponceBranches } from "../util/interfaces";
import MarkerComp from "./markerComp";

const  BranchesMap = ({company_id}:{company_id:number}) => {

  const [companyList, setCompanyList] = useState<ResponceBranches[]>();

  useEffect(() => {
    const load = async() => {
      const {data} = await API.getCompanyBranches(company_id);
      setCompanyList(data);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




    return (
        
        <Box >
          <MapComp coords={BASE_COORDINATE_LITERAL}>
              {
                companyList?.map((item, index) => (
                  <MarkerComp logoUrl={item.logo || "https://i.ibb.co/vcfqdjg/search.png"} coords={{lat:item.lat, lng:item.lon}} key={index}/>
                ))
              }
          </MapComp>
        </Box>
    )
    

}

export default BranchesMap;