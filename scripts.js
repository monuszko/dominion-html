EXPANSIONS = {
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
owned_cards = Array();


function abbrev(words) {
    var abbrev = [];
    var j;
    for (j = 0; j < words.length; j++) {
        first_letter = words[j][0];
        last_letter = words[j].slice(-1);
        middle = '<span class="notphone">' + words[j].slice(1, -1) + '</span>';
        abbrev.push(first_letter + middle + last_letter);
    }
    abbrev = abbrev.join('-');
    return abbrev
}

function getownedsets() {
    owned_sets = new Set();
    which_sets = document.getElementById('expansions').value.toLowerCase();
    how_many = document.getElementById('howmany').value.toLowerCase();
    for (var key in EXPANSIONS) {
        span = document.getElementById('set_' + EXPANSIONS[key]);
        span.classList.remove('selected');

        if (which_sets.indexOf(key) != -1 || how_many.indexOf(key) != -1) {
            expansion = EXPANSIONS[key];
            owned_sets.add(expansion)
            span = document.getElementById('set_' + expansion);
            span.classList.add('selected');
        }
    }
    return owned_sets;
}


function getpromonames() {
promos = {
    1: 'Envoy',
    2: 'Black Market',
    3: 'Stash',
    4: 'Walled Village',
    5: 'Governor',
    6: 'Prince',
    7: 'Summon'
    }

    promo_names = new Set();
    user_input = document.getElementById('expansions').value.toLowerCase();

    for (var key in promos) {
        if (promos.hasOwnProperty(key)) {
            span = document.getElementById('promo_' + key);
            if (user_input.indexOf(key) != -1) {
                span.classList.add('selected');
                promo_names.add(promos[key]);
            }
            else {
                span.classList.remove('selected');
            }
        }
    }
    return promo_names
}

function getownedcards(owned_sets, existing_cards, promo_names) {
    owned_cards = [];

    var i;
    for (i = 0; i < existing_cards.length; i++) {
        this_card = existing_cards[i];
        if (owned_sets.has(this_card.set)) {
            owned_cards.push(this_card);
        }
    else if (promo_names.has(this_card.name)) {
            owned_cards.push(this_card);
        }
    }
    return owned_cards;
}

function getownednotcards(owned_sets, existing_notcards) {
    owned_notcards = [];
    var i;
    for (i = 0; i < existing_notcards.length; i++) {
        this_notcard = existing_notcards[i];
        if (owned_sets.has(this_notcard.set)) {
            owned_notcards.push(this_notcard);
        }
        else if (user_input.indexOf(promos[this_notcard.name]) != -1) {
                owned_notcards.push(this_notcard);
                span = document.getElementById('promo_' + promos[this_notcard.name]);
                span.classList.add('selected');
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

function hasExpCounts(chosen_cards) {
    var howmany = document.getElementById('howmany').value;
    var actual_count;
    var min_count;
    var exact_count;
    var reg;
    if (howmany.length == 0) {
        return true;
    }

    for (key in EXPANSIONS) {
        actual_count = 0;
        for (var card_nr in chosen_cards) {
            if (chosen_cards[card_nr].set == EXPANSIONS[key]) {
                actual_count += 1;
            }
        }
        reg = new RegExp(key.toLowerCase(), "g");
        min_count = (howmany.match(reg) || []).length;
        reg = new RegExp(key.toUpperCase(), "g");
        exact_count = (howmany.match(reg) || []).length;

        if (min_count && actual_count < min_count) {
            return false;
        }
        if (exact_count && exact_count != actual_count) {
            return false;
        }
    }
    return true;
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


function costsPresent(chosen_cards) {
    var neededcosts = document.getElementById('neededcosts').value;
    var total_potions = 0;
    var exact_potions = 0;
    var total_debts = 0;
    var exact_debts = 0;

    var i;
    for (i = 0; i < chosen_cards.length; i++) {
        cost = chosen_cards[i].cost;
        neededcosts = neededcosts.replace(cost, '');

        if (chosen_cards[i].hasOwnProperty('potion')) {
            if (neededcosts.indexOf('P') != -1) {
                exact_potions += 1;
            }
            neededcosts = neededcosts.replace(/p/i, '');
            total_potions += 1;
        }
        if (chosen_cards[i].debt > 0) {
            if (neededcosts.indexOf('D') != -1) {
                exact_debts += 1;
            }
            neededcosts = neededcosts.replace(/d/i, '');
            total_debts += 1;
            // TODO: SPECIAL_generates_debt
            // TODO: disable Fortune and other second dual cards
        }
    }

    if (exact_potions > 0 && exact_potions != total_potions) {
        console.log('Rejecting set - user wants exact number of potions.');
        return false;
    }
    if (exact_debts > 0 && exact_debts != total_debts) {
        console.log('Rejecting set - user wants exact number of debts.');
        return false;
    }
    if (neededcosts.length > 0) {
        console.log('Rejecting set - needed costs not present.');
        return false;
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
    // TODO: Can be generated in the first pass.

    // condition: costs
    if (!costsPresent(chosen_cards)) {
        return false;
    }

    if (!hasExpCounts(chosen_cards)) {
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
    // TODO: Can be generated in the first pass.
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


function paintPaper(source, target) {
    target.classList.remove('hidden');
    target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve');

    target.setAttribute('alt', source.text);
    target.querySelector('figcaption').textContent = source.name;
    target.querySelector('.card_type').innerHTML = abbrev(source.types);

    target.querySelector('.coin_cost').textContent = source.cost || '';
    target.querySelector('.coin_cost').textContent += source.cost_extra || '';
    target.querySelector('.debt_cost').textContent = source.debt || '';

    if (source.hasOwnProperty('potion')) {
        target.querySelector('.potion').classList.remove('hidden');
    }
    else {
        target.querySelector('.potion').classList.add('hidden');
    }
    
    if (source.types.indexOf('Reaction') != -1) {
        target.classList.add('reaction');
    }
    else if (source.types.indexOf('Reserve') != -1) {
        target.classList.add('reserve');
    }
    else if (source.types.indexOf('Treasure') != -1) {
        target.classList.add('treasure');
    }
    else if (source.types.indexOf('Victory') != -1) {
        target.classList.add('victory');
    }
    else if (source.types.indexOf('Duration') != -1) {
        target.classList.add('duration');
    }

}


function show_kingdom (owned_sets, promo_names) {
    owned_cards = getownedcards(owned_sets, existing_cards, promo_names);
    owned_notcards = getownednotcards(owned_sets, existing_notcards);

    // Hide cards if less than one expansion selected
    if (owned_cards.length < 13) {
        hide_all_cards();
        return;
    }

    var max_tries = 1000;
    for (attempt = 0; attempt < max_tries; attempt++) {

    chosen_cards = new Array();
    var chosen_notcards = new Array();
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
    add_notcards(owned_notcards, chosen_notcards);
    may_add_colony_platinum(chosen_cards);
    may_add_shelters(chosen_cards);

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

    if (attempt == max_tries) {
        hide_all_cards();
        return;
    }

    // Sort output, leaving bane as 11th if present

    var first_ten = chosen_cards.slice(0, 10).sort(
    function(a, b){return a.cost - b.cost});
    chosen_cards = first_ten.concat(chosen_cards.slice(10));

    // insert chosen cards into page:

    document.getElementById('card_10').classList.add('hidden'); // bane
    document.getElementById('notcard_0').classList.add('hidden'); // event/landm1
    document.getElementById('notcard_1').classList.add('hidden'); // event/landm2
    var i;
    for (i = 0; i < chosen_cards.length; i++) {
        fig = document.getElementById('card_' + i);

        paintPaper(chosen_cards[i], fig);
    }
    var j;
    for (j = 0; j < chosen_notcards.length; j++) {
        fig = document.getElementById('notcard_' + j);
        paintPaper(chosen_notcards[j], fig);
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


function may_add_colony_platinum(chosen_cards) {
    var colony_platinum = document.getElementById('colony_platinum');
    colony_platinum.classList.add('hidden');
    var prosperity = document.querySelector('input[name = "prosperity"]:checked').id;
    if (prosperity == 'prosperity_never') {
        // Do nothing
    }
    else if (prosperity =='prosperity_1') {
        for (var card_nr in chosen_cards) {
            if (chosen_cards[card_nr].cost >= 6) {
                colony_platinum.classList.remove('hidden');
                break;
            }
        }
    }
    else if (prosperity =='prosperity_proportional') {
        var to_check = Math.floor(Math.random() * 10);
        if (chosen_cards[to_check].set == 'prosperity') {
            colony_platinum.classList.remove('hidden');
        }
    }
    else if (prosperity =='prosperity_always') {
        colony_platinum.classList.remove('hidden');

    }
}

function may_add_shelters(chosen_cards) {
    var shelters = document.getElementById('shelters');
    shelters.classList.add('hidden');
    var darkages = document.querySelector('input[name = "darkages"]:checked').id;
    if (darkages == 'darkages_never') {
        // Do nothing
    }
    else if (darkages =='darkages_1') {
        for (var card_nr in chosen_cards) {
            if (chosen_cards[card_nr].set == 'darkages') {
                shelters.classList.remove('hidden');
                break;
            }
        }
    }
    else if (darkages =='darkages_proportional') {
        var to_check = Math.floor(Math.random() * 10);
        if (chosen_cards[to_check].set == 'darkages') {
            shelters.classList.remove('hidden');
        }
    }
    else if (darkages =='darkages_always') {
        shelters.classList.remove('hidden');

    }
}

function add_notcards(owned_notcards, chosen_notcards) {
    if (owned_notcards.length > 0) {
        var notcards = document.querySelector('input[name = "notcards"]:checked').id;
        var notcard_count;
        if (notcards == 'notcards_0') {
            notcard_count = 0;
        }
        else if (notcards == 'notcards_random') {
            notcard_count = Math.floor(Math.random() * 3);
        }
        else {
            notcard_count = 2;
        }
        var i;
        for (i = 0; i < notcard_count; i++){
            choice = owned_notcards[i];
            chosen_notcards.push(choice);
        }
    }
}

          //-->
