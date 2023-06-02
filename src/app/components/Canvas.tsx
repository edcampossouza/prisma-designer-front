"use client";
import Xarrow, { Xwrapper } from "react-xarrows";
import DataModel from "./prisma-objects/DataModel";

export default function Canvas() {
  return (
    <main>
      <Xwrapper>
        <DataModel fields={["id", "name"]} name="user" />
        <DataModel fields={["id", "text", "userId"]} name="post" />
        <Xarrow start="post#userId" end="user#id"></Xarrow>
      </Xwrapper>
    </main>
  );
}
