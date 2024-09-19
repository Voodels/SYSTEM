import { Theme, Container, Grid, Box, Heading, Text, Button, Flex, Card } from '@radix-ui/themes'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, MagnifyingGlassIcon, PersonIcon, GearIcon, BarChartIcon } from '@radix-ui/react-icons'
import Tasks from '../components/Tasks.js';
import { useState } from 'react'

const bentoItems = [
  { id: 'tasks', title: 'Tasks', icon: <MagnifyingGlassIcon />, component: <Tasks /> },
  { id: 'calendar', title: 'Calendar', icon: <PersonIcon />, component: <Text>Calendar Placeholder</Text> },
  { id: 'notes', title: 'Notes', icon: <GearIcon />, component: <Text>Notes Placeholder</Text> },
  { id: 'analytics', title: 'Analytics', icon: <BarChartIcon />, component: <Text>Analytics Placeholder</Text> },
  { id: 'calendar', title: 'Calendar', icon: <PersonIcon />, component: <Text>Calendar Placeholder</Text> },
  { id: 'notes', title: 'Notes', icon: <GearIcon />, component: <Text>Notes Placeholder</Text> },
  { id: 'analytics', title: 'Analytics', icon: <BarChartIcon />, component: <Text>Analytics Placeholder</Text> },
  { id: 'calendar', title: 'Calendar', icon: <PersonIcon />, component: <Text>Calendar Placeholder</Text> },
  { id: 'notes', title: 'Notes', icon: <GearIcon />, component: <Text>Notes Placeholder</Text> },
  { id: 'analytics', title: 'Analytics', icon: <BarChartIcon />, component: <Text>Analytics Placeholder</Text> },
]

export default function Home() {
  return (
    <Theme appearance="dark" accentColor="cyan" grayColor="slate" radius="large" scaling="95%" className=' p-5 h-[100%] w-full'>
      <Container size="4" className="py-8">
        <Heading size="8" className="text-center mb-8">Home</Heading>
        <Grid columns={{ initial: '2', xs: '3', sm: '4', md: '5' }} gap="4">
          {bentoItems.map((item) => (
            <BentoCard key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </Theme>
  )
}

function BentoCard({ id, title, icon, component }) {
  const [open, setOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Heading size="3">{title}</Heading>
          {icon}
        </Flex>
        <Box className="h-40 overflow-hidden">
          {component}
        </Box>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button variant="soft">View Full</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gray-900 rounded-lg p-6 overflow-auto">
              <Dialog.Title className="text-2xl font-bold mb-4">{title}</Dialog.Title>
              <Box className="mb-4">
                {component}
              </Box>
              <Dialog.Close asChild>
                <Button className="absolute top-4 right-4" variant="ghost">
                  <Cross2Icon />
                </Button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Flex>
    </Card>
  )
}