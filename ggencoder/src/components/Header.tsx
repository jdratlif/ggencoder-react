type HeaderProps = {
  version: string;
};

const Header = ({ version }: HeaderProps) => {
  return (
    <header>
      <h1>Game Genie Encoder/Decoder v{version}</h1>
    </header>
  );
};

export default Header;
