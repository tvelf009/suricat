import { Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react"
import { Component } from "react";
import MainBlock1 from "./mainBlock1";
import VacancyList from "./vacancyList";



export class Vacancy extends Component<{}, {}>{

    render(){
        return (
            <MainBlock1 title="Вакансии">
                <Tabs>
                <TabList>
                    <Tab>Список вакансии</Tab>
                </TabList>
    
                <TabPanels>
                    <TabPanel>
                        <VacancyList/>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </MainBlock1>
        )
    }

}

export default Vacancy;