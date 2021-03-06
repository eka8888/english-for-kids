class Card {
    constructor(name = '', translation = '', category = '') {
        this.name = name;
        this.url_picture = `images/${this.name}.jpg`;
        this.url_mp3 = `audio/${this.name}.mp3`;
        this.node_element = document.createElement('div');
        this.translation = translation;
        this.category = category;
        this.node_text = document.createElement('p');
        this.node_image = document.createElement('img');
        this.node_audio = document.createElement('audio');
        this.node_coupimg = document.createElement('img');
        this.click = false;
    }
    add__node(node = document.body) {
        this.node_text.innerHTML = this.name;
        this.node_text.classList.add('card__text');
        this.node_audio.src = this.url_mp3;
        this.node_image.src = this.url_picture;
        this.node_image.classList.add('card__image')
        this.node_element.className = 'card';
        this.node_coupimg.src = 'images/rotate.png';
        this.node_coupimg.classList.add('card__coupimg')
        this.node_element.appendChild(this.node_image);
        this.node_element.appendChild(this.node_text);
        this.node_element.appendChild(this.node_coupimg);
        this.node_element.appendChild(this.node_audio);
        this.node_audio.className = 'sound';
        node.appendChild(this.node_element);
    }

    coup() {
        if (this.click == false) {
            this.node_text.innerHTML = this.translation;
            this.node_text.style.transform = 'rotateY(180deg)';
            this.node_element.style.transform = 'rotateY(180deg)';
            setTimeout(() => this.click = true, 400);
        }
    }

    return_coup() {
        if (this.click) {
            setTimeout(() => {
                this.node_text.innerHTML = this.name;
                this.node_text.style.transform = 'none';
            }, 200);
            this.node_element.style.transform = 'none';
        }
    }
}
let train_click = 0;
let play_true = 0;
let play_false = 0;
let main_page_activ = false;
let play_active = false;
const main = document.querySelector('.main');
const menu = document.querySelector('.menu__list');
const burgerMenu = document.querySelector('.header__burgerMenu');
const header__switch = document.querySelector('.header__switch');
const button_play = document.querySelector('.button__play');
let game_active = false;


class Cardlist {
    constructor() {
        this.cards = [];
        this.categorys = [];
    }

    addcards(cards = []) {
        cards.forEach((element) => {
            let card = element.split(',');
            this.cards.push(new Card(card[0], card[1], card[2]));
        })
    }

    getcard(name = '' || new Element()) {
        for (const iterator of this.cards) {
            if (name == iterator.name || name == iterator.translation || name == iterator.node_audio)
                return iterator;
        }
        return false;
    }

    searchcategorys() {
        this.cards.forEach((card) => {
            if (!this.categorys.includes(card.category))
                this.categorys.push(card.category);
        });
    }

    main_page() {
        let arr_categorynorep = [];
        main_page_activ = true;
        main.innerHTML = '';
        this.cards.forEach((el) => {
            if (!arr_categorynorep.includes(el.category)) {
                arr_categorynorep.push(el.category);
                let newcard_node = document.createElement('div');
                newcard_node.style.background = 'url(' + el.url_picture + ') no-repeat';
                newcard_node.innerHTML = el.category;
                newcard_node.className = 'card_start';
                main.appendChild(newcard_node);
                newcard_node.addEventListener('click', menu_click);
            }
        });
    }

    load() {
        let cardstats = 'cards'.split(',');
        cardstats.forEach(el => {
            let cardstatsarray = el.split(' ');
            let card = this.getcard(cardstatsarray[0]);
            if (card) {
                card.play_true = +cardstatsarray[1];
                card.play_false = +cardstatsarray[2];
                card.train_click = +cardstatsarray[3];
            }
        });
    }
}

const cards_string = ['cry,??????????????,Action (set A)', 'dance,??????????????????,Action (set A)', 'dive,????????????,Action (set A)', 'draw,????????????????,Action (set A)', 'fly,????????????,Action (set A)', 'fish,???????????? ????????,Action (set A)', 'hug,????????????????,Action (set A)', 'jump,??????????????,Action (set A)', 'open,??????????????????,Action (set B)', 'play,????????????,Action (set B)', 'point,??????????????????,Action (set B)', 'swim,??????????????,Action (set B)', 'ride,????????????,Action (set B)', 'run,????????????,Action (set B)', 'sing,????????,Action (set B)', 'skip,????????????????????,Action (set B)', 'argue,??????????????,Action (set C)', 'build,??????????????,Action (set C)', 'carry,??????????,Action (set C)', 'drop,????????????,Action (set C)', 'catch,????????????,Action (set C)', 'drive,???????????? ????????????,Action (set C)', 'pull,????????????,Action (set C)', 'push,??????????????,Action (set C)', 'big,??????????????,Adjective', 'small,??????????????????,Adjective', 'fast,??????????????,Adjective', 'slow,??????????????????,Adjective', 'friendly,??????????????????????,Adjective', 'unfriendly,??????????????????????????,Adjective', 'young,??????????????,Adjective', 'old,????????????,Adjective', 'cat,??????,Animal (set A)', 'chick,??????????????????,Animal (set A)', 'chicken,????????????,Animal (set A)', 'dog,????????????,Animal (set A)', 'horse,????????????,Animal (set A)', 'pig,????????????,Animal (set A)', 'rabbit,????????????,Animal (set A)', 'sheep,????????,Animal (set A)', 'bird,??????????,Animal (set B)', 'fish,????????,Animal (set B)', 'frog,??????????????,Animal (set B)', 'giraffe,??????????,Animal (set B)', 'lion,??????,Animal (set B)', 'mouse,????????,Animal (set B)', 'turtle,????????????????,Animal (set B)', 'dolphin,??????????????,Animal (set B)', 'skirt,????????,Clothes', 'pants,??????????,Clothes', 'blouse,????????????,Clothes', 'dress,????????????,Clothes', 'boot,??????????????,Clothes', 'shirt,??????????????,Clothes', 'coat,????????????,Clothes', 'shoe,??????????,Clothes', 'sad,????????????????,Emotion', 'angry,????????,Emotion', 'happy,????????????????????,Emotion', 'tired,????????????????,Emotion', 'surprised,????????????????????,Emotion', 'scared,????????????????????,Emotion', 'smile,????????????,Emotion', 'laugh,????????,Emotion'];
let cards = new Cardlist();
cards.addcards(cards_string);
cards.searchcategorys();
cards.load();


menu.addEventListener('click', (el) => {
    if (el.target.localName == 'li')
        menu_click();
});

document.body.addEventListener('click', (event) => {
    if (document.querySelector('.header__menu').style.display != 'none' && event.target != burgerMenu) {
        document.querySelector('.header__menu').style.display = 'none';
        burgerMenu.classList.remove('header__burgerMenu_active');
    }
}, true);

burgerMenu.addEventListener('click', (event) => {
    if (burgerMenu.classList.contains('header__burgerMenu_active')) {
        document.querySelector('.header__menu').style.display = 'none';
        burgerMenu.classList.remove('header__burgerMenu_active');
    } else {
        burgerMenu.classList.add('header__burgerMenu_active');
        document.querySelector('.header__menu').style.display = 'block';
    }

});

header__switch.addEventListener('click', (event) => {
    if (header__switch.firstElementChild.classList.contains('switch__circle_active')) {
        header__switch.firstElementChild.classList.remove('switch__circle_active');
        document.querySelector('.header__mod').innerHTML = 'Trainig';
        cards__play_of();
    } else {
        header__switch.firstElementChild.classList.add('switch__circle_active');
        document.querySelector('.header__mod').innerHTML = 'Play';
        cards__play_on();
    }
});

function addevent_card() {
    const coup = document.querySelectorAll('.card__coupimg');
    coup.forEach((el) => {
        el.addEventListener('click', (el) => {
            let card_temp = cards.getcard(el.target.parentElement.querySelector('.card__text').innerHTML);
            card_temp.coup();
        });
    });
    const cards_node = document.querySelectorAll('.card');
    cards_node.forEach((element) => {
        element.addEventListener('click', add__play_song);
        element.addEventListener('mouseleave', (el) => {
            let card_temp = cards.getcard(el.target.querySelector('.card__text').innerHTML);
            if (card_temp.click) {
                card_temp.return_coup();
            }
        });
    });
}

function cards__play_on() {
    const cards_node = document.querySelectorAll('.card');
    cards_node.forEach((element) => {
        element.querySelector('.card__text').style.display = 'none';
        element.querySelector('.card__coupimg').style.display = 'none';
        element.removeEventListener('click', add__play_song);
    });
    play_active = true;
    play__button_activ();
}

function cards__play_of() {
    const cards_node = document.querySelectorAll('.card');
    button_play.style.borderRadius = '0';
    game_active = false;
    button_play.innerHTML = 'Start game';
    cards_node.forEach((element) => {
        element.querySelector('.card__text').style.display = 'block';
        element.querySelector('.card__coupimg').style.display = 'block';
        element.addEventListener('click', add__play_song);
        element.querySelector('.card__image').removeEventListener('click', click_card_game);
    });
    document.querySelector('.button__play').style.display = 'none';
    play_active = false;
    play__button_activ();
}

function add__play_song() {
    if (!event.target.classList.contains('card__coupimg')) {
        if (event.target.localName == 'div') {
            let card = cards.getcard(event.target.querySelector('.card__text').innerHTML);
            card.train_click += 1;
        } else
            event.target.parentElement.lastElementChild.play();
        let card = cards.getcard(event.target.parentElement.querySelector('.card__text').innerHTML);
        card.train_click += 1;

    }
}

function menu_click() {
    {
        if (document.querySelector('.menu_element_active'))
            document.querySelector('.menu_element_active').classList.remove('menu_element_active');
        event.target.classList.add('menu_element_active');
        button_play.innerHTML = 'Start game';
        game_active = false;
        main.innerHTML = '';

        if (event.target.innerHTML == 'Main Page') {
            cards.main_page();
            play__button_activ();
        } else {
            cards.cards.forEach((card) => {
                if (card.category == event.target.innerHTML) {
                    card.add__node(main);
                }
            });
            addevent_card();
            if (play_active)
                cards__play_on();
            else cards__play_of();
            main_page_activ = false;
        }
    }
    play__button_activ();
}


function play__button_activ() {
    if (!main_page_activ && play_active) document.querySelector('.button__play').style.display = 'block';
    else document.querySelector('.button__play').style.display = 'none';
}
cards.main_page();

button_play.addEventListener('click', () => {
    if (!game_active) {
        game_add_collecting_sounds();
        game_active = true;
        const cards_node = document.querySelectorAll('.card');
        cards_node.forEach((el) => {
            el.querySelector('.card__image').addEventListener('click', click_card_game); //card image
            button_play.innerHTML = 'Again';
        });
        collecting_sounds[0].play();
        errors = 0;
    } else {
        collecting_sounds[0].play();
    }
});


let collecting_sounds = [];
let errors = 0;
let error_mp3 = new Audio('audio/error.mp3');
let correctly_mp3 = new Audio('audio/correct.mp3');
let win_mp3 = new Audio('audio/success.mp3');
let lose_mp3 = new Audio('audio/failure.mp3');

function game_add_collecting_sounds() {
    collecting_sounds = Array.prototype.slice.call(main.querySelectorAll('.sound'));
    collecting_sounds.sort(function() {
        return Math.random() - 0.5;
    });
}

let smile = document.createElement('div');
smile.classList.add('smile');

function click_card_game() {
    if (event.target.parentElement.lastElementChild == collecting_sounds[0]) {
        event.target.parentElement.className = 'card_no_active';
        cards.getcard(collecting_sounds[0]).play_true += 1;
        collecting_sounds.shift();
        correctly_mp3.play();

        event.target.parentElement.querySelector('.card__image').removeEventListener('click', click_card_game);
        if (collecting_sounds.length == 0) {
            button_play.style.display = 'none';
            main.innerHTML = '';

            if (errors == 0) {
                smile.innerText = 'You win????';
                smile.style.color = 'rgb(19, 104, 104)'
                smile.style.fontSize = '40px'
                smile.style.marginTop = '230px'
                win_mp3.play();
            } else {
                smile.innerText = 'You lost ????';
                smile.style.color = 'rgb(19, 104, 104)'
                smile.style.fontSize = '40px'
                smile.style.marginTop = '230px'
                lose_mp3.play();
            }
            main.appendChild(smile);
            game_active = false;
            button_play.borderRadius = '0px';
            setTimeout(() => {
                cards.main_page();
                play__button_activ();
            }, 5000);

        } else setTimeout(() => { collecting_sounds[0].play() }, 1000);

    } else {
        error_mp3.play();
        errors++;
        cards.getcard(collecting_sounds[0]).play_false += 1;
    }
}