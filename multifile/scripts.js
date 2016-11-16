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


// ECMAScript doesn't specify that Array.sort() is stable, and Chrome uses
// QuickSort instead of InsertionSort for lists > 10, so I need to roll my own.
function nice_and_stable_insertion_sort(alist, key) {
    var len = alist.length;
    var position, currentvalue;

    for (var index = 1; index < len; index++) {
        currentvalue = alist[index];
        position = index;
        while (position > 0 && key(alist[position-1]) > key(currentvalue)) {
            alist[position] = alist[position-1];
            position -= 1;
        }
        alist[position] = currentvalue;
    }
    return alist;
}




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


function get_owned_sets(user_input) {
    var owned_sets = new Set();
    var which_sets = user_input['expansions'];
    var needed_sets = user_input['per-set'].toLowerCase();
    var needed_costs = user_input['per-cost'].toLowerCase();

    for (var letter in LETTER_TO_SET) {

        if (which_sets.indexOf(letter) != -1 || needed_sets.indexOf(letter) != -1) {
            var expansion = LETTER_TO_SET[letter];
            owned_sets.add(expansion)
        }
        if (needed_costs.indexOf('p') != -1) {
            owned_sets.add('alchemy');
        }
        if (needed_costs.indexOf('d') != -1) {
            owned_sets.add('empires');
        }
        // TODO: add overpay and cost 7,8... once the dust has settled.
    }
    return owned_sets;
}


// TODO: maybe a method .add_set() should take care of this.
function mark_owned_sets(owned_sets) {
    for (var set in SET_TO_LETTER) {
        var span = document.getElementById('set-' + set);
        if (owned_sets.has(set)) {
            span.classList.add('selected');
        }
        else {
            span.classList.remove('selected');
        }
    }
}


function get_promo_names(user_input) {
    var promo_names = new Set();
    for (var promo_name of PROMOS.keys()) {
        var digit = PROMOS.get(promo_name);
        if (user_input['expansions'].indexOf(digit) != -1) {
            promo_names.add(promo_name);
        }
    }
    return promo_names;
}


function mark_owned_promos(promo_names) {
    for (promo_name of PROMOS.keys()) {
        var digit = PROMOS.get(promo_name);
        var span = document.getElementById('promo-' + digit);

        if (promo_names.has(promo_name)) {
            span.classList.add('selected');
        }
        else {
            span.classList.remove('selected');
        }
    }
}


function get_owned_cards(owned_sets, promo_names) {
    var owned_cards = [];

    for (var this_card of EXISTING_CARDS) {
        if (owned_sets.has(this_card.set)) {
            owned_cards.push(this_card);
        }
    else if (promo_names.has(this_card.name)) {
            owned_cards.push(this_card);
        }
    }
    return owned_cards;
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


function types_it_removes(card, needed_types) {
    var types = '';
    if (card.types.indexOf('Event') != -1 ||
            card.types.indexOf('Landmark') != -1) {
        types += 'N';
        // N is for Notcard. Dominion rules say the new horizontal cards
        // are not affected by rules referring to *cards*.
    }
    return types;
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
    if (is_notcard(card) && chosen.banned_types.has('n')) {
        return true;
    }
    // like in Roman numerals, there's no number for 'zero',
    // so events/landmarks have to be banned if zero is wanted.
    if (is_notcard(card) && chosen.notcard_count == 0) {
        return true;
    }
    return false;
}


// Dominion rules state the horizontal cards - Events and Landmarks - are not
// affected by card text using the word "card".
function is_notcard(card) {
    if (card.types.indexOf('Event') != -1 ||
            card.types.indexOf('Landmark') != -1) {
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
function get_required_cards(chosen, user_input) {
    var needed_costs = user_input['per-cost'];
    var needed_sets = user_input['per-set'];

    var needed_types = 'N'.repeat(chosen.notcard_count);

    // TODO: bad_user_input();
    if (upper_with_lower(needed_costs) || upper_with_lower(needed_sets)) {
        return chosen;
    }

    chosen.random_pool = shuffled_array(user_input['owned_cards']);

    for (var card of chosen.random_pool) {
        if (!(needed_costs || needed_sets || needed_types)) {
            chosen.success = true;
            break;
        }
        if (chosen.cards.length == 10) {
            break;
        }
        if (card_is_banned(card, chosen, user_input['newbie_friendly'])) {
            continue;
        }
        var costs_removed = costs_it_removes(card, needed_costs);
        var sets_removed = sets_it_removes(card, needed_sets);
        var types_removed = types_it_removes(card, needed_types);

        if (costs_removed || sets_removed || types_removed) {
            
            needed_sets = chars_removed(needed_sets, sets_removed);
            needed_costs = chars_removed(needed_costs, costs_removed);
            needed_types = chars_removed(needed_types, types_removed);

            chosen.banned_sets = updated_banned(chosen.banned_sets, sets_removed, needed_sets);
            chosen.banned_costs = updated_banned(chosen.banned_costs, costs_removed, needed_costs);
            chosen.banned_types = updated_banned(chosen.banned_types, types_removed, needed_types);

            chosen.cards.push(card);
            chosen.names.add(card.name);
        }
    }
    return chosen;
}

    // time to pad the result with cards which weren't requested
    // but are okay to have.
function up_to_ten(chosen, user_input) {
    for (card of chosen.random_pool) {
        if (chosen.cards.length == 10 + chosen.notcard_count) {
            chosen.success = true;
            break;
        }
        if (chosen.names.has(card.name)) {
            continue;
        }
        if (card_is_banned(card, chosen, user_input['newbie_friendly'])) {
            continue;
        }
        chosen.cards.push(card);
        chosen.names.add(card.name);
    }
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
            // TODO: don't use tags.indexOf, use tags[]
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


function paintPaper(source, target, roles) {
    target.classList.remove('hidden');
    target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve', 'landmark', 'bane', 'horizontal');
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

    if (is_notcard(source)) {
        target.classList.add('horizontal');
    }
    else {
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

    if (roles[source.name] == 'bane') {
        target.classList.add('bane');
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
    var result = chosen.cards;
    
    function card_role(x) {
        if (is_notcard(x)) {
            return 2;
        }
        else if (chosen.roles[x.name] == 'bane') {
            return 1;
        }
        return 0;
    }

    result = nice_and_stable_insertion_sort(result, function(a){return a.cost;});
    result = nice_and_stable_insertion_sort(result, card_role);
    // insert chosen cards into page:
    for (var i = 0; i < result.length; i++) {
        fig = document.getElementById('card-' + i);
        paintPaper(result[i], fig, chosen.roles);
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


function show_kingdom(user_input) {
    var max_tries = 1000;

    // chosen - stores context of a single "Randomize" button press
    var chosen = new Object();
    chosen.notcard_count = get_notcard_count(user_input['owned_cards'], user_input['notcards']);

    hide_all_cards();
    if (user_input['owned_cards'].length < 13) {
        return chosen;
    }

    for (attempt = 0; attempt < max_tries; attempt++) {
        chosen.cards = new Array();
        chosen.names = new Set();
        chosen.roles = new Object(); // Metadata: bane, black market choices...
        chosen.swiped_names = new Set();
        chosen.success = false;
        chosen.banned_sets = new Set(); // user inputs uppercase set letters
        chosen.banned_costs = new Set(); // P/D; no uppercase digits (yet!)
        chosen.banned_types = new Set();

        var chosen = get_required_cards(chosen, user_input);
        if (!chosen.success) {
            continue;
        }
        var chosen = up_to_ten(chosen, user_input);

        // Select events/landmarks:
        if (chosen.names.has('Young Witch')) {
            var bane = get_bane(chosen.random_pool, chosen.names);
            if (!bane) {
                continue;
            }
            chosen.roles[bane.name] = 'bane';
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
function get_bane(cards, card_names) {
    for (var card of cards) {
        if (is_notcard(card)) {
            continue;
        }
        if ((card.cost == 2 || card.cost == 3) && !card_names.has(card.name)) {
            return card;
        }
    }
}


// TODO: regression, stopped working!
function may_add_colony_platinum(chosen_cards, prosperity) {
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


// TODO: regression, stopped working!
function may_add_shelters(chosen_cards, darkages) {
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


// get the number of notcards that will be used in this
// Dominion game. It may vary when 'random' is selected.
function get_notcard_count(owned_cards, notcards) {
    var notcard_count;
    var num_owned = owned_cards.filter(is_notcard).length;
    if (num_owned == 0) {
        return 0;
    }
    notcard_count = notcards.slice(-1);
    if (isNaN(notcard_count)) {
        notcard_count = Math.floor(Math.random() * 3);
    }
    return parseInt(notcard_count);
}


function swipe(figure, chosen, user_input) {
    var figure_index = figure.id.match(/\d+/)[0];
    var card_name = figure.querySelector('figcaption').textContent;
    var card_index = chosen.cards.findIndex(c => c['name'] == card_name);
    var old_card = chosen.cards[card_index];

    var sets_without_card = '';
    var costs_without_card = '';
    var types_without_card = '';
    for (var i in chosen.cards) {
        if (i == card_index) {
            continue;
        }
        sets_without_card += sets_it_removes(chosen.cards[i], user_input['per-set']);
        costs_without_card += costs_it_removes(chosen.cards[i], user_input['per-cost']);
        types_without_card += types_it_removes(chosen.cards[i], 'N'.repeat(chosen.notcard_count));
    }
    console.log('Totals without card:');
    var total = [sets_without_card, costs_without_card, types_without_card].join(' ');
    console.log('Requirement inputs:');
    var input = [user_input['per-set'], user_input['per-cost'], 'N'.repeat(chosen.notcard_count)].join(' ');
    console.log(total);
    console.log(input);


    //TODO: bug with bane/potion
    var sets_only_here = chars_removed(user_input['per-set'], sets_without_card);
    console.log('Sets only this card meets:');
    console.log(sets_only_here);

    var costs_only_here = chars_removed(user_input['per-cost'], costs_without_card);
    console.log('Costs only this card meets:');
    console.log(costs_only_here);

    var types_only_here = chars_removed('N'.repeat(chosen.notcard_count), types_without_card);
    console.log('Types only this card meets:');
    console.log(types_only_here);




    new_card_requirements = [sets_only_here, costs_only_here, types_only_here];
    new_card = chosen.cards.find(passes_swipe_tests(new_card_requirements));
    chosen.cards['card_index'] = new_card ? new_card : old_card;

    if (new_card) {
        chosen.names.remove(old_card.name);
        chosen.swiped_names.add(old_card.name);
        chosen.names.add(new_card.name);
        paintPaper(new_card, card_index, chosen.roles);
    }
    return chosen;
}


function passes_swipe_tests(card_requirements) {
    return true;
}


function click_handler(evnt) {
    var clicked = evnt.currentTarget;
    if (clicked.id == 'btn-randomize') {
        chosen = show_kingdom(user_input);
    }
    else if (clicked.type == 'radio') {
        user_input[clicked.name] = clicked.id;
    }
    else {
        chosen = swipe(clicked, chosen, user_input);
    }
}


function get_user_input() {
    user_input = {
    'expansions': document.getElementById('expansions').value,
    'per-cost': document.getElementById('per-cost').value,
    'per-set': document.getElementById('per-set').value,
    'notcards': document.querySelector('input[name = "notcards"]:checked').id,
    'prosperity': document.querySelector('input[name = "prosperity"]:checked').id,
    'darkages': document.querySelector('input[name = "darkages"]:checked').id,
    recalculate () {
        this['owned_sets'] = get_owned_sets(user_input);
        this['promo_names'] = get_promo_names(user_input);
        this['owned_cards'] = get_owned_cards(user_input['owned_sets'], user_input['promo_names']);
        }
    }
    user_input.recalculate();
    return user_input;
}


// set global variables and attach event listeners:
var user_input = get_user_input();
mark_owned_sets(user_input['owned_sets']);
mark_owned_promos(user_input['promo_names']);
var chosen;


for (radio of document.querySelectorAll('input[type = radio]')) {
    radio.addEventListener('click', click_handler);
}

document.getElementById('btn-randomize').addEventListener('click',
        click_handler);

document.getElementById('expansions').addEventListener('keyup',
    function() {
        user_input['expansions'] = document.getElementById('expansions').value;
        user_input.recalculate()
        mark_owned_sets(user_input['owned_sets']);
        mark_owned_promos(user_input['promo_names']);
    });

document.getElementById('per-set').addEventListener('keyup',
    function() {
        user_input['per-set'] = document.getElementById('per-set').value;
        user_input.recalculate();
        mark_owned_sets(user_input['owned_sets']);
    });

document.getElementById('per-cost').addEventListener('keyup',
    function() {
        user_input['per-cost'] = document.getElementById('per-cost').value;
        user_input.recalculate();
        mark_owned_sets(user_input['owned_sets']);
    });

for (var fig of document.getElementsByTagName('figure')) {
    fig.addEventListener('click', click_handler);
}
