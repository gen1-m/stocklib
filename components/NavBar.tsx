"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Params {
  authButton: any;
}

export default function NavBar(params: Params) {
  const handleActivePage = (page: string) => {
    const pathname: string = usePathname();
    if (pathname == page) return true;

    return false;
  };

  return (
    <Navbar
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-orange-500",
        ],
      }}
    >
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold px-2 text-inherit">StockLib</p>
          <Image
            className="h-8 w-auto bg-white rounded-md"
            width={150}
            height={150}
            src="https://api.iconify.design/arcticons:stockswidget.svg"
            alt="StockLib Logo"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={handleActivePage("/news")}>
          <Link color="foreground" href="/news">
            News
          </Link>
        </NavbarItem>
        <NavbarItem isActive={handleActivePage("/stock-list")}>
          <Link color="foreground" href="/stock-list">
            Stock List
          </Link>
        </NavbarItem>
        <NavbarItem isActive={handleActivePage("/watchlist")}>
          <Link color="foreground" href="/watchlist">
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">{params.authButton}</NavbarContent>
    </Navbar>
  );
}