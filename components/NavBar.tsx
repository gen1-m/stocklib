"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Params {
  authButton: any;
  profileLink: any;
}

const styleItems = [
  "flex",
  "relative",
  "h-full",
  "items-center ",
  "data-[active=true]:after:content-['']",
  "data-[active=true]:after:absolute",
  "data-[active=true]:after:bottom-0",
  "data-[active=true]:after:left-0",
  "data-[active=true]:after:right-0",
  "data-[active=true]:after:h-[2px]",
  "data-[active=true]:after:rounded-[2px]",
  "data-[active=true]:after:bg-orange-500",
];

export default function NavBar(params: Params) {
  const authButton = params.authButton;
  const profileLink = params.profileLink;

  const pathname: string = usePathname();

  const handleActivePage = (page: string) => {
    return pathname == page;
  };

  return (
    !(pathname === "/") && (
      <Navbar isBordered classNames={{ item: styleItems }}>
        <NavbarBrand>
          <Link href="/" className="text-orange-500">
            <p className="font-semibold px-2">StockLib</p>
            <Image
              className="h-8 w-auto bg-white rounded-md"
              width={150}
              height={150}
              src="https://api.iconify.design/arcticons:stockswidget.svg"
              alt="StockLib Logo"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem isActive={handleActivePage("/news")}>
            <Link color="foreground" href="/news">
              News
            </Link>
          </NavbarItem>
          {/* <NavbarItem isActive={handleActivePage("/stock-list")}>
            <Link color="foreground" href="/stock-list">
              Stock List
            </Link>
          </NavbarItem>
          <NavbarItem isActive={handleActivePage("/watchlist")}>
            <Link color="foreground" href="/watchlist">
              Watchlist
            </Link>
          </NavbarItem>
          <NavbarItem isActive={handleActivePage("/websocket")}>
            <Link color="foreground" href="/websocket">
              Websocket
            </Link>
          </NavbarItem> */}
          <NavbarItem isActive={handleActivePage("/profile")}>
            {profileLink}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Button className="text-md bg-orange-700">{authButton}</Button>
        </NavbarContent>
      </Navbar>
    )
  );
}
