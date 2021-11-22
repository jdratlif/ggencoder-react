type HeaderProps = {
  version: string;
};

const Header = ({ version }: HeaderProps) => {
  return (
    <header>
      <h1 className="text-center">Game Genie Encoder/Decoder</h1>
      <h2 className="text-center">Version {version}</h2>
    </header>
  );
};

export default Header;
