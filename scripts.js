owned_cards = Array();


function getownedsets() {
    owned_sets = new Set();
    expansions = {
        'b': 'dominion', //base
        'i': 'intrigue',
        's': 'seaside',
        'a': 'alchemy',
        'p': 'prosperity',
        'c': 'cornucopia',
        'h': 'hinterlands',
        'd': 'darkages',
        'g': 'guilds',
        'v': 'adventures',
        'e': 'empires',
    }

    for (var key in expansions) {
        span = document.getElementById('set_' + expansions[key]);
        span.classList.remove('selected');
    }

    letters = document.getElementById('expansions').value;
    i = 0;
    for (i = 0; i < letters.length; i++) {
        if (expansions.hasOwnProperty(letters[i])) {
            expansion = expansions[letters[i]];
            owned_sets.add(expansion)
            span = document.getElementById('set_' + expansion);
            span.classList.add('selected');
        }
    }

    
    return owned_sets;
}


function getownedcards(owned_sets, existing_cards) {
    owned_cards = [];
    var i;
    for (i = 0; i < existing_cards.length; i++) {
        if (owned_sets.has(existing_cards[i].set)) {
            owned_cards.push(existing_cards[i]);
        }
    }
    return owned_cards;
}

function getownednotcards(owned_sets, existing_notcards) {
    owned_notcards = [];
    var i;
    for (i = 0; i < existing_notcards.length; i++) {
        if (owned_sets.has(existing_notcards[i].set)) {
            owned_notcards.push(existing_notcards[i]);
        }
    }
    return owned_notcards;
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


function conditionsPassed(chosen_cards, chosen_tags, chosen_card_types) {

    // condition: cards that NEED attack should appear alongside attacks
    if ((chosen_tags['needs_attacks'] >= 1) && !chosen_card_types.has('Attack')) {
        console.log(chosen_names);
        console.log('REJECTING set because it has cards that need attacks but no attacks.');
        return false;
    }

    // condition: costs
    var desiredcosts = document.getElementById('desiredcosts').value;

    var i;
    for (i = 0; i < chosen_cards.length; i++) {
        cost = new RegExp(chosen_cards[i].cost)
        desiredcosts = desiredcosts.replace(cost, '');
    }

    if (desiredcosts.length > 0) {
        console.log('Rejecting set - desired costs not present.');
        return false;
    }

    // condition: attacks
    var attacks = document.querySelector('input[name = "attacks"]:checked').id;
    if (attacks == 'attacks_none') {
        if (chosen_card_types.has('Attack')) {
            console.log('Attacks forbidden, so rejecting the set:');
            console.log(chosen_names);
            return false
            }
        }

    if (attacks == 'attacks_countered') {
        if (!attacksCountered(chosen_cards, chosen_names, chosen_tags)) {
            return false;
        }
    }

   // condition: Only newbie friendly cards
    var newbie_friendly = document.getElementById('newbies').checked;
    if (newbie_friendly == true) {
        var i;
        for (i = 0; i < chosen_cards.length; i++) {
            if (chosen_cards[i].complicated == true){
                console.log('Rejecting complicated ' + chosen_cards[i].name);
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
          displayed_cards[i].classList.add('hidden');
          }
}

function show_kingdom (owned_sets) {
    owned_cards = getownedcards(owned_sets, existing_cards);
    owned_notcards = getownednotcards(owned_sets, existing_notcards);

    // Hide cards if less than one expansion selected
    if (owned_cards.length < 13) {
        hide_all_cards();
        return;
    }

    var max_tries = 1000;
    for (attempt = 0; attempt < max_tries; attempt++) {

    chosen_cards = new Array();
    chosen_notcards = new Array();
    chosen_names = new Set();

    owned_cards = shuffleArray(owned_cards);
    owned_notcards = shuffleArray(owned_notcards);

    // Select the cards:
    var i;
    for (i = 0; i < 10; i++){
        choice = owned_cards[i];
        chosen_cards.push(choice);
        chosen_names.add(choice.name);
    }

    // Select events/landmarks:
    // TODO: no duplicate event/landmark
    if (owned_notcards.length > 0) {
        var i;
        for (i = 0; i < 2; i++){
            choice = owned_notcards[i];
            chosen_notcards.push(choice);
        }
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
    // Add events/landmarks


    // Check what card types there are. ONLY USED IN ONE PLACE
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


    if (!conditionsPassed(chosen_cards, chosen_tags, chosen_card_types)) {
        continue;
    }


    break;
    }

    // Sort output, leaving bane as 11th if present

    var first_ten = chosen_cards.slice(0, 10).sort(
    function(a, b){return a.cost - b.cost});
    chosen_cards = first_ten.concat(chosen_cards.slice(10));

    // insert chosen cards into page:

    document.getElementById('card_10').classList.add('hidden'); // bane
    document.getElementById('notcard_1').classList.add('hidden'); // event/landm1
    document.getElementById('notcard_2').classList.add('hidden'); // event/landm2
    var i;
    for (i = 0; i< chosen_cards.length; i++) {
        fig = document.getElementById('card_' + i);

        fig.classList.remove('hidden');
        fig.setAttribute('alt', chosen_cards[i].text);
        fig.querySelector('figcaption').textContent = chosen_cards[i].name;
        fig.querySelector('.card_cost').textContent = chosen_cards[i].cost;
        fig.querySelector('.card_type').textContent = chosen_cards[i].types;

    }
    if (chosen_notcards.length > 0) {
        fig = document.getElementById('notcard_1');
        fig.classList.remove('hidden');
        fig.setAttribute('alt', chosen_notcards[0].text);
        fig.querySelector('figcaption').textContent = chosen_notcards[0].name;
        fig.querySelector('.card_cost').textContent = chosen_notcards[0].cost;
        fig.querySelector('.card_type').textContent = chosen_notcards[0].types;

        fig = document.getElementById('notcard_2');
        fig.classList.remove('hidden');
        fig.setAttribute('alt', chosen_notcards[1].text);
        fig.querySelector('figcaption').textContent = chosen_notcards[1].name;
        fig.querySelector('.card_cost').textContent = chosen_notcards[1].cost;
        fig.querySelector('.card_type').textContent = chosen_notcards[1].types;
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
