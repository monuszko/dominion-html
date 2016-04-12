owned_cards = Array();

function getownedcards() {
    owned_cards = [];
    owned_sets = new Set();
    existing_sets = [
        'dominion',
        'intrigue',
        'seaside',
        'alchemy',
        'prosperity',
        'cornucopia',
        'hinterlands',
        'darkages',
        'guilds',
        'adventures',
        'empires',
    ];

    console.log('All expansions is ' + parseInt('1'.repeat(existing_sets.length), 2));
    var checkbox;

    var i = 0;
    for (i = 0; i < existing_sets.length - 1; i++) {
        checkbox = document.getElementById('set_' + existing_sets[i]);
        checkbox.checked = false;
    }

    var magic_number;
    // Number is converted to binary, 0 - no expansion, 1 - expansion present
    magic_number = document.getElementById('expansions').value;
    var remainder;
    i = 0;
    while (magic_number > 0) {
        remainder = magic_number % 2;
        magic_number = Math.floor(magic_number / 2);

        checkbox = document.getElementById('set_' + existing_sets[i]);
        if (remainder == 1) {
            checkbox.checked = true;
            owned_sets.add(existing_sets[i]);
        }
        i++;
    }

    var i;
    for (i = 0; i < existing_cards.length; i++) {
        if (owned_sets.has(existing_cards[i].set)) {
            owned_cards.push(existing_cards[i]);
        }
    }
    return owned_cards;
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function attackCountered(attack_card, chosen_tags) {
    var counters = attack_card.countered_by;

    if (counters.indexOf('M_mostly_harmless') > -1) {
        console.log(attack_card.name + ' is mostly harmless.');
        return true;
    }

    if (chosen_names.has('Young Witch')) {
        console.log('Young Witch has a counter by definition.');
        return true;
    }

    if (chosen_tags['counters_attacks'] > 0) {
        console.log('Attack ' + attack_card.name + ' countered by Moat/Lighthouse.');
        return true;
    }

    var counters_itself;
    var i;
    for (i=0; i <counters.length; i++) {
            counters_itself = 0;
            if (attack_card.tags.indexOf(counters[i]) > -1) {
                counters_itself = 1;
            }
            if (chosen_tags[counters[i]] - counters_itself > 0) {
                console.log(attack_card.name + ' countered by ' + counters[i]);
                return true;
        }
    }
    console.log(attack_card.name + ' NOT COUNTERED');
    return false;
}


function attacksCountered(chosen_cards, chosen_names, chosen_tags) {
        var i;
        for (i = 0; i < chosen_cards.length; i++) {
            if (chosen_cards[i].types.indexOf('Attack') != -1) {
                if (!attackCountered(chosen_cards[i], chosen_tags)) {
                     console.log(chosen_names);
                     return false;
                }
            }
        }
        return true;
    }



function hide_all_cards () {
    //TODO: there's probably a more idiomatic way to hide cards.
    var displayed_cards = document.getElementsByTagName('figure');
    var i;
    for (i = 0; i < displayed_cards.length; i++) {
          displayed_cards[i].className = 'hidden';
          }
}

function show_cards (owned_cards) {
    // Hide cards if less than one expansion selected
    if (owned_cards.length < 13) {
        hide_all_cards();
        return;
    }

    var max_tries = 1000;
    for (attempt = 0; attempt < max_tries; attempt++) {

    chosen_cards = new Array();
    chosen_names = new Set();

    owned_cards = shuffleArray(owned_cards);

    // Select the cards:
    var i;
    for (i = 0; i < 10; i++){
        choice = owned_cards[i];
        chosen_cards.push(choice);
        chosen_names.add(choice.name);
    }

    // add Bane if Young Witch is present.
    // reject the set if no valid bane remains.
    //
    if (chosen_names.has('Young Witch')) {
        var bane = get_bane(owned_cards, chosen_names);
        if (bane === undefined) {
            continue;
        }
        chosen_cards.push(bane);
        chosen_names.add(bane.name);
    }
    // Test conditions:
    
    var chosen_card_types = new Set();
    var i;
    for (i = 0; i < chosen_cards.length; i++) {
         var j;
              for (j = 0; j < chosen_cards[i].types.length; j++) {
                chosen_card_types.add(chosen_cards[i].types[j]);
              }
    }

    // Count appearances of all card tags and put them into array:
    var chosen_tags = new Array()

    if (chosen_card_types.has('Treasure')) {
    chosen_tags['M_alt_treasure'] = 1;
    }

    var tag;
    var i;
    for (i = 0; i < chosen_cards.length; i++) {
        var j;
        for (j = 0; j < chosen_cards[i].tags.length; j++) {
            tag = chosen_cards[i].tags[j];
            if (chosen_tags[tag] === undefined)
            {
                chosen_tags[tag] = 1;
            }
            else  {
                chosen_tags[tag] += 1;
            }
        }
    }


// condition: cards that NEED attack should appear alongside attacks
if ((chosen_tags['needs_attacks'] >= 1) && !chosen_card_types.has('Attack')) {
    console.log(chosen_names);
    console.log('REJECTING set because it has cards that need attacks but no attacks.');
    continue;
}

    // condition: costs
    var desiredcosts = document.getElementById('desiredcosts').value;

    var i;
    for (i = 0; i < chosen_cards.length; i++) {
        cost = new RegExp(chosen_cards[i].cost)
        desiredcosts = desiredcosts.replace(cost, '');
    }

    if (desiredcosts.length > 0) {
        continue;
    }

    // condition: attacks

    var attacks = document.querySelector('input[name = "attacks"]:checked').id;

    var no_flaws = true;
    if (attacks == 'attacks_rainbowsandunicorns') {
        if (chosen_card_types.has('Attack')) {
            no_flaws = false;
            console.log('Attacks forbidden, so rejecting the set:');
            console.log(chosen_names);
            }
        }

    if (attacks == 'attacks_noevilgoesunpunished') {
        no_flaws = attacksCountered(chosen_cards, chosen_names, chosen_tags);
    }

    if (no_flaws == false) {
      continue;
    }

    break;
    }

    // Sort output, leaving bane as 11th if present

    var first_ten = chosen_cards.slice(0, 10).sort(
    function(a, b){return a.cost - b.cost});
    chosen_cards = first_ten.concat(chosen_cards.slice(10));

    // insert chosen cards into page:

    document.getElementById('card_10').className = 'hidden'; // bane
    var i;
    for (i = 0; i< chosen_cards.length; i++) {
        fig = document.getElementById('card_' + i);

        fig.className = '';
        fig.setAttribute('alt', chosen_cards[i].text);
        fig.querySelector('figcaption').textContent = chosen_cards[i].name;
        fig.querySelector('.card_cost').textContent = chosen_cards[i].cost;
        fig.querySelector('.card_type').textContent = chosen_cards[i].types;

    }
}


function get_bane (owned_cards, chosen_names) {
    var i;
    for (i = 0; i < owned_cards.length; i++) {
        var card = owned_cards[i];
        if ((card.cost == 2 || card.cost == 3) && !chosen_names.has(card.name)) {
            return card;
        }
    }
}



          //-->
