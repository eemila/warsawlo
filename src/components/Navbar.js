import React, { Component, Fragment} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faAt, faCompass, faInfoCircle, faMapMarkerAlt, faSearch, faCalculator, faEnvelope, faExclamationTriangle, faTimes, faStar } from '@fortawesome/free-solid-svg-icons'
// import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { css} from '@emotion/core'
import styled from '@emotion/styled'
// import {connect} from 'react-redux'
// import * as styleActions from '../store/actions/style'
import Logo from 'components/Logo'
import Icon from 'components/Icon'
import TimesIcon from '../images/icons/times.svg'
import BarsIcon from '../images/icons/bars.svg'
import ExclamationTriangleIcon from '../images/icons/exclamation-triangle.svg'
import { Link } from 'gatsby'
import theme from 'utils/theme'
const responsiveWidth = '1100px'

const Brand = styled(Link)`
&, &:visited, &:hover{
  background:initial;
}
all:unset;
cursor:pointer;
margin-right:20px;
font-size: 2em;
color:black !important;
display:flex;
align-items:center;
span:not(.highlight){
  font-family: ${theme.fonts.tertiary};
}
  span.highlight{
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.secondary}
  }
  svg{
    height:2.5em;

      path{
        fill: ${theme.colors.primary};
      }
  }
`
const Navbar = styled('nav')`
  @media (max-width: ${responsiveWidth}) {
    display:flex;
    align-items:center;
    justify-content:center;
  }
  @media print { 
    position:absolute; 
   }
  -webkit-transform: translateZ(0);
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:80px;
  display:flex;
  align-items:center;
  padding:0 20px 0 20px;
  background:white;
  z-index:99;
  border-bottom: 2px solid ${theme.colors.light};
`
const SearchInput = styled('input')`
  all:unset;
  display:inline-block;
  height: 1.2em;
  padding:10px;
  margin-right:10%;
  background rgb(230,230,230);
  border: 3px solid rgb(230,230,230);
  border-radius:3px;
  font-size: 1.2em;
  width:40%;
  transition: .2s all;
  &:focus{
    margin-left:-10%;
    width:50%;
    border: 3px solid rgb(210,210,210);
  }
  @media (max-width: ${responsiveWidth}) {
    display:none;
  }
`
const LinksContainer = styled('div')`
@media (max-width: ${responsiveWidth}) {
    display:none;
}
// transition: visibility 2s ease-in 0s, max-height 5s ease-in .2s;

display:flex;
align-items:center;
justify-content:space-between;
width:calc(100% - 20px);
div:not(&:last-child){
  display:flex;
  align-items:center;
  flex-wrap: nowrap;
  @media (max-width: ${responsiveWidth}) {
    display:block;
  }
}
`

const Action = styled('a')`
margin:10px;
&, &:visited, &:hover{
  color: ${theme.colors.primary};
  background:initial;
}
`
const NavLink = styled(Link)`
@media (max-width: ${responsiveWidth}) {
  display:block;
}
all:unset;
cursor:pointer;
margin:20px;
color: rgb(100, 100,100);
transition: .2s all;
&:visited{
  color: rgb(100, 100,100);
}
&:hover, &.active{
  background:initial;
  color:black;
}
`
const Top = styled('div')`
@media (max-width: ${responsiveWidth}) {
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
}
`
const ActionsWrapper = styled('div')`
@media (max-width: ${responsiveWidth}) {
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
}
display:inline-block;
`
const MobileNav  = styled('nav')` 
  position:fixed;
  top:80px;
  left:${props => props.active ? '0' : '-100%'};
  background:${theme.colors.secondary};
  height:calc(100vh - 80px);
  transition:left .2s;
  z-index:80;
  width:100%;
`
const MobileNavItem = styled(Link)`
  all:unset;
  cursor:pointer;
  user-select:none;
  display:block;
  color:white;
  font-family: ${theme.fonts.secondary};
  font-weight:700;
  margin:1em 0;
  font-size:2em;
  text-align:center;
  width:100%;
`
const Banner = styled('div')`
  position: fixed;
  top: 100px;
  left:50%;
  margin-right: -50%;
    transform: translate(-50%, 0);
    border-radius:5px;
  width:70%;
  @media (max-width: ${responsiveWidth}) {
    width:calc(100% - 2em);
    font-size:.7em;
  }

  background: ${theme.colors.secondary.replace('b', 'ba').replace(')', ', .9)')};
  color:white;
  z-index:90;
  transition: .5s all;
  &:hover{
    background: ${theme.colors.secondary};
  }
  .wrapper{
    height:100%;
    width:75%;
    margin:5px auto;
    display:flex;
    align-items:center;
    font-size:1.2em;
    position:relative;
    @media (max-width: ${responsiveWidth}) {
      width:calc(100% - 2em);
    
    }
  }
  svg:first-child{
    margin-right:1em;
  }
  .close{
    position:absolute;
    right:0;
    top: 50%;
    transform: translate(0, -50%);
    cursor:pointer;
  }
`
const MobileNavShortcut = styled('div')`
  position:fixed;
  right:20px;
  bottom:20px;
  padding:10px;
  border-radius:50%;
  background: ${props => props.closing ? 'white' : theme.colors.secondary};
  z-index:90;
  height:3em;
  width:3em;
  text-align:center;
  display: flex;
  align-items: center;
  transition: background .2s;
`
 class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      consent: false,
      siteLoading: false,
      banner: true,
      mobileNavOpen: false
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.isOpen !== this.state.isOpen){
      window.dispatchEvent(new Event('resize'));
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  hideBanner = () => {
    this.setState({
      banner:false
    })
  }
  isLinkActive = (pathname) => false
  handleSearch = (e) => {
    this.props.history.replace({
      pathname: '/search',
      search: `?query=${e.target.value.trim().split(' ').join('+')}`,
      state: {
        focus: true
      }
    })
    e.nativeEvent.target.value = ""
    e.nativeEvent.target.blur()
  }
  handlePrivacyModalClose = () => {
    this.setState({
      consent: true
    })
    localStorage.consent = true;
  }
  render() {
    console.log(this.props)
    // let openPrivacyModal = this.props.location.pathname !== '/' && !localStorage.consent && !this.state.consent
    return (
      <Fragment>
      <div>
        <Navbar className="navbar">

<Top opened={this.state.isOpen}>
          <Brand to="/"  onClick={this.toggle} >
          <Logo />
          <span>Warsaw<span className="highlight">LO</span></span>


        </Brand>
  </Top>

        <LinksContainer opened={this.state.isOpen} onClick={this.toggle}>
          <div>

              <NavLink to="/search" className={this.isLinkActive('/search')}>Szukaj</NavLink>


              <NavLink to="/calculator" className={this.isLinkActive('/calculator')}>Kalkulator punktów</NavLink>
              <NavLink to="/following" className={this.isLinkActive('/following')}>Obserwowane szkoły</NavLink>
          </div>
            <div>

              <ActionsWrapper>
<Action href="http://fb.com/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></Action>
  <Action href="https://m.me/warsawlo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></Action>
    <Action href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></Action>
</ActionsWrapper>
            </div>
            </LinksContainer>

        </Navbar>
      </div>
      {
        this.state.banner && (
          <Banner>
          <div className="wrapper">
          <Icon icon={ExclamationTriangleIcon} color="white" />
            <span>Strona jest obecnie w fazie beta. Niektóre funkcje mogą nie działać poprawnie.</span>
          <Icon icon={TimesIcon} className="close" color="rgba(255,255,255,0.7)" size="1.7em" onClick={this.hideBanner} />
            </div>
          </Banner>
        )
      }
      
        

        <MobileNavShortcut onClick={() => this.setState({
          mobileNavOpen: !this.state.mobileNavOpen
        })} closing={this.state.mobileNavOpen}>
          <Icon icon={this.state.mobileNavOpen ? TimesIcon : BarsIcon} color={this.state.mobileNavOpen ? theme.colors.secondary : 'white'} size="100%"/>
        </MobileNavShortcut>
        <MobileNav active={this.state.mobileNavOpen}>
        <div>
          <MobileNavItem to="/" onClick={() => this.setState({mobileNavOpen:false})}>
          Home
          </MobileNavItem>
          <MobileNavItem to="/search" onClick={() => this.setState({mobileNavOpen:false})}>
          Szukaj
          </MobileNavItem>
          <MobileNavItem to="/calculator" onClick={() => this.setState({mobileNavOpen:false})}>
          Kalkulator
          </MobileNavItem>
          <MobileNavItem to="/following" onClick={() => this.setState({mobileNavOpen:false})}>
          Obserwowane
          </MobileNavItem>
        </div>
        </MobileNav>
      </Fragment>
    );
  }
}
// <NavItem>
//
// </NavItem>
// <NavItem>
//   <NavLink href="/about" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookMessenger} size="2x"/></NavLink>
// </NavItem>
// <NavItem>
//   <NavLink href="mailto:info@warsawlo.pl" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faAt} size="2x"/></NavLink>
// </NavItem>

// Use connect to put them together
export default AppNavbar
