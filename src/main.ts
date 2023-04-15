type Position = {
    x: number,
    y: number
}

type Piece = {
    player: 1 | 2,
    isAlreadyMoved: boolean
}

class Fanorona3 {

    private _matrice: (Piece | null)[][]
    private _player: 1 | 2 = 1
    private _tour: number = 0

    constructor() {
        this._matrice = [
            [{ player: 1, isAlreadyMoved: false }, { player: 1, isAlreadyMoved: false }, { player: 1, isAlreadyMoved: false }],
            [null, null, null],
            [{ player: 2, isAlreadyMoved: false }, { player: 2, isAlreadyMoved: false }, { player: 2, isAlreadyMoved: false }]
        ]
    }

    get matrice() {
        return this._matrice
    }

    get tour() {
        return this._tour
    }

    changePlayer(): void {
        this._player = (1 == this._player) ? 2 : 1
    }

    moveTo(piece: Position, position: Position): void {
        const restrictedPositions = [[0, 1], [1, 0], [1, 2], [2, 1]]
        const piecePositionArr = [piece.y, piece.x]
        var move = false
        // teste si la piece ciblée est au current player
        if (null != this._matrice[piece.y][piece.x] && null == this._matrice[position.y][position.x] && this._player == this._matrice[piece.y][piece.x]?.player) {
            // teste si le mouvement est possible
            if (0 <= restrictedPositions.indexOf(piecePositionArr)) {
                if (2 >= Math.abs(position.x - piece.x) && 2 >= Math.abs(position.y - piece.y)) {
                    move = true
                } else {
                    throw new Error("Mouvement impossible")
                }
            } else {
                var movesPosibilities = [[1, 0], [-1, 0], [0, -1], [0, 1]]
                console.log([position.y - piece.y, position.x - piece.x])
                if (0 <= movesPosibilities.indexOf([position.y - piece.y, position.x - piece.x])) {
                    move = true
                } else {
                    throw new Error("Mouvement impossible")
                }
            }
        } else {
            throw new Error("Valeur impossible")
        }

        if (true == move) {
            this._matrice[piece.y][piece.x] = { player: this._matrice[piece.y][piece.x]!.player, isAlreadyMoved: true }
            this._matrice[position.y][position.x] = this._matrice[piece.y][piece.x]
            this._matrice[piece.y][piece.x] = null
            this._tour = this._tour + 1
        }
    }

    // renvoie 1 ou 2 si un player a gagné sinon null
    win(): 1 | 2 | null {
        // teste si elles sont alignées
        if (this._horizontal(this._player) || this._vertical(this._player) || this._diagonal(this._player)) {
            // teste si toutes les pieces ont deja bougé
            if (this._isAllAreAlreadyMoved(this._player)) {
                return this._player
            }
        }
        return null
    }

    // transforme le tableau Piece en number pour faciliter certaines taches futur
    private _transform(): number[][] {
        var transformed: number[][] = []
        this._matrice.forEach(ArrValue => {
            var arr: number[] = []
            ArrValue.forEach(value => {
                arr.push((value == undefined) ? 0 : value.player)
            })
            transformed.push(arr)
        })
        return transformed
    }

    print(): void {
        console.log(this._transform().reverse())
    }

    private _horizontal(valueToSearch: number): boolean {
        const arr = this._transform()
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].every((val) => val === valueToSearch)) {
                return true;
            }
        }
        return false
    }

    private _vertical(valueToSearch: number): boolean {
        const arr = this._transform()
        for (let i = 0; i < arr.length; i++) {
            let count = 0;
            for (let j = 0; j < arr.length; j++) {
                if (valueToSearch === arr[j][i]) {
                    count++;
                }
            }
            if (arr.length === count) {
                return true
            }
        }
        return false
    }

    private _diagonal(valueToSearch: number): boolean {
        const arr = this._transform()
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (valueToSearch === arr[i][i]) {
                count++;
            }
        }
        if (arr.length === count) {
            return true
        }

        count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (valueToSearch === arr[i][arr.length - i - 1]) {
                count++;
            }
        }
        if (arr.length === count) {
            return true
        }
        return false
    }

    private _isAllAreAlreadyMoved(valueToSearch: number): boolean {
        this._matrice.forEach(arrValue => {
            arrValue.forEach(value => {
                if (null != value) {
                    if (valueToSearch == value.player && false == value.isAlreadyMoved) {
                        return false
                    }
                }
            })
        })
        return true
    }
}

function explodePrompt(message: string, sep: string): Position {
    const p = prompt(message)!
    const splitedP = p.split(sep)
    var splitedPNumber: Position = { x: 0, y: 0 }
    splitedPNumber.y = Number(splitedP[0])
    splitedPNumber.x = Number(splitedP[1])
    return splitedPNumber
}

function test(): void {
    console.log("fanorona 3")
    console.log("__________")
    var game = new Fanorona3()
    console.log(game.print())
    var win = false
    while (false == win) {
        const piece = explodePrompt("piece - y,x", ',')
        const position = explodePrompt("go to - y,x", ',')
        game.moveTo(piece!, position!)
        game.print()
        const winner = game.win()
        win = (winner == null) ? false : true
        if (false == win) {
            game.changePlayer()
        }
    }
}

test()