// 'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import Image from "next/image";

import AuthButton from "./AuthButton";

export default function NavBar() {

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold px-2 text-inherit">
            StockLib
          </p>
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
        <NavbarItem>
          <Link color="foreground" href="/news">
            Market News
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/stock-list">
            Stock List
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/watchlist">
            Watchlist
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
