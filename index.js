class Actor {
    constructor(name, character){
        this.name = name;
        this.character = character;
    }
    describe(){
        return `${this.name} plays ${this.character}.`;
    }
}

class Film {
    constructor(name){
        this.name = name;
        this.actors = [];
    }

    addActor(actor){
        if (actor instanceof Actor){
            this.actors.push(actor);
        } else{
            throw new Error(`You can only add an instance of Actor. Argument is not an actor.: ${actor}`);
        }
    }

    describe(){
        return `${this.name} has ${this.actors.length} actors.`;
    }
}

class Menu {
    constructor(){
        this.films = [];
        this.selectedFilm = null;
    }

    start(){
        let selection = this.showMainMenuOptions();
        
        while (selection != 0){
            switch (selection){
                case '1':
                    this.createFilm();
                    break;
                case '2':
                    this.viewFilm();
                    break;
                case '3':
                    this.deleteFilm();
                    break;
                case '4':
                    this.displayFilms();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        
        alert('The End!');
    }

    showMainMenuOptions(){
        return prompt(`
        0) exit
        1) create new film
        2) view film
        3) delete film
        4) display all films
        `)
    }

    showFilmMenuOptions(filmInfo){
        return prompt(`
        0) back
        1) cast actor
        2) fire actor
        -----------------
        ${filmInfo}
        `)
    }

    displayFilms(){
        let filmString = '';
        for (let i = 0; i < this.films.length; i++){
            filmString += i + ') ' + this.films[i].name + '\n';
        }
        alert(filmString);
    }
    createFilm(){
        let name = prompt('Submit name for a new film:');
        this.films.push(new Film(name));
    }

    viewFilm(){
        let index = prompt('Enter the index of the film you wish to view.');
        if (index > -1 && index <this.films.length){
            this.selectedFilm = this.films[index];
            let description = 'Film Name: ' + this.selectedFilm.name + '\n';

            for (let i = 0; i < this.selectedFilm.actors.length; i++) {
                description += i + ') ' + this.selectedFilm.actors[i].name + ' - ' + this.selectedFilm.actors[i].character + '\n';
            }

            let selection = this.showFilmMenuOptions(description);
            switch (selection){
                case '1':
                    this.createActor();
                    break;
                case '2':
                    this.deleteActor();
            }
         }
    }

    deleteFilm(){
        let index = prompt('Enter the index of the film you wish to stop producing:');
        if (index > -1 && index < this.films.length){
            this.films.splice(index, 1);
        }
    }

    createActor(){
        let name = prompt('Enter name of an actor to cast:');
        let character = prompt('Enter character for the actor to play:');
        this.selectedFilm.actors.push(new Actor(name, character));
    }

    deleteActor(){
        let index = prompt('Enter the index of the actor you wish to fire.');
        if (index > -1 && index < this.selectedFilm.actors.length){
            this.selectedFilm.actors.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();