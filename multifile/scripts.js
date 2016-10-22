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


// TODO: abbreviate only if multiple types
function abbrev(words) {
    var abbrev = [];
    if (words.length < 2) {
        return words;
    }
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
    var needed_sets = document.getElementById('per-set').value.toLowerCase();
    var needed_costs = document.getElementById('per-cost').value.toLowerCase();
    for (var key in LETTER_TO_SET) {
        var span = document.getElementById('set-' + LETTER_TO_SET[key]);
        span.classList.remove('selected');

        if (which_sets.indexOf(key) != -1 || needed_sets.indexOf(key) != -1) {
            var expansion = LETTER_TO_SET[key];
            owned_sets.add(expansion)
            var span = document.getElementById('set-' + expansion);
            span.classList.add('selected');
        }
        if (needed_costs.indexOf('p') != -1) {
            owned_sets.add('alchemy');
            document.getElementById('set-alchemy').classList.add('selected');
        }
        if (needed_costs.indexOf('d') != -1) {
            owned_sets.add('empires');
            document.getElementById('set-empires').classList.add('selected');
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
        var span = document.getElementById('promo-' + digit);
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
                var span = document.getElementById('promo-' + PROMOS[notcard.name]);
                span.classList.add('selected');
            }
    }
    return owned_notcards;
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffled_array(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


// TODO: smells of object method!
function costs_it_removes(card, needed_costs) {
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
function sets_it_removes(card, needed_sets) {
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
function card_is_banned(card, chosen, newbie_friendly) {
    if (newbie_friendly && card.tags.indexOf('complicated') != -1) {
        return true;
    }
    if (chosen.banned_sets.has(SET_TO_LETTER[card.set])) {
        return true;
    }
    if (card.potion && chosen.banned_costs.has('p')) {
        return true;
    }
    if (card.debt && chosen.banned_costs.has('d')) {
        return true;
    }
    return false;
}


function chars_removed(removed_in, removed) {
    for (ch of removed) {
        removed_in = removed_in.replace(ch, '');
    }
    return removed_in;
}


// if set of the processed card is on the list of EXACT set requirements
// AND the card finishes the requirement, ban the set. More would exceed
// the EXACT requirement.
function updated_banned(banned, chars_removed, requirement_string) {
    var exact_requirements = chars_removed.replace(/[^A-Z]/g, '');
    for (ch of exact_requirements) {
        if (requirement_string.indexOf(ch) == -1) {
            banned.add(ch.toLowerCase());
        }
    }
    return banned;
}


// return true if the string contains the SAME LETTER in upper and lowercase.
// It makes no sense to request EXACTLY 3 Seaside AND 3+ Seaside cards.
function upper_with_lower(text) {
    return (new Set(text).size != new Set(text.toLowerCase()).size);
}


// Requirements like costs or expansions can be checked independently
// on a card-by-card basis, meaning they can be fulfilled on the first run!
function get_ten_cards(chosen) {
    var cards_not_requested = [];
    var needed_costs = document.getElementById('per-cost').value;
    var needed_sets = document.getElementById('per-set').value;
    var newbie_friendly = document.getElementById('newbies').checked;

    if (upper_with_lower(needed_costs) || upper_with_lower(needed_sets)) {
        return chosen;
    }

    for (var card of chosen.owned_cards) {
        if (card_is_banned(card, chosen, newbie_friendly)) {
            continue;
        }

        var costs_removed = costs_it_removes(card, needed_costs);
        var sets_removed = sets_it_removes(card, needed_sets);

        if (needed_costs || needed_sets) {
            if (costs_removed || sets_removed) {
                chosen.cards.push(card);
                chosen.names.add(card.name);
                
                needed_sets = chars_removed(needed_sets, sets_removed);
                chosen.banned_sets = updated_banned(chosen.banned_sets, sets_removed, needed_sets);
                needed_costs = chars_removed(needed_costs, costs_removed);
                chosen.banned_costs = updated_banned(chosen.banned_costs, costs_removed, needed_costs);
            }
            else {
                cards_not_requested.push(card);
            }
        }
        else {
            if (chosen.cards.length + cards_not_requested.length >= 10) {
                chosen.success = true;
                break
            }
            else {
                chosen.cards.push(card);
                chosen.names.add(card.name);
            }
        }
    }
    // time to pad the result with cards which weren't requested
    // but are okay to have.
    for (ncard of cards_not_requested.slice(0, 10 - chosen.cards.length)) {
        chosen.cards.push(ncard);
        chosen.names.add(ncard.name);
    }
    // slice in case user requests too many cards (costs/sets)
    chosen.cards = chosen.cards.slice(0, 10);
    return chosen;
}


function attackCountered(attack_card, chosen) {
    var counters = attack_card.countered_by || [];

    if (counters.indexOf('M_mostly_harmless') > -1) {
        console.log(attack_card.name + ' is mostly harmless.');
        return true;
    }

    if (chosen.names.has('Young Witch')) {
        console.log('Young Witch has a counter by definition.');
        return true;
    }

    if (chosen.tags['counters_attacks'] > 0) {
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
            if (chosen.tags[counter] - counters_itself > 0) {
                console.log(attack_card.name + ' countered by ' + counter);
                return true;
        }
    }
    console.log(attack_card.name + ' NOT COUNTERED');
    return false;
}


function attacksCountered(chosen) {
        for (var card of chosen.cards) {
            if (card.types.indexOf('Attack') != -1) {
                if (!attackCountered(card, chosen)) {
                     console.log(chosen.names);
                     return false;
                }
            }
        }
        return true;
    }


// Check more sophisticated conditions, card relationships etc.
// These can't really be done on the first run.
function conditionsPassed(chosen) {

    // condition: cards that NEED attack should appear alongside attacks
    if ((chosen.tags['needs_attacks'] >= 1) && !chosen.card_types.has('Attack')) {
        console.log(chosen.names);
        console.log('REJECTING set because it has cards that need attacks but no attacks.');
        return false;
    }

    // condition: attacks
    var attacks = document.querySelector('input[name = "attacks"]:checked').id;
    if (attacks == 'attacks-none') {
        if (chosen.card_types.has('Attack')) {
            console.log('Attacks forbidden, so rejecting the set:');
            console.log(chosen.names);
            return false
            }
        }
    // TODO: The above can be checked on first run, but is it worth it ?

    if (attacks == 'attacks-countered') {
        if (!attacksCountered(chosen)) {
            return false;
        }
    }
    return true;
}


function hide_all_cards() {
    var displayed_cards = document.getElementsByTagName('figure');
    for (var dcard of displayed_cards) {
        dcard.classList.add('hidden');
    }
}


function paintPaper(source, target) {
    target.classList.remove('hidden');
    target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve', 'landmark');
    for (set in SET_TO_LETTER) {
        target.classList.remove(set);
    }
    target.classList.add(source.set);

    target.setAttribute('alt', source.text);
    target.querySelector('figcaption').textContent = source.name;
    target.querySelector('.card-type').innerHTML = abbrev(source.types);

    target.querySelector('.coin-cost').textContent = source.cost;
    target.querySelector('.coin-cost').textContent += source.cost_extra || '';
    target.querySelector('.debt-cost').textContent = source.debt || '';
    if (!target.classList.contains('horizontal')) {
        if (source.cost == 0) {
            target.querySelector('.coin-cost').textContent = '';
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


function present_results(chosen) {
    // Sort before displaying, leaving bane as 11th if present
    // and the source array unchanged
    var result = chosen.cards.slice(0, 10).sort(function(a, b){
        return a.cost - b.cost});
    result = result.concat(chosen.cards.slice(10));

    // insert chosen cards into page:
    for (var i = 0; i < result.length; i++) {
        fig = document.getElementById('card-' + i);
        paintPaper(result[i], fig);
    }
    for (var i = 0; i < chosen.notcards.length; i++) {
        fig = document.getElementById('notcard-' + i);
        paintPaper(chosen.notcards[i], fig);
    }
}


// TODO: method on chosen ?
function get_stats(cards) {
    // Check what card types there are. ONLY USED IN ONE PLACE
    var card_types = new Set();
    var tags = new Array()

    for (var card of cards) {
        for (var typ of card.types) {
            card_types.add(typ);
            if (typ == 'Treasure') {
                // TODO: the tag seems currently unused.
                tags['SPECIAL_alt_treasure'] = 1;
            }
        }
        for (var tag of card.tags) {
            if (tags[tag] === undefined)
            {
                tags[tag] = 1;
            }
            else  {
                tags[tag] += 1;
            }
        }
    }
    return [tags, card_types];
}


function show_kingdom(owned_sets, promo_names) {
    var max_tries = 1000;

    // chosen - stores context of a single "Randomize" button press
    var chosen = new Object();
    chosen.owned_cards = get_owned_cards(owned_sets, existing_cards, promo_names);
    chosen.owned_notcards = get_owned_notcards(owned_sets, existing_notcards, promo_names);

    hide_all_cards();
    if (chosen.owned_cards.length < 13) {
        return chosen;
    }

    for (attempt = 0; attempt < max_tries; attempt++) {
        chosen.cards = new Array();
        chosen.names = new Set();
        chosen.success = false;
        chosen.notcards = new Array();
        chosen.banned_sets = new Set(); // user inputs uppercase set letters
        chosen.banned_costs = new Set(); // P/D; no uppercase digits (yet!)

        // D A N G E R !!!!
        //
        // Several places of the program RELY on the fact owned_cards and
        // owned_notcards are shuffled.
        //
        // D A N G E R !!!!
        chosen.owned_cards = shuffled_array(chosen.owned_cards);
        chosen.owned_notcards = shuffled_array(chosen.owned_notcards);

        var chosen = get_ten_cards(chosen);
        if (!chosen.success) {
            continue;
        }
        // Select events/landmarks:
        chosen.notcards = get_chosen_notcards(chosen.owned_notcards);
        may_add_colony_platinum(chosen.cards);
        may_add_shelters(chosen.cards);

        if (chosen.names.has('Young Witch')) {
            var bane = get_bane(chosen.owned_cards, chosen.names);
            if (bane === undefined) {
                continue;
            }
            chosen.cards.push(bane);
            chosen.names.add(bane.name);
        }

        [chosen.tags, chosen.card_types] = get_stats(chosen.cards);
        if (!conditionsPassed(chosen)) {
            continue;
        }
        break;
    }
    if (attempt == max_tries) {
        hide_all_cards();
        return chosen;
    }
    present_results(chosen);
    return chosen;
}


// TODO: possible bugs when no card fits
// TODO: possible bug with cost requesting feature
function get_bane(owned_cards, card_names) {
    for (var card of owned_cards) {
        if ((card.cost == 2 || card.cost == 3) && !card_names.has(card.name)) {
            return card;
        }
    }
}


function may_add_colony_platinum(chosen_cards) {
    var prosperity = document.querySelector('input[name = "prosperity"]:checked').id;
    if (prosperity == 'prosperity-never') {
        // Do nothing
    }
    else if (prosperity == 'prosperity-1') {
        for (var card of chosen_cards) {
            if (card.cost >= 6) {
                document.getElementById('colony').classList.remove('hidden');
                document.getElementById('platinum').classList.remove('hidden');
                break;
            }
        }
    }
    else if (prosperity == 'prosperity-proportional') {
        var to_check = Math.floor(Math.random() * 10);
        if (chosen_cards[to_check].set == 'prosperity') {
            document.getElementById('colony').classList.remove('hidden');
            document.getElementById('platinum').classList.remove('hidden');
        }
    }
    else if (prosperity == 'prosperity-always') {
        document.getElementById('colony').classList.remove('hidden');
        document.getElementById('platinum').classList.remove('hidden');
    }
}


function may_add_shelters(chosen_cards) {
    var shelters = document.getElementById('shelters');
    var darkages = document.querySelector('input[name = "darkages"]:checked').id;
    if (darkages == 'darkages-never') {
        // Do nothing
    }
    else if (darkages =='darkages-1') {
        for (var card of chosen_cards) {
            if (card.set == 'darkages') {
                shelters.classList.remove('hidden');
                break;
            }
        }
    }
    else if (darkages =='darkages-proportional') {
        var to_check = Math.floor(Math.random() * 10);
        if (chosen_cards[to_check].set == 'darkages') {
            shelters.classList.remove('hidden');
        }
    }
    else if (darkages =='darkages-always') {
        shelters.classList.remove('hidden');
    }
}


// TODO: make this a method ?
function get_chosen_notcards(owned_notcards) {
    var chosen_notcards = [];
    if (owned_notcards.length > 0) {
        var notcards = document.querySelector('input[name = "notcards"]:checked').id;
        var notcard_count;
        if (notcards == 'notcards-random') {
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
    return chosen_notcards;
}


// TODO: find a way to reuse code from get_ten_cards() ?
// This is a bit messy and doesn't respect costs/sets.
function swipe(figure, chosen) {
    if (!/^card-[0-9]$/.test(figure.id)) {
        return chosen;
    }
    var highest = [];
    for (var card of chosen.cards) {
        highest.push(chosen.owned_cards.indexOf(card));
    }
    highest = Math.max(...highest);

    var old_index = figure.id.match(/\d+/)[0];

    var success = false;
    for (var i = highest + 1; i < chosen.owned_cards.length; i++) {
        var new_card = chosen.owned_cards[i];
        if (chosen.names.has(new_card.name)) {
            continue;
        }
        // TODO: does newbie_friendly belong into chosen ?
        var newbie_friendly = document.getElementById('newbies').checked;
        if (card_is_banned(new_card, chosen, newbie_friendly)) {
            continue;
        }
        chosen.names.delete(chosen.cards[old_index].name);
        chosen.names.add(new_card.name);
        chosen.cards[old_index] = new_card;
        [chosen.tags, chosen.card_types] = get_stats(chosen.cards);
        if (!conditionsPassed(chosen)) {
            continue;
        }
        success = true;
        break;
    }
    if (!success) {
        return chosen;
    }
    var target = document.getElementById(figure.id);
    paintPaper(new_card, target);
    return chosen;
}


function click_handler(evnt) {
    var clicked = evnt.currentTarget;
    if (clicked.id == 'btn-randomize') {
        chosen = show_kingdom(owned_sets, promo_names);
    }
    else {
        chosen = swipe(clicked, chosen);
    }
}


// set global variables and attach event listeners:
var owned_sets = get_owned_sets();
var promo_names = get_promo_names();
var chosen;


document.getElementById('btn-randomize').addEventListener('click',
        click_handler);
document.getElementById('expansions').addEventListener('keyup',
    function() {
    owned_sets = get_owned_sets();
    promo_names = get_promo_names();
});

document.getElementById('per-set').addEventListener('keyup',
    function() {owned_sets = get_owned_sets();});

document.getElementById('per-cost').addEventListener('keyup',
    function() {owned_sets = get_owned_sets();});

for (var fig of document.getElementsByTagName('figure')) {
    fig.addEventListener('click', click_handler);
}
