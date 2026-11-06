import Title from "./Header/Title";
import OptionsMenu from "./Header/OptionsMenu";

const Header = () => {
  return (
    <header className="bg-[white] border-b-[1px_solid_#D9DDE3]">
      <div className="max-w-[1120px] mx-[auto] my-[0] px-[24px] py-[0] min-h-[64px] flex items-center justify-between gap-[16px]">
        <Title />
        <OptionsMenu />
      </div>
    </header>
  );
};

export default Header;
