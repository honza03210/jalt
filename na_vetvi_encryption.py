from random import shuffle, randint

alf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
       'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

'''
encrypts string using caesars cipher with offset
'''
def caesar(string: str, offset: int) -> str:
    string = string.lower()
    encrypted = ''
    for char in string:
        encrypted += chr(((ord(char) + offset) - ord('a')) % 26 + ord('a'))
    return encrypted


'''
decrypts string encrypted with caesars cipher used with offset
'''
def decrypt_caesar(string: str, offset: int) -> str:
    return caesar(string, -offset)

'''
encrypts string using map that maps every character to another char
'''
def encrypt_random_map(string: str, map: dict[str: str]) -> str:
    string = string.lower()
    encrypted = ''
    for char in string:
        encrypted += map[char]
    return encrypted

'''
decrypts string using map that maps every character to another char reversing the given map
'''
def decrypt_random_map(string: str, map: dict[str: str]) -> str:
    return encrypt_random_map(string, {val: key for key, val in map.items()})

'''
creates a map giving every letter its twin
'''
def create_random_map() -> dict[str: str]:
    char_map = {}
    balf = alf.copy()
    shuffle(balf)
    for char in alf:
        char_map[char] = balf.pop()
    return char_map

if __name__ == '__main__':
    caesars_solved = 0
    random_maps_solved = 0

    while True:
        try:
            mode = int(input("Chces desifrovat caesarovu sifru (1), nebo nahodne spojeni dvojic (2)? (Napis jen jedno cislo a stiskni enter)\n"))
            if mode != 1 and mode != 2:
                print("Neplatny mod")
                continue
        except:
            print("Neplatny mod")
            continue
        
        # message is random 5 characters
        message = ''
        for _ in range(5):
            message += chr(randint(ord('a'), ord('z')))

        # caesars cypher
        if mode == 1:
            offset = randint(1, 4)
            direction = "doprava"

            if randint(0, 1) == 1:
                direction = "doleva"
                offset = -offset

            encrypted = caesar(message, offset)

            print(f"Tento retezec: '{encrypted}' vznikl zasifrovanim pomoci caesarovy sifry s posunutim o {abs(offset)} pismen {direction}")
            print(f"Abeceda vypada takto: \n{alf}")

            print(f"Zasifrovana: '{encrypted}'")

            while input("Jak vypadala puvodni zprava?\n") != message:
                print("Nenee, zkus to znovu ;-)")

            caesars_solved += 1

        # random map cypher (substitution cypher)
        elif mode == 2:
            mapp = create_random_map()
            encrypted = encrypt_random_map(message, mapp)

            print(f"Tento retezec: '{encrypted}' vznikl zasifrovanim pomoci nahrazeni kazdeho pismena jeho 'dvojnikem'")
            print(f"Tito dvojnici vypadaji takto:\n")

            for key, val in mapp.items():
                print(f"{key} -> {val}")
    
            print(f"Zasifrovana: '{encrypted}'")

            while input("Jak vypadala puvodni zprava?\n") != message:
                print("Nenee, zkus to znovu ;-)")

            random_maps_solved += 1
        
        print("EEEEeej, gratuluji, desifroval jsi to spravne :)\n")
        print(f"Desifrovanych caesar: {caesars_solved}\nDesifrovanych dvojniku: {random_maps_solved}")
        print("Jestli chces pokracovat dal, tak jenom stiskni enter (pokud chces skoncit, napis cokoliv a zmackni enter")

        if input() != '':
            exit(0)

