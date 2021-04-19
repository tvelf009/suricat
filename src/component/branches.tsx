import { Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react"
import { Component } from "react";
import MainBlock1 from "./mainBlock1";
import BranchesList from "./branchesList";

  

export class Branches extends Component<{}, {}>{

    render(){
        return (
            <MainBlock1 title="Филиалы">
                <Tabs>
                <TabList>
                    <Tab>Список филиалов</Tab>
                </TabList>
    
                <TabPanels>
                    <TabPanel>
                        <BranchesList/>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </MainBlock1>
        )
    }

}

export default Branches;