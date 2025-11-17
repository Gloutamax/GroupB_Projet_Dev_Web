# Information 
Le frotend est a initialiser ici avec l'aide de docker :
``` bash
docker compose run -rm frontend create vite
```

## Etapes d'installation 
- On execute ici la commande de création dans le service front et initalise le
projet grâce à vite (create vite)
Dès que la commande est exécutée, le processus de création commence, et
plusieurs questions vont apparaître dans la console : 
- Il demande d’abord si on veut installer les packages on sélectionne y pour
dire oui et les installer
Fiche de révision React 8
- Ensuite il demande si on souhaite retirer les fichiers existent on sélectionne
y afin de pouvoir bien initialiser à partir de zéro et éviter d’avoir d’autres
fichiers 
- Ensuite il est demandée de choisir le framework (ici on veut react) : on
sélectionne react
- Ensuite pour la variante : On choisis javascript 
- Ensuite il demande Use rollendwon-vite -Experimental : on choisi non car
c’est expérimental
- Ensuite il demande “Install with npm and start now ?”: on met oui afin de
démarer le serveur mainteant d’installer npm 
- Ensuite dans le package.json dans le script de lancement vite ajouter —host à
la fin : Dans notre proejt c’est le script dev du package json : 
“dev”: “vite —host”
- Puis dans le compose.yml : Mettre le port du froent end sur “5173:5173”, 
- Pour tester lancer le serveur avec docker compose up et se connecter au 
localhost du port 5173. 
—> Si cela fonctionne alors l’appli de test counter s’affiche. 
Avec tout ce processus d’intallation, react a généré la strcuture standard d’un
projet React moderne.
