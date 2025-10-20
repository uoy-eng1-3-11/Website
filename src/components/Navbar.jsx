import { href } from 'react-router-dom';
import CardNav from './CardNav'
import ElectricBorder from './ElectricBorder';

const Navbar = () => {
  const items = [
    {
      label: "Features",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Maze", ariaLabel: "Maze", href: "#features" },
        { label: "Events", ariaLabel: "Events", href : "#features" },
        { label: "Halfway Checkpoint", ariaLabel: "Halfway Checkpoint", href: "#features" }
      ]
    },
    {
      label: "Documentation", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Requirements", ariaLabel: "Requirements", href: '#requirements' },
        { label: "Architecture", ariaLabel: "Architecture", href: '#architecture' },
        { label: "Method selection and planning", ariaLabel: "Method selection and planning", href: '#method' },
        { label: "Risk assessment and mitigation", ariaLabel: "Risk assessment and mitigation", href: '#risk' }
      ]
    },
    {
      label: "About",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Overview", ariaLabel: "Overview", href:'#about'},
        { label: "Github", ariaLabel: "Github", href:'https://github.com/uoy-eng1-3-11'},
        { label: "Team", ariaLabel: "Team", href: "#about" }
      ]
    }
  ];

  return (
          <CardNav 
            logo={'/pattern.jpg'}
            logoAlt="Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
          />
  );
};

export default Navbar;