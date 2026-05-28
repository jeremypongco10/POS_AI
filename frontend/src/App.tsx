import { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  AccountTree,
  AdminPanelSettings,
  AssignmentTurnedIn,
  BarChart,
  BusinessCenter,
  CheckCircle,
  Close,
  Edit,
  Groups,
  HelpOutlined,
  LockReset,
  Person,
  PersonAddAlt1,
  Search,
  Security,
  Work,
  Home,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import './App.css'
import UserMenu from './components/UserMenu';

type NavItem = {
  label: string
  icon: SvgIconComponent
}

type UserStatus = 'Active' | 'Inactive' | 'Locked'
type UserRole = 'HR Admin' | 'Recruiter' | 'Manager' | 'Employee'

type UserRecord = {
  id: number
  name: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  department: string
  location: string
  lastLogin: string
  mfaEnabled: boolean
}

type UserForm = {
  name: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  department: string
  location: string
  mfaEnabled: boolean
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

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home },
  { label: 'Users', icon: GroupIcon },
  { label: 'Settings', icon: SettingsIcon }
];

// Dummy UsersPage and SettingsPage for demonstration

function SettingsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4.5 } }}>
      <Typography variant="h1" sx={{ color: '#002855', fontSize: { xs: 30, md: 38 }, fontWeight: 400, mb: 2 }}>
        Settings
      </Typography>
      <Typography sx={{ color: '#607086', fontSize: 18 }}>
        This is the Settings view.
      </Typography>
    </Box>
  );
}


import RolePage from './pages/RolePage';
import AdminPage from './pages/AdminPage';

function DashboardPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4.5 } }}>
      <Typography variant="h1" sx={{ color: '#002855', fontSize: { xs: 30, md: 38 }, fontWeight: 400, mb: 2 }}>
        Welcome to the Dashboard
      </Typography>
      <Typography sx={{ color: '#607086', fontSize: 18 }}>
        Select a menu item to get started.
      </Typography>
    </Box>
  );
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppSidebar />
        <Box component="main" sx={{ minWidth: 0, flex: 1 }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/roles" element={<RolePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function AppSidebar() {
  return (
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
        <Avatar sx={{ width: 37, height: 37, bgcolor: '#e8355d', fontWeight: 800 }}>iq</Avatar>
        <Typography sx={{ color: '#002855', fontSize: 23, lineHeight: 1, fontWeight: 500 }}>
          ENGAGE
          <Box component="span" sx={{ color: '#e8355d' }}>
            HR
          </Box>
        </Typography>
      </Stack>
      <Box sx={{ px: 1.25, py: 1 }}>
        <UserMenu />
      </Box>
    </Paper>
  );
}

function Topbar() {
  return (
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
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', display: { xs: 'none', sm: 'flex' } }}>
        <IconButton size="small" aria-label="Help">
          <HelpOutlined />
        </IconButton>
        <Avatar sx={{ width: 34, height: 34, bgcolor: '#f6c269', color: '#002855', fontSize: 13 }}>HR</Avatar>
      </Stack>
    </Stack>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  tone = 'primary',
}: {
  label: string
  value: number
  icon: SvgIconComponent
  tone?: 'primary' | 'success' | 'warning'
}) {
  const color = tone === 'success' ? '#217a39' : tone === 'warning' ? '#a65f00' : '#002855'
  const bgColor = tone === 'success' ? '#e8f5ed' : tone === 'warning' ? '#fff4df' : '#eef4ff'

  return (
    <Card elevation={0} sx={{ borderRadius: 1, p: 2, bgcolor: '#ffffff' }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ color: '#607086', fontSize: 13 }}>{label}</Typography>
          <Typography sx={{ color: '#000000', fontSize: 30, fontWeight: 600, lineHeight: 1.2 }}>
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: bgColor, color }}>
          <Icon />
        </Avatar>
      </Stack>
    </Card>
  )
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function roleChipSx(role: UserRole) {
  const colorByRole: Record<UserRole, { bg: string; color: string }> = {
    'HR Admin': { bg: '#edf3ff', color: '#002855' },
    Recruiter: { bg: '#f3eefe', color: '#5636a3' },
    Manager: { bg: '#fff4df', color: '#8a5300' },
    Employee: { bg: '#edf7f8', color: '#12616a' },
  }

  return {
    bgcolor: colorByRole[role].bg,
    color: colorByRole[role].color,
    fontWeight: 700,
  }
}

function statusChipSx(status: UserStatus) {
  const colorByStatus: Record<UserStatus, { bg: string; color: string }> = {
    Active: { bg: '#e8f5ed', color: '#217a39' },
    Inactive: { bg: '#eef1f5', color: '#607086' },
    Locked: { bg: '#fff0f2', color: '#b4233f' },
  }

  return {
    bgcolor: colorByStatus[status].bg,
    color: colorByStatus[status].color,
    fontWeight: 700,
  }
}

const outlineActionSx = {
  minHeight: 42,
  borderRadius: 8,
  px: 2.5,
  color: '#002855',
  borderColor: '#6da5ff',
  '& .MuiButton-startIcon': { color: '#002855' },
  '&:hover': { borderColor: '#2c7bff', bgcolor: '#f4f8ff' },
}

const primaryActionSx = {
  minHeight: 42,
  borderRadius: 8,
  px: 2.5,
  bgcolor: '#002855',
  color: '#ffffff',
  boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)',
  '&:hover': { bgcolor: '#001f44' },
}

export default App
