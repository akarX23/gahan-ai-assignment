import HomeIcon from '@mui/icons-material/Home'
import ApartmentIcon from '@mui/icons-material/Apartment'
import InfoIcon from '@mui/icons-material/Info'
import ContactMailIcon from '@mui/icons-material/ContactMail'

export const navBarLinks = [
  {
    link: '/',
    text: 'Home',
    Icon: HomeIcon,
  },
  {
    link: '/portfolio',
    text: 'Portfolio',
    Icon: ApartmentIcon,
  },
  {
    link: '/about',
    text: 'About',
    Icon: InfoIcon,
  },
  {
    link: '/contact',
    text: 'Contact',
    Icon: ContactMailIcon,
  },
]

export const validationTypes = Object.freeze({
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE: 'phone',
  OTP: 'otp',
})

export const internalError = {
  status: 500,
  message: 'Internal Error occurred',
}

export const statusCode = Object.freeze({
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalError: 500,
  Failure: 300,
  Exists: 409,
  InvalidData: 422,
  SessionTimeout: 599,
  Timeout: 408,
})

export const purchaseTypes = [
  {
    text: 'Buy',
    value: 'buy',
  },
  { text: 'Rent', value: 'rent' },
]

export const cookieOptions = {
  httpOnly: true,
  maxAge: 2592000,
  path: '/',
  sameSite: 'Strict',
  secure: true,
}
