# Readme

## Installation(cmd)

> npm install

## Configuration / debug

- Ouvir index.html
- Ecrire n'importe quoi
- Ouvrir l'inspecteur et la console de l'inspecteur
- Reload la page

## Comment jouer

- Dans le premier prompt inserer l'index de la piece a déplacé
> attention: l'index [0][0] est la position tout en bas à gauche
- Dans le deuxieme prompt inserer l'index de la position de deplacement de la piece
> attention: l'index [0][0] est la position tout en bas à gauche
- Une erreur doit se produire si le deplacement est impossible

## Docs

- Creation de l'instance du jeu avec ***var game = new Fanorona3()*** pour initialiser le jeu
- Pour deplacer une piece on fera ***game.moveTo(piecePosition, movePosition)***
- Pour tester si il y victoire on fera ***game.win()*** si il retourne 1 alors victoire pour le joueur si 2 alors victoire pour le joueur 2 si null alors pas de victoire, le jeu continue
- Pour changer de joueur on utilisera ***game.chagePlayer()***
- Pour afficher l'etat de la table on utilisera ***game.print()***
- Pour recuperer le nombre de tour on utilisera ***game.tour*** (sans parenthese car c'est un getter)
- Pour recuperer la matrice de base on utilisera ***game.matrice*** (sans parenthese car c'est un getter) 

- Pour compiler le code typescript on ecrira dans le terminal/cmd/console: > npm run dev

- Pour compiler en mode watch(Se recompile automatiquement lorsque l'on sauvegarde le code source): > npm run watch

- Lors de la compilation typescript va creer un dossier dist et le fichier .js. c'est ce fichier .js qui sera utiliser et importer dans le index.html

## Fonctionnalites manquantes

- On doit ecrire un algo qui permet de savoir à l'avance les possibilites de mouvements de la piece cliqué pour proposer à l'utilisateur quels sont les coups possibles

- Separer l'algo de teste de mouvement de la methode ***moveTo()***

- Tout en bas (ligne 173) j'ai creer une fonction pour tester le jeu c'est un code mal fait(not undifined forcé, typages forcés, ...)

- Ne pas utiliser la fonction ***explodePrompt*** c'est juste pour alleger le code de la fonction test
