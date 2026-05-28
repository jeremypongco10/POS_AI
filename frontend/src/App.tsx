import {
  AccountTree,
  AdminPanelSettings,
  ArticleOutlined,
  Assessment,
  BadgeOutlined,
  BarChart,
  BusinessCenter,
  BusinessCenterOutlined,
  Edit,
  Gavel,
  Groups,
  HelpOutlined,
  History,
  HomeOutlined,
  ImageOutlined,
  KeyboardArrowUp,
  MailOutlined,
  Person,
  PersonRemoveOutlined,
  Search,
  SupervisorAccount,
  Work,
  WorkOutlined,
  PlaceOutlined,
  PaidOutlined,
  AssignmentTurnedIn,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CssBaseline,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import './App.css'

type NavItem = {
  label: string
  icon: SvgIconComponent
}

type ProfileDetail = {
  label: string
  value?: string
  icon: SvgIconComponent
  isLink?: boolean
}

type InfoSection = {
  title: string
  fields: Array<{
    label: string
    value?: string
  }>
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#002855',
    },
    secondary: {
      main: '#e8355d',
    },
    background: {
      default: '#f4f5f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#001a3a',
      secondary: '#3b4b63',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    button: {
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

const navItems: NavItem[] = [
  { label: 'Org Chart', icon: AccountTree },
  { label: 'Directory Search', icon: Search },
  { label: 'Approvals', icon: AssignmentTurnedIn },
  { label: 'Recruiting', icon: BusinessCenter },
  { label: 'Reporting', icon: Assessment },
  { label: 'Performance', icon: BarChart },
  { label: 'Careers', icon: Work },
  { label: 'Admin', icon: AdminPanelSettings },
]

const tabs = [
  'Personal',
  'Job',
  'History',
  'Documents',
  'Referrals',
  'Team',
  'Disciplinary Actions',
]

const profileDetails: ProfileDetail[] = [
  { label: 'Domain ID', value: 'abi.test', icon: BadgeOutlined, isLink: true },
  { label: 'Employee ID', value: '8254466', icon: BusinessCenterOutlined, isLink: true },
  { label: 'Job Title', value: 'Agent II', icon: WorkOutlined },
  { label: 'Business Email Address', icon: MailOutlined },
  { label: 'Supervisor/Manager', value: 'tony.tannous', icon: SupervisorAccount, isLink: true },
  { label: 'Work Location', value: 'Iloilo', icon: PlaceOutlined },
  { label: 'Functional Area', value: 'Client Services and Marketing', icon: Groups },
  { label: 'Profit Center', value: 'Tech-Innovation', icon: HomeOutlined },
  { label: 'Cost Center', value: 'Tech-Innovation', icon: PaidOutlined },
]

const infoSections: InfoSection[] = [
  {
    title: 'Basic Information',
    fields: [
      { label: 'Effective Date', value: '02/01/2026' },
      { label: 'First Name', value: 'Manolo Marco Antonio Fernando' },
      { label: 'Middle Name' },
      { label: 'Last Name', value: 'Oswaldo' },
      { label: 'Second Last Name' },
      { label: 'Salutation', value: 'Mr.' },
      { label: 'Preferred Name', value: 'Marco' },
      { label: 'Gender', value: 'Male' },
    ],
  },
  {
    title: 'Address',
    fields: [
      { label: 'Effective Date', value: '05/17/2024' },
      { label: 'Country', value: 'PHL' },
      { label: 'Address Type', value: 'Primary' },
      { label: 'House Number', value: '123' },
      { label: 'Street/Village/Subdivision/Barangay', value: 'Paseo de Iloilo' },
      { label: 'City/Municipality', value: 'Iloilo City' },
      { label: 'Province', value: 'Iloilo' },
      { label: 'Postal Code', value: '5000' },
    ],
  },
  {
    title: 'Contact Information',
    fields: [
      { label: 'Primary Phone', value: '+63 917 555 0142' },
      { label: 'Personal Email', value: 'marco.oswaldo@example.com' },
      { label: 'Emergency Contact', value: 'Ana Oswaldo' },
      { label: 'Relationship', value: 'Spouse' },
    ],
  },
  {
    title: 'Employment Details',
    fields: [
      { label: 'Hire Date', value: '05/17/2024' },
      { label: 'Employment Type', value: 'Regular' },
      { label: 'Pay Group', value: 'PH Semi-Monthly' },
      { label: 'Manager ID', value: '7012441' },
    ],
  },
]

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Paper
          component="aside"
          elevation={0}
          square
          sx={{
            width: 240,
            flex: '0 0 240px',
            display: { xs: 'none', md: 'block' },
            bgcolor: '#ffffff',
            borderRight: '1px solid #eef1f5',
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', px: 2, py: 2 }}>
            <Avatar sx={{ width: 37, height: 37, bgcolor: '#e8355d', fontWeight: 800 }}>
              iq
            </Avatar>
            <Typography sx={{ color: '#002855', fontSize: 23, lineHeight: 1, fontWeight: 500 }}>
              ENGAGE
              <Box component="span" sx={{ color: '#e8355d' }}>
                HR
              </Box>
            </Typography>
          </Stack>

          <List sx={{ px: 1.25, py: 1 }}>
            {navItems.map(({ label, icon: Icon }) => (
              <ListItemButton
                key={label}
                sx={{
                  minHeight: 48,
                  borderRadius: 1,
                  color: '#000000',
                  '&:hover': { bgcolor: '#f3f6fb' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 52, color: '#777777' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography sx={{ fontSize: 16, fontWeight: 400 }}>{label}</Typography>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        <Box component="main" sx={{ minWidth: 0, flex: 1 }}>
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              px: { xs: 2, md: 3 },
              pt: 2.5,
              pb: 1.75,
            }}
          >
            <TextField
              placeholder="Search"
              size="small"
              sx={{
                width: { xs: '100%', sm: 600 },
                maxWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#e5e9ef',
                  borderRadius: 12,
                  height: 46,
                  '& fieldset': { border: 0 },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#607086' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', display: { xs: 'none', sm: 'flex' } }}
            >
              <IconButton size="small" aria-label="Help">
                <HelpOutlined />
              </IconButton>
              <Avatar sx={{ width: 34, height: 34, bgcolor: '#f6c269', color: '#002855', fontSize: 13 }}>
                HR
              </Avatar>
            </Stack>
          </Stack>

          <Box sx={{ px: { xs: 2, md: 4.5 }, pb: 5 }}>
            <Tabs
              value={0}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 58,
                borderBottom: '1px solid #d4d8df',
                '& .MuiTab-root': {
                  color: '#002855',
                  minHeight: 58,
                  px: 2,
                  fontSize: 14,
                  alignItems: 'flex-end',
                  pb: 2,
                },
                '& .Mui-selected': { color: '#002855' },
                '& .MuiTabs-indicator': { bgcolor: '#002855', height: 2 },
              }}
            >
              {tabs.map((tab) => (
                <Tab key={tab} label={tab} />
              ))}
            </Tabs>

            <Card elevation={0} sx={{ mt: 4, overflow: 'hidden', borderRadius: 1, bgcolor: '#ffffff' }}>
              <Box sx={{ position: 'relative', px: { xs: 2, md: 2 }, pt: 2 }}>
                <IconButton
                  aria-label="Collapse profile"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 12,
                    bgcolor: '#edf1f5',
                    width: 40,
                    height: 40,
                    '&:hover': { bgcolor: '#e3e8ee' },
                  }}
                >
                  <KeyboardArrowUp sx={{ color: '#001a3a' }} />
                </IconButton>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, pr: 6 }}
                >
                  <Avatar sx={{ width: 80, height: 80, bgcolor: '#bfbfbf' }}>
                    <Person sx={{ color: '#001a3a', fontSize: 52 }} />
                  </Avatar>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={1.75}
                    sx={{ alignItems: { xs: 'flex-start', md: 'center' } }}
                  >
                    <Typography variant="h1" sx={{ color: '#000000', fontSize: { xs: 28, md: 35 }, fontWeight: 400, lineHeight: 1.25 }}>
                      Manolo Marco Antonio Fernando Oswaldo
                    </Typography>
                    <Chip
                      label="Active"
                      size="small"
                      sx={{ bgcolor: '#3c963c', color: '#ffffff', fontWeight: 700, height: 31, borderRadius: 16 }}
                    />
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      lg: 'repeat(4, minmax(0, 1fr))',
                    },
                    columnGap: 7,
                    rowGap: 2,
                    mt: 3.5,
                    pb: 2.5,
                  }}
                >
                  {profileDetails.map(({ label, value, icon: Icon, isLink }) => (
                    <Stack
                      direction="row"
                      spacing={1.25}
                      key={`${label}-${value ?? 'blank'}`}
                      sx={{ alignItems: 'flex-start' }}
                    >
                      <Icon sx={{ color: '#001a3a', fontSize: 22, mt: 0.15 }} />
                      <Box>
                        <Typography sx={{ color: '#001a3a', fontSize: 14, lineHeight: 1.35 }}>{label}</Typography>
                        {value ? (
                          <Typography sx={{ color: isLink ? '#006edc' : '#002855', fontSize: 14, lineHeight: 1.35 }}>
                            {value}
                          </Typography>
                        ) : null}
                      </Box>
                    </Stack>
                  ))}
                </Box>
              </Box>

              <Divider />

              <Stack
                direction="row"
                spacing={3}
                useFlexGap
                sx={{ flexWrap: 'wrap', justifyContent: 'flex-end', px: 2, py: 2 }}
              >
                <Button variant="outlined" startIcon={<ImageOutlined />} sx={actionButtonSx}>
                  Create Photo ID
                </Button>
                <Button variant="outlined" startIcon={<Gavel />} sx={actionButtonSx}>
                  New Disciplinary Action
                </Button>
                <Button variant="outlined" startIcon={<ArticleOutlined />} sx={actionButtonSx}>
                  Generate Letter
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PersonRemoveOutlined />}
                  sx={{
                    ...actionButtonSx,
                    bgcolor: '#002855',
                    color: '#ffffff',
                    borderColor: '#002855',
                    boxShadow: '0 4px 10px rgba(0, 40, 85, 0.35)',
                    '&:hover': { bgcolor: '#001f44', borderColor: '#001f44' },
                  }}
                >
                  Initiate Termination
                </Button>
              </Stack>
            </Card>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
                gap: 2,
                mt: 4,
              }}
            >
              {infoSections.map((section) => (
                <Card key={section.title} elevation={0} sx={{ borderRadius: 1, overflow: 'hidden', bgcolor: '#ffffff' }}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      bgcolor: '#f7f8fb',
                      justifyContent: 'space-between',
                      px: 1.5,
                      py: 2,
                    }}
                  >
                    <Typography variant="h2" sx={{ color: '#000000', fontSize: 21, fontWeight: 400 }}>
                      {section.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" aria-label={`${section.title} history`}>
                        <History sx={{ color: '#002855' }} />
                      </IconButton>
                      <IconButton size="small" aria-label={`Edit ${section.title}`}>
                        <Edit sx={{ color: '#002855' }} />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                      columnGap: 7,
                      rowGap: 3,
                      px: 2,
                      py: 2.5,
                    }}
                  >
                    {section.fields.map((field) => (
                      <Box key={`${section.title}-${field.label}`}>
                        <Typography sx={{ color: '#000000', fontSize: 16, lineHeight: 1.4 }}>
                          {field.label}
                        </Typography>
                        <Typography sx={{ color: field.value ? '#002855' : '#7f8895', fontSize: 14, lineHeight: 1.45 }}>
                          {field.value ?? 'Not specified'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

const actionButtonSx = {
  minHeight: 50,
  borderRadius: 8,
  px: 3,
  color: '#002855',
  borderColor: '#6da5ff',
  fontSize: 16,
  fontWeight: 400,
  '& .MuiButton-startIcon': { color: '#002855' },
  '&:hover': { borderColor: '#2c7bff', bgcolor: '#f4f8ff' },
}

export default App
