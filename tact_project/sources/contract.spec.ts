import { toNano, Cell, BitString } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { SampleJetton } from "./output/sample_SampleJetton";
import { UltraMinter } from "./output/sample_UltraMinter";
import { buffer } from "stream/consumers";

describe("Sample contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let content = new Cell();
        let buffer = Buffer.from("LOL");
        content = new Cell({bits: new BitString(buffer, 0, buffer.length)});
        let contract = system.open(await SampleJetton.fromInit(owner.address, content, BigInt(1000), BigInt(0)));
        system.name(contract.address, "main");
        let track = system.track(contract);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect((await contract.getGetJettonData()).totalSupply).toEqual(0n);

        await contract.send(owner, { value: toNano(1) }, { $$type: "Mint", amount: BigInt(666), receiver: owner.address});
        await system.run();
        expect((await contract.getGetJettonData()).totalSupply).toEqual(BigInt(666));
        let actual_content = (await contract.getGetJettonData()).content
        expect(actual_content.bits.toString()).toEqual((new BitString(buffer, 0, buffer.length)).toString());
        buffer = Buffer.from("LOL");
        expect(actual_content.bits.toString()).toEqual((new BitString(buffer, 0, buffer.length)).toString()); 
    });
});


function strToCell(str:string): Cell {
  const buff = Buffer.from(str);
  return new Cell({bits: new BitString(buff, 0, buff.length)})
}

function cellToStr(cell:Cell,): string | undefined {
  // const buff = Buffer.from();
  return cell.bits.subbuffer(0, cell.bits.length)?.toString();
  // return new Cell({bits: new BitString(buff, 0, buff.length)})
}

describe("UltraMinter contract", () => {
  it("should deploy correctly", async () => {
      // Create ContractSystem and deploy contract
      let system = await ContractSystem.create();
      let owner = system.treasure("owner");
      let nonOwner = system.treasure("non-owner");
      // let content = new Cell();
      // let buffer = Buffer.from("LOL");
      // content = new Cell({bits: new BitString(buffer, 0, buffer.length)});
      let contract = system.open(await UltraMinter.fromInit(owner.address));
      system.name(contract.address, "main");
      let track = system.track(contract);
      await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
      await system.run();

      expect(await contract.getGetQequ()).toEqual(0n);
      let content = strToCell("LOL");
      await contract.send(owner, { value: toNano(1) }, { $$type: "AnotherDep", content: content, amount: BigInt(666)});
      await system.run();

      expect(await contract.getGetQequ()).toEqual(BigInt(1));
      expect(await contract.getIdToAddress(BigInt(0))).toBeTruthy();
      expect(await contract.getIdToAddress(BigInt(1))).toBeFalsy();



      // expect((await contract.getGetJettonData()).totalSupply).toEqual(BigInt(666));
      // let actual_content = (await contract.getGetJettonData()).content
      // expect(actual_content.bits.toString()).toEqual((new BitString(buffer, 0, buffer.length)).toString());
      // buffer = Buffer.from("LOL");
      // expect(actual_content.bits.toString()).toEqual((new BitString(buffer, 0, buffer.length)).toString()); 
  });
});
