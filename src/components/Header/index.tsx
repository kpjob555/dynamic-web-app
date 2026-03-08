import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const ScHeader = styled.header`
  padding: 14px 32px;
  background: linear-gradient(135deg, rgba(15, 12, 41, 0.95) 0%, rgba(48, 33, 109, 0.9) 50%, rgba(72, 47, 141, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
`

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &:hover {
    opacity: 0.85;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 6px;
`

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.65)')};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 10px;
  background: ${({ $active }) => ($active ? 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)' : 'transparent')};
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? '0 2px 12px rgba(124, 58, 237, 0.4)' : 'none')};

  &:hover {
    color: #fff;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(99, 102, 241, 0.4) 100%);
    transform: translateY(-1px);
  }
`

export function Header(): React.ReactElement {
  const location = useLocation()

  return (
    <ScHeader>
      <Logo to="/configuration">Dynamic Web App</Logo>
      <Nav>
        <NavLink to="/configuration" $active={location.pathname === '/configuration'}>
          ⚙️ Configuration
        </NavLink>
        <NavLink to="/preview" $active={location.pathname === '/preview'}>
          👁️ Preview
        </NavLink>
      </Nav>
    </ScHeader>
  )
}
