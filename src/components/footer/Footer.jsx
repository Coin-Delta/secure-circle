import Logo from '../../assets/images/authpage/logo.svg';

function Footer() {
  return (
    <footer className="w-full border-t  border-border/40 bg-white py-3 ">
      <div className="container flex justify-between">
        <img src={Logo} alt="logo" className="" width={300} height={50} />
      
      </div>
    </footer>
  );
}

export default Footer;
