LETTER_TO_SET = {
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
    'o': 'promos',
}


SET_TO_LETTER = {
    'dominion': 'b', //base
    'intrigue': 'i',
    'seaside': 's',
    'alchemy': 'a',
    'prosperity': 'p',
    'cornucopia': 'c',
    'hinterlands': 'h',
    'darkages': 'd',
    'guilds': 'g',
    'adventures': 'v',
    'empires': 'e',
    'promos': 'o',
}
// TODO: The above can probably be replaced with one Map.

PROMOS = new Map([
    ['Envoy', 1],
    ['Black Market', 2],
    ['Stash', 3],
    ['Walled Village', 4],
    ['Governor', 5],
    ['Prince', 6],
    ['Summon', 7],
    ]);


owned_cards = Array();


// TODO: abbreviate only if multiple types
function abbrev(words) {
    var abbrev = [];
    for (var word of words) {
        first_letter = word[0];
        last_letter = word.slice(-1);
        middle = '<span class="notphone">' + word.slice(1, -1) + '</span>';
        abbrev.push(first_letter + middle + last_letter);
    }
    abbrev = abbrev.join('-');
    return abbrev
}

function get_owned_sets() {
    var owned_sets = new Set();
    var which_sets = document.getElementById('expansions').value.toLowerCase();
    var how_many = document.getElementById('howmany').value.toLowerCase();
    var costs = document.getElementById('neededcosts').value.toLowerCase();
    for (var key in LETTER_TO_SET) {
        var span = document.getElementById('set_' + LETTER_TO_SET[key]);
        span.classList.remove('selected');

        if (which_sets.indexOf(key) != -1 || how_many.indexOf(key) != -1) {
            var expansion = LETTER_TO_SET[key];
            owned_sets.add(expansion)
            var span = document.getElementById('set_' + expansion);
            span.classList.add('selected');
        }
        if (costs.indexOf('p') != -1) {
            owned_sets.add('alchemy');
            document.getElementById('set_alchemy').classList.add('selected');
        }
        if (costs.indexOf('d') != -1) {
            owned_sets.add('empires');
            document.getElementById('set_empires').classList.add('selected');
        }
        // TODO: add overpay and cost 7,8... once the dust has settled.
    }
    return owned_sets;
}


function get_promo_names() {
    var promo_names = new Set();
    var user_input = document.getElementById('expansions').value.toLowerCase();
    for (var promo_name of PROMOS.keys()) {
        var digit = PROMOS.get(promo_name);
        var span = document.getElementById('promo_' + digit);
        if (user_input.indexOf(digit) != -1) {
            span.classList.add('selected');
            promo_names.add(promo_name);
        }
        else {
             span.classList.remove('selected');
        }
    }
    return promo_names;
}

function get_owned_cards(owned_sets, existing_cards, promo_names) {
    var owned_cards = [];

    for (var this_card of existing_cards) {
        if (owned_sets.has(this_card.set)) {
            owned_cards.push(this_card);
        }
    else if (promo_names.has(this_card.name)) {
            owned_cards.push(this_card);
        }
    }
    return owned_cards;
}

function get_owned_notcards(owned_sets, existing_notcards, promo_names) {
    var owned_notcards = [];
    for (var notcard of existing_notcards) {
        if (owned_sets.has(notcard.set)) {
            owned_notcards.push(notcard);
        }
        else if (promo_names.has(notcard.name)) {
                owned_notcards.push(notcard);
                var span = document.getElementById('promo_' + PROMOS[notcard.name]);
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


// TODO: smells of object method!
function costs_it_replaces(card, needed_costs) {
    var costs = '';
    if (needed_costs.indexOf(card.cost) != -1) {
        costs += card.cost;
    }
    // TODO: potion makes more sense as a tag
    if (card.potion == true) {
        if (needed_costs.indexOf('p') != -1) {
            costs += 'p';
        }
        else if (needed_costs.indexOf('P') != -1) {
            costs += 'P';
        }
    }
    if (card.debt > 0) {
        if (needed_costs.indexOf('d') != -1) {
            costs += 'd';
        }
        else if (needed_costs.indexOf('D') != -1) {
            costs += 'D';
        }
    }
    return costs;
}


// TODO: smells of object method!
function sets_it_replaces(card, needed_sets) {
    var sets = '';
    var letter = SET_TO_LETTER[card.set];
    if (needed_sets.indexOf(letter) != -1) {
        sets += letter;
    }
    else if (needed_sets.indexOf(letter.toUpperCase()) != -1) {
        sets += letter.toUpperCase();
    }
    else if (card.set == 'promos') {
        for (var promo of PROMOS.keys()) {
            if (PROMOS[promo] == card.name) {
                sets += promo;
                break;
            }
        }
    }
    return sets;
}


// TODO: smells of object method!
function card_is_banned(card, banned_sets, banned_costs, newbie_friendly) {
    if (newbie_friendly && card.complicated) {
        return true;
    }
    if (banned_sets.has(card.set)) {
        return true;
    }
    if (card.potion && banned_costs.has('potion')) {
        return true;
    }
    if (card.debt && banned_costs.has('debt')) {
        return true;
    }
    return false;
}


// Requirements like costs or expansions can be checked independently
// on a card-by-card basis, meaning they can be fulfilled on the first run!
function get_ten_cards(owned_cards) {

    // TODO: make bulletproof:
    // TODO: user entering sssSSS
    var chosen_cards = [];
    var cards_not_requested = [];
    var chosen_names = new Set();
    var success = false;
    var needed_costs = document.getElementById('neededcosts').value;
    var needed_sets = document.getElementById('howmany').value;
    var newbie_friendly = document.getElementById('newbies').checked;

    var banned_sets = new Set(); // user inputs uppercase set letters
    var banned_costs = new Set(); // P/D; no uppercase digits (yet!)

    for (var card of owned_cards) {
        if (card_is_banned(card, banned_sets, banned_costs, newbie_friendly)) {
            continue;
        }


        var costs_replaced = costs_it_replaces(card, needed_costs);
        var sets_replaced = sets_it_replaces(card, needed_sets);
        // is this NOT one of the requested cards ?
        if (!(costs_replaced || sets_replaced)) {

            if (cards_not_requested.length + chosen_cards.length < 10) {
            // not requested, but not banned either
            // can be used to pad requested cards with
            cards_not_requested.push(card);
            }
        }
        else {

            // yes, one of the requested cards!
            chosen_cards.push(card);
            chosen_names.add(card.name);

            // substract SETS of the card from user's input string
            for (var ch of sets_replaced) {
                needed_sets = needed_sets.replace(ch, '');
                if ((ch != ch.toLowerCase()) &&
                        (needed_sets.indexOf(ch) == -1)) {
                    // If uppercase letters just ran out, it means
                    // we've just found the last card from that set
                    // (and user requested EXACTLY as many)
                    banned_sets.add(card.set);
                }
            }

            // substract COSTS of the card from user's input string
            for (var ch of costs_replaced) {
                needed_costs = needed_costs.replace(ch, '');
                if ((costs_replaced.indexOf('P') != -1) &&
                        (needed_costs.indexOf('P') == -1)) {
                    banned_costs.add('potion');
                }
                if ((costs_replaced.indexOf('D') != -1) &&
                        (needed_costs.indexOf('D') == -1)) {
                    banned_costs.add('debt');
                }
            }

        }

        if ((needed_costs.length == 0) && (needed_sets.length == 0)) {
            if (chosen_cards.length + cards_not_requested.length >= 10) {
                success = true;
                break;
            }
        }
    }

    if (!success) {
        return {'success': false};
    }
    // time to pad the result with cards which weren't requested
    // but are okay to have.

    for (ncard of cards_not_requested.slice(0, 10 - chosen_cards.length)) {
        chosen_cards.push(ncard);
        chosen_names.add(ncard.name);
    }
    // slice in case user requests too many cards (costs/sets)
    return {
        'chosen_cards': chosen_cards.slice(0, 10),
        'chosen_names': chosen_names,
        'success': success,
    }
}


function attackCountered(attack_card, chosen_tags, chosen_names) {
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
    for (var counter of counters) {
            counters_itself = 0;
            if (attack_card.tags.indexOf(counter) > -1) {
                counters_itself = 1;
            }
            // TODO: attacks countered by events
            if (chosen_tags[counter] - counters_itself > 0) {
                console.log(attack_card.name + ' countered by ' + counter);
                return true;
        }
    }
    console.log(attack_card.name + ' NOT COUNTERED');
    return false;
}


function attacksCountered(chosen_cards, chosen_names, chosen_tags) {
        for (var card of chosen_cards) {
            if (card.types.indexOf('Attack') != -1) {
                if (!attackCountered(card, chosen_tags, chosen_names)) {
                     console.log(chosen_names);
                     return false;
                }
            }
        }
        return true;
    }


// Check more sophisticated conditions, card relationships etc.
// These can't really be done on the first run.
function conditionsPassed(chosen_cards, chosen_names, chosen_tags, chosen_card_types) {

    // condition: cards that NEED attack should appear alongside attacks
    if ((chosen_tags['needs_attacks'] >= 1) && !chosen_card_types.has('Attack')) {
        console.log(chosen_names);
        console.log('REJECTING set because it has cards that need attacks but no attacks.');
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
    // TODO: The above can be checked on first run, but is it worth it ?

    if (attacks == 'attacks_countered') {
        if (!attacksCountered(chosen_cards, chosen_names, chosen_tags)) {
            return false;
        }
    }
    return true;
}


function hide_all_cards () {
    var displayed_cards = document.getElementsByTagName('figure');
    for (var dcard of displayed_cards) {
          dcard.classList.add('hidden');
          }
}


function paintPaper(source, target) {
    target.classList.remove('hidden');
    target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve', 'landmark');
    target.classList.remove('promos', 'dominion', 'intrigue', 'seaside', 'alchemy', 'prosperity', 'cornucopia', 'hinterlands', 'darkages', 'guilds', 'adventures', 'empires');
    target.classList.add(source.set);

    target.setAttribute('alt', source.text);
    target.querySelector('figcaption').textContent = source.name;
    target.querySelector('.card_type').innerHTML = abbrev(source.types);

    target.querySelector('.coin_cost').textContent = source.cost;
    target.querySelector('.coin_cost').textContent += source.cost_extra || '';
    target.querySelector('.debt_cost').textContent = source.debt || '';
    if (!target.classList.contains('horizontal')) {
        if (source.cost == 0) {
            target.querySelector('.coin_cost').textContent = '';
        }
        if (source.hasOwnProperty('potion')) {
            target.querySelector('.potion').classList.remove('hidden');
        }
        else {
            target.querySelector('.potion').classList.add('hidden');
        }
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
    else if (source.types.indexOf('Landmark') != -1) {
        target.classList.add('landmark');
    }

}


function show_kingdom (owned_sets, promo_names) {
    var owned_cards = get_owned_cards(owned_sets, existing_cards, promo_names);
    var owned_notcards = get_owned_notcards(owned_sets, existing_notcards, promo_names);

    // Hide cards if less than one expansion selected
    if (owned_cards.length < 13) {
        hide_all_cards();
        return;
    }

    var max_tries = 1000;
    for (attempt = 0; attempt < max_tries; attempt++) {

    var chosen_notcards = new Array();
    var chosen_names = new Set();

    var owned_cards = shuffleArray(owned_cards);
    var owned_notcards = shuffleArray(owned_notcards);

    var stuff = get_ten_cards(owned_cards);
    if (!stuff.success) {
        continue;
    }
    var chosen_cards = stuff.chosen_cards;
    var chosen_names = stuff.chosen_names;


    // Select events/landmarks:
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
    for (var card of chosen_cards) {
              for (var tag of card.types) {
                chosen_card_types.add(tag);
              }
    }

    // Count appearances of all card tags and put them into array:
    var chosen_tags = new Array()

    if (chosen_card_types.has('Treasure')) {
    chosen_tags['M_alt_treasure'] = 1;
    }

    for (var card of chosen_cards) {
        for (var tag of card.tags) {
            if (chosen_tags[tag] === undefined)
            {
                chosen_tags[tag] = 1;
            }
            else  {
                chosen_tags[tag] += 1;
            }
        }
    }

    if (!conditionsPassed(chosen_cards, chosen_names, chosen_tags, chosen_card_types)) {
        continue;
    }

    break;
    }

    // TODO: move it somewhere
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


// TODO: possible bugs when no card fits
// TODO: possible bug with cost requesting feature
function get_bane (owned_cards, chosen_names) {
    for (var card of owned_cards) {
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
        for (var card of chosen_cards) {
            if (card.cost >= 6) {
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
        for (var card of chosen_cards) {
            if (card.set == 'darkages') {
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
        if (notcards == 'notcards_random') {
            notcard_count = Math.floor(Math.random() * 3);
        }
        else {
            notcard_count = notcards.slice(-1);
        }
        for (var i in owned_notcards) {
            if (i == notcard_count) {
                break
            }
            chosen_notcards.push(owned_notcards[i]);

        }
    }
}

