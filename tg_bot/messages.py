# messages.py

from base64 import urlsafe_b64encode

from pytoniq_core import begin_cell, Cell


def get_comment_message(destination_address: str, amount: int, comment: str) -> dict:

    data = {
        'address': destination_address,
        'amount': str(amount),
        'payload': urlsafe_b64encode(
            begin_cell()
            .store_uint(0, 32)  # op code for comment message
            .store_string(comment)  # store comment
            .end_cell()  # end cell
            .to_boc()  # convert it to boc
        )
        .decode()  # encode it to urlsafe base64
    }

    return data

def get_another_deploy_message(destination_address: str, amount: int, content = None) -> dict:
    op = 0x2ef1ae55
    
    content = {
        "name": "Lol Kek",
        "description": "Official token of RR_RGM",
        "symbol": "RRRGM",
        "decimals": 9,
        "image_data": "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAuNTkgMjc2LjQ3Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMWQxZDFiO308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYSIgZD0iTTQxLjcxLDQxLjM4cS0xLjMyLDI1LjM0LTEuMjYsNTAuNjlUNDIsMTQyLjc1cTEuNDQsMjUuMzIsNC4yNiw1MC41M3Q3LDUwLjRjMS4xMSw2LjcxLDEuODksMTMuNjgsNC40OSwyMCwyLjE0LDUuMjEsNS41MywxMC41NSwxMS4yMywxMi4yNSw2LjMsMS44OSwxMi4wNi0xLjYxLDE1LjczLTYuNTQsNC4xNS01LjU5LDYuMTctMTIuNzgsOC0xOS4zOSw0LjMtMTUuMzgsNi0zMS4zOCw2LjctNDcuMjkuNzItMTYuMzcuNTUtMzIuNzguNjQtNDkuMTZsLjI2LTUxLjY3LjI2LTUxLjY3LjA2LTEyLjczYzAtMy4yMS01LTMuMjItNSwwbC0uMjUsNTAuNDItLjI2LDUwLjQyYy0uMDgsMTYuNTIsMCwzMy0uMyw0OS41Ni0uMjMsMTUuNDYtLjg5LDMxLTMuNjMsNDYuMjZhMTQ3LjkyLDE0Ny45MiwwLDAsMS01Ljc2LDIyLjQzYy0xLjc3LDUuMDgtNC4xNCwxMS4yNC05LjE2LDEzLjk0LTQuNDMsMi4zOS04Ljc1LDAtMTEuMzEtMy43My0zLjI0LTQuNzUtNC40Ni0xMC40NC01LjQ0LTE2cS00LjMxLTI0LjM5LTcuMjktNDl0LTQuNjQtNDkuMjdxLTEuNjYtMjQuNjctMi00OS40M3QuNjEtNDkuNDhxLjI0LTYuMTIuNTYtMTIuMjRjLjE2LTMuMjEtNC44NC0zLjItNSwwWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDUuMyw0Mi4wOWE2Ni42Nyw2Ni42NywwLDAsMS0yOC41Mi02QTY2Ljc5LDY2Ljc5LDAsMCwxLDEwLjIsMzIuNmMtMS42Ni0xLTMuNzItMi4wOS00LjctMy44NC0xLjkzLTMuNDgsMi4wNi03LDQuNjYtOC43OGE2Mi41OSw2Mi41OSwwLDAsMSwxMi45MS02LjMzQTEwNS4zNiwxMDUuMzYsMCwwLDEsMzcuMzMsOS40OCwxOTkuNjYsMTk5LjY2LDAsMCwxLDY2Ljg3LDUuNjRjMjAuMTItMS4zOSw0MC44OS0xLDYwLjA1LDYsMy4zMSwxLjIsOSwyLjU1LDguNjcsNy0uMywzLjkxLTMuNTUsNy4yNy02LjQyLDkuNjItNi4zMiw1LjE2LTE0Ljg1LDcuMS0yMi43Myw4LjMxYTI4OSwyODksMCwwLDEtMzEuMjMsMi43NHEtMTYuNzUuNzItMzMuNTIsMC00LjItLjItOC4zNy0uNDhhMi41LDIuNSwwLDAsMCwwLDUsMzYwLjU0LDM2MC41NCwwLDAsMCw3MC44Mi0xLjg5YzktMS4xNiwxOC4zLTMsMjUuOTEtOC4xMiwzLjcyLTIuNTEsNy4zMS01Ljg4LDkuMTktMTBhMTIuNjIsMTIuNjIsMCwwLDAsMS4xNy03LjU5LDkuMjIsOS4yMiwwLDAsMC00LjI2LTUuOTFBMzcsMzcsMCwwLDAsMTI4Ljg4LDdjLTIuNTEtLjk0LTUuMDctMS43Ny03LjY1LTIuNWExMTYuMzcsMTE2LjM3LDAsMCwwLTE2LTMuMjIsMTgxLjE2LDE4MS4xNiwwLDAsMC0zMi45My0xQzUxLjE2LDEuMzksMjguODUsMy42NywxMC4wNywxNC4yLDYsMTYuNDgsMS41NiwxOS43OS4zLDI0LjU1QTguODQsOC44NCwwLDAsMCwxLjM4LDMxLjZhMTcuMzksMTcuMzksMCwwLDAsNS43Myw1QTcyLDcyLDAsMCwwLDM3LjQyLDQ2Ljc0YTY5LjE1LDY5LjE1LDAsMCwwLDcuODguMzVjMy4yMiwwLDMuMjMtNSwwLTVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00NC4xNyw2NS40NmExNjkuNzksMTY5Ljc5LDAsMCwxLDU0LjE0LTguODJjMy4yMiwwLDMuMjItNSwwLTVhMTc0LjMzLDE3NC4zMywwLDAsMC01NS40Nyw5Yy0zLDEtMS43Myw1Ljg1LDEuMzMsNC44MloiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTQ0LDc1Ljc2YzQuMTQsMS44Niw4LjQ0LDEuNDgsMTIuNzcuNTMsNC41LTEsOS0yLjEyLDEzLjQ2LTMuMTlMOTcuOSw2Ni41MmMzLjEzLS43NCwxLjgtNS41Ni0xLjMzLTQuODJMNzAuMzYsNjcuOTQsNTcuMzcsNzFjLTMuNC44MS03LjQ3LDEuOTMtMTAuODQuNDNhMi41OCwyLjU4LDAsMCwwLTMuNDIuODksMi41MiwyLjUyLDAsMCwwLC45LDMuNDJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Mi4zMiw4OS4yMmEzNTEuOSwzNTEuOSwwLDAsMCw1NC42Mi02LjQ5LDIuNTMsMi41MywwLDAsMCwxLjc1LTMuMDgsMi41NiwyLjU2LDAsMCwwLTMuMDgtMS43NSwzNDIuMiwzNDIuMiwwLDAsMS01My4yOSw2LjMyYy0zLjIxLjEzLTMuMjIsNS4xMywwLDVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Ny4yOSwxMDIuNjZRNzAuNzUsMTAwLjgzLDk0LDk3LjNhMi41LDIuNSwwLDAsMC0xLjMzLTQuODJxLTIyLjYsMy40Mi00NS40Miw1LjE4YTIuNTUsMi41NSwwLDAsMC0yLjUsMi41LDIuNTIsMi41MiwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDQuNzIsMTE2LjE5QTY4LjU5LDY4LjU5LDAsMCwxLDU3LjEyLDExNGM0LjQ4LS40OCw5LS45MywxMy40My0xLjM5bDI2Ljc5LTIuNzVhMi41NywyLjU3LDAsMCwwLDIuNS0yLjUsMi41MiwyLjUyLDAsMCwwLTIuNS0yLjVsLTI3LjI4LDIuOGMtNC40Ny40Ni04Ljk0LjktMTMuNDEsMS4zOWE3NC40Miw3NC40MiwwLDAsMC0xMy4yNiwyLjM1Yy0zLjA4LjkyLTEuNzcsNS43NCwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00NC4zMSwxMjhsNDktNS4zNGEyLjU3LDIuNTcsMCwwLDAsMi41LTIuNSwyLjUxLDIuNTEsMCwwLDAtMi41LTIuNWwtNDksNS4zNGEyLjU3LDIuNTcsMCwwLDAtMi41LDIuNSwyLjUxLDIuNTEsMCwwLDAsMi41LDIuNVoiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTQ0Ljc3LDE0MS4xNEEyMjkuNDMsMjI5LjQzLDAsMCwxLDk1LjMxLDEzM2MzLjIxLS4xNSwzLjIyLTUuMTUsMC01YTIzNS40MywyMzUuNDMsMCwwLDAtNTEuODcsOC4zMWMtMy4xLjg2LTEuNzgsNS42OCwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00Ni4zMywxNTIuMTdhMzY3LjY5LDM2Ny42OSwwLDAsMCw0OC43My05YzMuMTEtLjc5LDEuNzktNS42Mi0xLjMzLTQuODJhMzU3LjgzLDM1Ny44MywwLDAsMS00Ny40LDguNzgsMi41OCwyLjU4LDAsMCwwLTIuNSwyLjUsMi41MSwyLjUxLDAsMCwwLDIuNSwyLjVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik00OCwxNjMuMTFsNDYuOTEtNy41NmEyLjUyLDIuNTIsMCwwLDAsMS43NS0zLjA4LDIuNTYsMi41NiwwLDAsMC0zLjA4LTEuNzRsLTQ2LjkxLDcuNTVhMi41MywyLjUzLDAsMCwwLTEuNzQsMy4wOEEyLjU2LDIuNTYsMCwwLDAsNDgsMTYzLjExWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguNzQsMTc0YTE4Ny42OCwxODcuNjgsMCwwLDEsNDcuNTctNi4yN2MzLjIyLDAsMy4yMy01LDAtNWExOTMuNTksMTkzLjU5LDAsMCwwLTQ4LjksNi40NWMtMy4xMS44Mi0xLjc5LDUuNjUsMS4zMyw0LjgyWiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguMywxODYuOGEzNzEuOTMsMzcxLjkzLDAsMCwwLDQ1LjgtNi4zMywyLjUyLDIuNTIsMCwwLDAsMS43NC0zLjA3LDIuNTUsMi41NSwwLDAsMC0zLjA3LTEuNzVBMzYwLjIyLDM2MC4yMiwwLDAsMSw0OC4zLDE4MS44YTIuNTYsMi41NiwwLDAsMC0yLjUsMi41LDIuNTEsMi41MSwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNDguMjgsMTk5LjczUTcxLjgyLDE5Nyw5NSwxOTIuMTRhMi41MywyLjUzLDAsMCwwLDEuNzUtMy4wNywyLjU1LDIuNTUsMCwwLDAtMy4wOC0xLjc1UTcxLjE3LDE5Miw0OC4yOCwxOTQuNzNhMi41OCwyLjU4LDAsMCwwLTIuNSwyLjUsMi41MSwyLjUxLDAsMCwwLDIuNSwyLjVaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01MiwyMTEuODlRNzQsMjA3LjYsOTYuMzIsMjA1YTIuNTcsMi41NywwLDAsMCwyLjUtMi41LDIuNTIsMi41MiwwLDAsMC0yLjUtMi41cS0yMywyLjYzLTQ1LjY3LDdhMi41MSwyLjUxLDAsMCwwLTEuNzUsMy4wN0EyLjU1LDIuNTUsMCwwLDAsNTIsMjExLjg5WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTMuMzMsMjI2LjIycTIwLjQtMS40LDQwLjY2LTQuMmEyLjUzLDIuNTMsMCwwLDAsMS43NS0zLjA4LDIuNTYsMi41NiwwLDAsMC0zLjA4LTEuNzRxLTE5LjU3LDIuNy0zOS4zMyw0YTIuNTUsMi41NSwwLDAsMC0yLjUsMi41LDIuNTIsMi41MiwwLDAsMCwyLjUsMi41WiIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTcsMjM4LjExcTE2LjgxLTMuOTIsMzMuOTItNi40YTIuNTMsMi41MywwLDAsMCwxLjc1LTMuMDgsMi41OCwyLjU4LDAsMCwwLTMuMDgtMS43NXEtMTcuMDksMi40OS0zMy45Miw2LjQxYy0zLjEzLjczLTEuODEsNS41NSwxLjMzLDQuODJaIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik01OS4zMywyNDkuMjdBMjE2LjgyLDIxNi44MiwwLDAsMCw4OCwyNDUuMDdjMy4xNC0uNjgsMS44MS01LjUtMS4zMy00LjgyYTIwNS4yOSwyMDUuMjksMCwwLDEtMjcuMzYsNCwyLjU3LDIuNTcsMCwwLDAtMi41LDIuNSwyLjUxLDIuNTEsMCwwLDAsMi41LDIuNVoiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTYyLjA5LDI2Mi41NmwyMi44NS0zLjg2YTIuNTEsMi41MSwwLDAsMCwxLjc1LTMuMDcsMi41NSwyLjU1LDAsMCwwLTMuMDctMS43NWwtMjIuODYsMy44NkEyLjUyLDIuNTIsMCwwLDAsNTksMjYwLjgxYTIuNTcsMi41NywwLDAsMCwzLjA4LDEuNzVaIi8+PC9zdmc+"
    }
    
    # file = open('content', 'r')
    # boc = file.read()
    # file.close()
    
    cont_cell = begin_cell().store_uint(1, 8).store_snake_string(str("https://nftstorage.link/12412512")).end_cell()
    
    body = (begin_cell()
            .store_uint(op, 32)
            .store_ref(cont_cell)
            .store_coins(int(amount * 10**9))
            .end_cell()
            )
    
    data = {
        'address': destination_address,
        'amount': str(int(0.1 * 10**9)),
        'payload': urlsafe_b64encode(
            body.to_boc()  # convert it to boc
        )
        .decode()  # encode it to urlsafe base64
    }
    return data


def get_mint_message(destination_address: str):
    data = {
        'address': destination_address,
        'amount': str(int(0.1 * 10**9)),
        'payload': urlsafe_b64encode(
            begin_cell()
            .store_uint(0, 32)  # op code for comment message
            .store_string("Mint: 100")  # store comment
            .end_cell()  # end cell
            .to_boc()  # convert it to boc
        )
        .decode()  # encode it to urlsafe base64
    }

    return data