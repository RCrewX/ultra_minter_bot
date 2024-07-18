import { Address, contractAddress, Cell, beginCell, BitBuilder, BitReader } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import fs from 'fs';

import { SampleTactContract } from "./output/sample_SampleTactContract";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    let owner = Address.parse("kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB");
    let init = await SampleTactContract.init(owner);
    let contract_address = contractAddress(0, init);
    console.log("makeSnakeCell")
    let content = {
        "name": "Lol Kek",
        "description": "Official token of RR_RGM",
        "symbol": "RRRGM",
        "decimals": 9,
        "image_data": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAuNTkgMjc2LjQ3Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMWQxZDFiO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTQxLjcxLDQxLjM4cS0xLjMyLDI1LjM0LTEuMjYsNTAuNjlUNDIsMTQyLjc1cTEuNDQsMjUuMzIsNC4yNiw1MC41M3Q3LDUwLjRjMS4xMSw2LjcxLDEuODksMTMuNjgsNC40OSwyMCwyLjE0LDUuMjEsNS41MywxMC41NSwxMS4yMywxMi4yNSw2LjMsMS44OSwxMi4wNi0xLjYxLDE1LjczLTYuNTQsNC4xNS01LjU5LDYuMTctMTIuNzgsOC0xOS4zOSw0LjMtMTUuMzgsNi0zMS4zOCw2LjctNDcuMjkuNzItMTYuMzcuNTUtMzIuNzguNjQtNDkuMTZsLjI2LTUxLjY3LjI2LTUxLjY3LjA2LTEyLjczYzAtMy4yMS01LTMuMjItNSwwbC0uMjUsNTAuNDItLjI2LDUwLjQyYy0uMDgsMTYuNTIsMCwzMy0uMyw0OS41Ni0uMjMsMTUuNDYtLjg5LDMxLTMuNjMsNDYuMjZhMTQ3LjkyLDE0Ny45MiwwLDAsMS01Ljc2LDIyLjQzYy0xLjc3LDUuMDgtNC4xNCwxMS4yNC05LjE2LDEzLjk0LTQuNDMsMi4zOS04Ljc1LDAtMTEuMzEtMy43My0zLjI0LTQuNzUtNC40Ni0xMC40NC01LjQ0LTE2cS00LjMxLTI0LjM5LTcuMjktNDl0LTQuNjQtNDkuMjdxLTEuNjYtMjQuNjctMi00OS40M3QuNjEtNDkuNDhxLjI0LTYuMTIuNTYtMTIuMjRjLjE2LTMuMjEtNC44NC0zLjItNSwwWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDUuMyw0Mi4wOWE2Ni42Nyw2Ni42NywwLDAsMS0yOC41Mi02QTY2Ljc5LDY2Ljc5LDAsMCwxLDEwLjIsMzIuNmMtMS42Ni0xLTMuNzItMi4wOS00LjctMy44NC0xLjkzLTMuNDgsMi4wNi03LDQuNjYtOC43OGE2Mi41OSw2Mi41OSwwLDAsMSwxMi45MS02LjMzQTEwNS4zNiwxMDUuMzYsMCwwLDEsMzcuMzMsOS40OCwxOTkuNjYsMTk5LjY2LDAsMCwxLDY2Ljg3LDUuNjRjMjAuMTItMS4zOSw0MC44OS0xLDYwLjA1LDYsMy4zMSwxLjIsOSwyLjU1LDguNjcsNy0uMywzLjkxLTMuNTUsNy4yNy02LjQyLDkuNjItNi4zMiw1LjE2LTE0Ljg1LDcuMS0yMi43Myw4LjMxYTI4OSwyODksMCwwLDEtMzEuMjMsMi43NHEtMTYuNzUuNzItMzMuNTIsMC00LjItLjItOC4zNy0uNDhhMi41LDIuNSwwLDAsMCwwLDUsMzYwLjU0LDM2MC41NCwwLDAsMCw3MC44Mi0xLjg5YzktMS4xNiwxOC4zLTMsMjUuOTEtOC4xMiwzLjcyLTIuNTEsNy4zMS01Ljg4LDkuMTktMTBhMTIuNjIsMTIuNjIsMCwwLDAsMS4xNy03LjU5LDkuMjIsOS4yMiwwLDAsMC00LjI2LTUuOTFBMzcsMzcsMCwwLDAsMTI4Ljg4LDdjLTIuNTEtLjk0LTUuMDctMS43Ny03LjY1LTIuNWExMTYuMzcsMTE2LjM3LDAsMCwwLTE2LTMuMjIsMTgxLjE2LDE4MS4xNiwwLDAsMC0zMi45My0xQzUxLjE2LDEuMzksMjguODUsMy42NywxMC4wNywxNC4yLDYsMTYuNDgsMS41NiwxOS43OS4zLDI0LjU1QTguODQsOC44NCwwLDAsMCwxLjM4LDMxLjZhMTcuMzksMTcuMzksMCwwLDAsNS43Myw1QTcyLDcyLDAsMCwwLDM3LjQyLDQ2Ljc0YTY5LjE1LDY5LjE1LDAsMCwwLDcuODguMzVjMy4yMiwwLDMuMjMtNSwwLTVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00NC4xNyw2NS40NmExNjkuNzksMTY5Ljc5LDAsMCwxLDU0LjE0LTguODJjMy4yMiwwLDMuMjItNSwwLTVhMTc0LjMzLDE3NC4zMywwLDAsMC01NS40Nyw5Yy0zLDEtMS43Myw1Ljg1LDEuMzMsNC44MloiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTQ0LDc1Ljc2YzQuMTQsMS44Niw4LjQ0LDEuNDgsMTIuNzcuNTMsNC41LTEsOS0yLjEyLDEzLjQ2LTMuMTlMOTcuOSw2Ni41MmMzLjEzLS43NCwxLjgtNS41Ni0xLjMzLTQuODJMNzAuMzYsNjcuOTQsNTcuMzcsNzFjLTMuNC44MS03LjQ3LDEuOTMtMTAuODQuNDNhMi41OCwyLjU4LDAsMCwwLTMuNDIuODksMi41MiwyLjUyLDAsMCwwLC45LDMuNDJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Mi4zMiw4OS4yMmEzNTEuOSwzNTEuOSwwLDAsMCw1NC42Mi02LjQ5LDIuNTMsMi41MywwLDAsMCwxLjc1LTMuMDgsMi41NiwyLjU2LDAsMCwwLTMuMDgtMS43NSwzNDIuMiwzNDIuMiwwLDAsMS01My4yOSw2LjMyYy0zLjIxLjEzLTMuMjIsNS4xMywwLDVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Ny4yOSwxMDIuNjZRNzAuNzUsMTAwLjgzLDk0LDk3LjNhMi41LDIuNSwwLDAsMC0xLjMzLTQuODJxLTIyLjYsMy40Mi00NS40Miw1LjE4YTIuNTUsMi41NSwwLDAsMC0yLjUsMi41LDIuNTIsMi41MiwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDQuNzIsMTE2LjE5QTY4LjU5LDY4LjU5LDAsMCwxLDU3LjEyLDExNGM0LjQ4LS40OCw5LS45MywxMy40My0xLjM5bDI2Ljc5LTIuNzVhMi41NywyLjU3LDAsMCwwLDIuNS0yLjUsMi41MiwyLjUyLDAsMCwwLTIuNS0yLjVsLTI3LjI4LDIuOGMtNC40Ny40Ni04Ljk0LjktMTMuNDEsMS4zOWE3NC40Miw3NC40MiwwLDAsMC0xMy4yNiwyLjM1Yy0zLjA4LjkyLTEuNzcsNS43NCwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00NC4zMSwxMjhsNDktNS4zNGEyLjU3LDIuNTcsMCwwLDAsMi41LTIuNSwyLjUxLDIuNTEsMCwwLDAtMi41LTIuNWwtNDksNS4zNGEyLjU3LDIuNTcsMCwwLDAtMi41LDIuNSwyLjUxLDIuNTEsMCwwLDAsMi41LDIuNVoiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTQ0Ljc3LDE0MS4xNEEyMjkuNDMsMjI5LjQzLDAsMCwxLDk1LjMxLDEzM2MzLjIxLS4xNSwzLjIyLTUuMTUsMC01YTIzNS40MywyMzUuNDMsMCwwLDAtNTEuODcsOC4zMWMtMy4xLjg2LTEuNzgsNS42OCwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Ni4zMywxNTIuMTdhMzY3LjY5LDM2Ny42OSwwLDAsMCw0OC43My05YzMuMTEtLjc5LDEuNzktNS42Mi0xLjMzLTQuODJhMzU3LjgzLDM1Ny44MywwLDAsMS00Ny40LDguNzgsMi41OCwyLjU4LDAsMCwwLTIuNSwyLjUsMi41MSwyLjUxLDAsMCwwLDIuNSwyLjVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00OCwxNjMuMTFsNDYuOTEtNy41NmEyLjUyLDIuNTIsMCwwLDAsMS43NS0zLjA4LDIuNTYsMi41NiwwLDAsMC0zLjA4LTEuNzRsLTQ2LjkxLDcuNTVhMi41MywyLjUzLDAsMCwwLTEuNzQsMy4wOEEyLjU2LDIuNTYsMCwwLDAsNDgsMTYzLjExWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguNzQsMTc0YTE4Ny42OCwxODcuNjgsMCwwLDEsNDcuNTctNi4yN2MzLjIyLDAsMy4yMy01LDAtNWExOTMuNTksMTkzLjU5LDAsMCwwLTQ4LjksNi40NWMtMy4xMS44Mi0xLjc5LDUuNjUsMS4zMyw0LjgyWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguMywxODYuOGEzNzEuOTMsMzcxLjkzLDAsMCwwLDQ1LjgtNi4zMywyLjUyLDIuNTIsMCwwLDAsMS43NC0zLjA3LDIuNTUsMi41NSwwLDAsMC0zLjA3LTEuNzVBMzYwLjIyLDM2MC4yMiwwLDAsMSw0OC4zLDE4MS44YTIuNTYsMi41NiwwLDAsMC0yLjUsMi41LDIuNTEsMi41MSwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguMjgsMTk5LjczUTcxLjgyLDE5Nyw5NSwxOTIuMTRhMi41MywyLjUzLDAsMCwwLDEuNzUtMy4wNywyLjU1LDIuNTUsMCwwLDAtMy4wOC0xLjc1UTcxLjE3LDE5Miw0OC4yOCwxOTQuNzNhMi41OCwyLjU4LDAsMCwwLTIuNSwyLjUsMi41MSwyLjUxLDAsMCwwLDIuNSwyLjVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01MiwyMTEuODlRNzQsMjA3LjYsOTYuMzIsMjA1YTIuNTcsMi41NywwLDAsMCwyLjUtMi41LDIuNTIsMi41MiwwLDAsMC0yLjUtMi41cS0yMywyLjYzLTQ1LjY3LDdhMi41MSwyLjUxLDAsMCwwLTEuNzUsMy4wN0EyLjU1LDIuNTUsMCwwLDAsNTIsMjExLjg5WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTMuMzMsMjI2LjIycTIwLjQtMS40LDQwLjY2LTQuMmEyLjUzLDIuNTMsMCwwLDAsMS43NS0zLjA4LDIuNTYsMi41NiwwLDAsMC0zLjA4LTEuNzRxLTE5LjU3LDIuNy0zOS4zMyw0YTIuNTUsMi41NSwwLDAsMC0yLjUsMi41LDIuNTIsMi41MiwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTcsMjM4LjExcTE2LjgxLTMuOTIsMzMuOTItNi40YTIuNTMsMi41MywwLDAsMCwxLjc1LTMuMDgsMi41OCwyLjU4LDAsMCwwLTMuMDgtMS43NXEtMTcuMDksMi40OS0zMy45Miw2LjQxYy0zLjEzLjczLTEuODEsNS41NSwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01OS4zMywyNDkuMjdBMjE2LjgyLDIxNi44MiwwLDAsMCw4OCwyNDUuMDdjMy4xNC0uNjgsMS44MS01LjUtMS4zMy00LjgyYTIwNS4yOSwyMDUuMjksMCwwLDEtMjcuMzYsNCwyLjU3LDIuNTcsMCwwLDAtMi41LDIuNSwyLjUxLDIuNTEsMCwwLDAsMi41LDIuNVoiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTYyLjA5LDI2Mi41NmwyMi44NS0zLjg2YTIuNTEsMi41MSwwLDAsMCwxLjc1LTMuMDcsMi41NSwyLjU1LDAsMCwwLTMuMDctMS43NWwtMjIuODYsMy44NkEyLjUyLDIuNTIsMCwwLDAsNTksMjYwLjgxYTIuNTcsMi41NywwLDAsMCwzLjA4LDEuNzVaIi8+PC9zdmc+"
    }
    let cell = makeSnakeCell(Buffer.from(JSON.stringify(content)))
    console.log(cell)
    // Prepareing
    console.log("Reading Contract Info...");

    const data = 'Hello, world!';

    fs.writeFile('myfile2.txt', cell.toBoc(), (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Data written to file successfully.');
    }
});

    // console.log(contract_address);

    // // Input the contract address
    // let contract = await SampleTactContract.fromAddress(contract_address);
    // let contract_open = await client.open(contract);
    // console.log("Counter Value: " + (await contract_open.getCounter()));
})();



// export function buildJettonOnchainMetadata(data: { [s: string]: string | undefined }): Cell {
//     const KEYLEN = 256;
//     const dict = beginDict(KEYLEN);
  
//     Object.entries(data).forEach(([k, v]: [string, string | undefined]) => {
//       if (!jettonOnChainMetadataSpec[k as JettonMetaDataKeys])
//         throw new Error(`Unsupported onchain key: ${k}`);
//       if (v === undefined || v === "") return;
  
//       let bufferToStore = Buffer.from(v, jettonOnChainMetadataSpec[k as JettonMetaDataKeys]);
  
//       const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
  
//       const rootCell = new Cell();
//       rootCell.bits.writeUint8(SNAKE_PREFIX);
//       let currentCell = rootCell;
  
//       while (bufferToStore.length > 0) {
//         currentCell.bits.writeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
//         bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
//         if (bufferToStore.length > 0) {
//           let newCell = new Cell();
//           currentCell.refs.push(newCell);
//           currentCell = newCell;
//         }
//       }
  
//       dict.storeRef(sha256(k), rootCell);
//     });
  
//     return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict.endDict()).endCell();
//   }

function bufferToChunks(buff: Buffer, chunkSize: number) {
    const chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
      chunks.push(buff.subarray(0, chunkSize));
      buff = buff.subarray(chunkSize);
    }
    return chunks;
  }

export function makeSnakeCell(data: Buffer): Cell {
    const chunks = bufferToChunks(data, 127)
  
    if (chunks.length === 0) {
      return beginCell().endCell()
    }
  
    if (chunks.length === 1) {
      return beginCell().storeBuffer(chunks[0]).endCell()
    }
  
    let curCell = beginCell()
  
    for (let i = chunks.length - 1; i >= 0; i--) {
      const chunk = chunks[i]
  
      curCell.storeBuffer(chunk)
  
      if (i - 1 >= 0) {
        const nextCell = beginCell()
        nextCell.storeRef(curCell)
        curCell = nextCell
      }
    }
  
    return curCell.endCell()
  }
  
  export function flattenSnakeCell(cell: Cell): Buffer {
    let c: Cell | null = cell;
  
    const bitResult = new BitBuilder();
    while (c) {
      const cs = c.beginParse();
      if (cs.remainingBits === 0) {
        break;
      }
  
      const data = cs.loadBits(cs.remainingBits);
      bitResult.writeBits(data);
      c = c.refs && c.refs[0];
    }
  
    const endBits = bitResult.build();
    const reader = new BitReader(endBits);
  
    return reader.loadBuffer(reader.remaining / 8);
  }