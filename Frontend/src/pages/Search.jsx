import Header from "../components/Header.jsx";
import {Box, Tabs, Text} from "@radix-ui/themes";

function Search() {
    return (
        <>
            <Header/>

            <div className="search">
                <Tabs.Root defaultValue="Lundi">
                    <Tabs.List>
                        <Tabs.Trigger value="Lundi">Lundi</Tabs.Trigger>
                        <Tabs.Trigger value="Mardi">Mardi</Tabs.Trigger>
                        <Tabs.Trigger value="Mercredi">Mercredi</Tabs.Trigger>
                        <Tabs.Trigger value="Jeudi">Jeudi</Tabs.Trigger>
                        <Tabs.Trigger value="Vendredi">Vendredi</Tabs.Trigger>
                        <Tabs.Trigger value="Samedi">Samedi</Tabs.Trigger>
                        <Tabs.Trigger value="Dimanche">Dimanche</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="Lundi">
                            <Text size="2">Make changes to your account.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Mardi">
                            <Text size="2">Access and update your documents.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Mercredi">
                            <Text size="2">Edit your profile or update contact information.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Jeudi">
                            <Text size="2">Edit your profile or update contact information.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Vendredi">
                            <Text size="2">Edit your profile or update contact information.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Samedi">
                            <Text size="2">Edit your profile or update contact information.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="Dimanche"></Tabs.Content>
                    </Box>
                </Tabs.Root>
            </div>
        </>
    )
}

export default Search;