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

PROMOS =  {
    'Envoy': 1,
    'Black Market': 2,
    'Stash': 3,
    'Walled Village': 4,
    'Governor': 5,
    'Prince': 6,
    'Summon': 7,
}


function get_user_input() {

    user_input = {
        'expansions': document.getElementById('expansions').value,
        'costs': document.getElementById('costs').value,
        'sets': document.getElementById('sets').value,
        'newbies': document.getElementById('newbies').checked,
        'attacks': document.querySelector('input[name = "attacks"]:checked').id,
        'prosperity': document.querySelector('input[name = "prosperity"]:checked').id,
        'darkages': document.querySelector('input[name = "darkages"]:checked').id,
        'notcards': document.querySelector('input[name = "notcards"]:checked').id,
        recalculate () {
            this['owned_sets'] = this.get_owned_sets();
            this['promo_names'] = this.get_promo_names();
            this['owned_cards'] = this.get_owned_cards();
            this.mark_owned_sets();
            this.mark_owned_promos();
        },

        get_owned_sets () {
            var owned_sets = new Set();

            var which_sets = this['expansions'];
            var needed_sets = this['sets'].toLowerCase();
            var needed_costs = this['costs'].toLowerCase();

            for (var letter of Object.keys(LETTER_TO_SET)) {

                if (which_sets.includes(letter) || needed_sets.includes(letter)) {
                    var expansion = LETTER_TO_SET[letter];
                    owned_sets.add(expansion)
                }
                if (needed_costs.includes('p')) {
                    owned_sets.add('alchemy');
                }
                if (needed_costs.includes('d')) {
                    owned_sets.add('empires');
                }
                // TODO: add overpay and cost 7,8... once the dust has settled.
            }
            return owned_sets;
        },

        get_promo_names () {
            var promo_names = new Set();

            for (var promo_name of Object.keys(PROMOS)) {
                var digit = PROMOS[promo_name];
                if (user_input['expansions'].includes(digit)) {
                    promo_names.add(promo_name);
                }
            }
            return promo_names;
        },

        get_owned_cards () {
            var owned_cards = [];

            for (var card of EXISTING_CARDS) {
                if (this['owned_sets'].has(card.set)) {
                    owned_cards.push(card);
                }
            else if (this['promo_names'].has(card.name)) {
                    owned_cards.push(card);
                }
            }
            return owned_cards;
        },

        is_bad () {
            if (this['owned_cards'].length < 13) {
                return true;
            }
            for (var id of ['sets', 'costs']) {
                if (upper_with_lower(this[id])) {
                    return true;
                }
            }
            return false;
        },

        mark_owned_sets () {
            for (var set of Object.keys(SET_TO_LETTER)) {
                var span = document.getElementById('set-' + set);
                if (this['owned_sets'].has(set)) {
                    span.classList.add('selected');
                }
                else {
                    span.classList.remove('selected');
                }
            }
        },

        mark_owned_promos () {
            for (var promo_name of Object.keys(PROMOS)) {
                var digit = PROMOS[promo_name];
                var span = document.getElementById('promo-' + digit);

                if (this['promo_names'].has(promo_name)) {
                    span.classList.add('selected');
                }
                else {
                    span.classList.remove('selected');
                }
            }
        }
    }

    user_input.recalculate();
    return user_input;
}


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
    if (needed_costs.includes(card.cost)) {
        costs += card.cost;
    }
    // TODO: potion makes more sense as a tag
    if (card.potion) {
        if (needed_costs.includes('p')) {
            costs += 'p';
        }
        else if (needed_costs.includes('P')) {
            costs += 'P';
        }
    }
    if (card.debt > 0) {
        if (needed_costs.includes('d')) {
            costs += 'd';
        }
        else if (needed_costs.includes('D')) {
            costs += 'D';
        }
    }
    return costs;
}


// TODO: smells of object method!
function sets_it_removes(card, needed_sets) {
    var sets = '';
    var letter = SET_TO_LETTER[card.set];
    if (needed_sets.includes(letter)) {
        sets += letter;
    }
    else if (needed_sets.includes(letter.toUpperCase())) {
        sets += letter.toUpperCase();
    }
    else if (card.set == 'promos') {
        for (var promo of Object.keys(PROMOS)) {
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
function card_is_banned(card, chosen, newbies) {
    if (newbies && card.tags.indexOf('complicated') != -1) {
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
    for (var ch of removed) {
        removed_in = removed_in.replace(ch, '');
    }
    return removed_in;
}


// if set of the processed card is on the list of EXACT set requirements
// AND the card finishes the requirement, ban the set. More would exceed
// the EXACT requirement.
function updated_banned(banned, chars_removed, requirement_string) {
    var exact_requirements = chars_removed.replace(/[^A-Z]/g, '');
    for (var ch of exact_requirements) {
        if (!requirement_string.includes(ch)) {
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
    var needed_costs = user_input['costs'];
    var needed_sets = user_input['sets'];

    var needed_types = 'N'.repeat(chosen.notcard_count);

    chosen.random_pool = shuffled_array(user_input['owned_cards']);

    for (var card of chosen.random_pool) {
        if (!(needed_costs || needed_sets || needed_types)) {
            chosen.success = true;
            break;
        }
        if (chosen.cards.length == 10) {
            break;
        }
        if (card_is_banned(card, chosen, user_input['newbies'])) {
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
    for (var card of chosen.random_pool) {
        if (chosen.cards.length == 10 + chosen.notcard_count) {
            chosen.success = true;
            break;
        }
        if (chosen.names.has(card.name)) {
            continue;
        }
        if (card_is_banned(card, chosen, user_input['newbies'])) {
            continue;
        }
        chosen.cards.push(card);
        chosen.names.add(card.name);
    }
    return chosen;
}


function attackCountered(attack_card, tags) {
    var counters = attack_card.countered_by || [];

    if (counters.indexOf('M_mostly_harmless') > -1) {
        console.log(attack_card.name + ' is mostly harmless.');
        return true;
    }

    if (attack_card.name == 'Young Witch') {
        console.log('Young Witch has a counter by definition.');
        return true;
    }

    if (tags['counters_attacks'] > 0) {
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
            if (tags[counter] - counters_itself > 0) {
                console.log(attack_card.name + ' countered by ' + counter);
                return true;
        }
    }
    console.log(attack_card.name + ' NOT COUNTERED');
    return false;
}


function attacksCountered(cards, tags) {
        for (var card of cards) {
            if (card.types.indexOf('Attack') != -1) {
                if (!attackCountered(card, tags)) {
                     return false;
                }
            }
        }
        return true;
    }


// Check more sophisticated conditions, card relationships etc.
// These can't really be done on the first run.
function conditionsPassed(cards, user_input) {
    var tags, card_types
    [tags, card_types] = get_stats(cards);

    // condition: cards that NEED attack should appear alongside attacks
    if ((tags['needs_attacks'] >= 1) && !card_types.has('Attack')) {
        console.log('REJECTING set because it has cards that need attacks but no attacks.');
        return false;
    }

    // condition: attacks
    if (user_input['attacks'] == 'attacks-none') {
        if (card_types.has('Attack')) {
            console.log('Attacks forbidden, so rejecting the set:');
            return false
            }
        }
    // TODO: The above can be checked on first run, but is it worth it ?

    if (user_input['attacks'] == 'attacks-countered') {
        if (!attacksCountered(cards, tags)) {
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


function paintCard(source, target_index, roles) {
    var target = document.getElementById('card-' + target_index);
    target.classList.remove('hidden');
    target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve', 'landmark', 'bane', 'horizontal');
    for (var set of Object.keys(SET_TO_LETTER)) {
        target.classList.remove(set);
    }
    target.classList.add(source.set);

    target.setAttribute('alt', source.text);
    target.querySelector('figcaption').textContent = source.name;
    target.querySelector('.card-type').innerHTML = abbrev(source.types);

    target.querySelector('.coin-cost').textContent = source.cost;
    target.querySelector('.coin-cost').textContent += source.cost_extra || '';
    target.querySelector('.debt-cost').textContent = source.debt || '';

    if (source.potion) {
        target.querySelector('.potion').classList.remove('hidden');
    }
    else {
        target.querySelector('.potion').classList.add('hidden');
    }

    if (source.cost == 0 && (source.potion || source.debt)) {
        target.querySelector('.coin-cost').textContent='';
    }

    if (is_notcard(source)) {
        target.classList.add('horizontal');
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
        paintCard(result[i], i, chosen.roles);
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
    if (user_input.is_bad()) {
        return chosen;
    }

    for (var attempt = 0; attempt < max_tries; attempt++) {
        chosen.cards = new Array();
        chosen.names = new Set();
        // TODO: Black market!
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

        // TODO: bug with bane+potion
        if (chosen.names.has('Young Witch')) {
            var bane = get_bane(chosen.random_pool, chosen.names);
            if (!bane) {
                continue;
            }
            chosen.roles[bane.name] = 'bane';
            chosen.cards.push(bane);
            chosen.names.add(bane.name);
        }
        may_add_colony_platinum(chosen.cards, user_input['prosperity']);
        may_add_shelters(chosen.cards, user_input['darkages']);

        if (!conditionsPassed(chosen.cards, user_input)) {
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


// For a card, get a map with sets/costs/types only the card satisfies.
// The point - without this card, user-specified cost/set/type conditions
// are no longer met. A replacement for that card will have to meet them all!
function get_only_here(cards, card_index, user_input, notcard_count) {
    // Step 1: for each requirement, get sum of requirements for all cards
    // chosen so far except this particualar card.
    var only_here = {
        'sets': '',
        'costs': '',
        'types': ''
    }

    for (var i in cards) {
        if (i == card_index) {
            continue;
        }
        only_here['sets'] += sets_it_removes(cards[i], user_input['sets']);
        only_here['costs'] += costs_it_removes(cards[i], user_input['costs']);

        only_here['types'] += types_it_removes(cards[i], 'N'.repeat(chosen.notcard_count));
    }

    // Step 2: all_met_requirements - requirement_of_this_card

    only_here['sets'] = chars_removed(user_input['sets'], only_here['sets']);
    only_here['costs'] = chars_removed(user_input['costs'], only_here['costs']);
    only_here['types'] = chars_removed('N'.repeat(notcard_count), only_here['types']);
    return only_here;
}


function unban_all_reqs(only_here, chosen) {
    for (var word of Object.keys(only_here)) {
        for (ch of only_here[word]) {
            chosen['banned_' + word].delete(ch.toLowerCase());
        }
    }
}


function ban_all_reqs(only_here, chosen) {
    for (var word of Object.keys(only_here)) {
        var set = chosen['banned_' + word];
        for (ch of only_here[word]) {
            set.add(ch.toLowerCase());
        }
    }
}


// TODO: hold CTRL for swipe without conditions
function swipe(figure, chosen, user_input) {
    var figure_index = figure.id.match(/\d+/)[0];

    var card_name = figure.querySelector('figcaption').textContent;
    var card_index = chosen.cards.findIndex(c => c['name'] == card_name);
    var old_card = chosen.cards[card_index];

    only_here = get_only_here(chosen.cards, card_index, user_input, chosen.notcard_count);

    unban_all_reqs(only_here, chosen);
    var old_role = (chosen.roles[card_name]);
    var everything = [chosen, user_input, only_here, card_index, old_role];
    new_card = chosen.random_pool.find(passes_swipe_tests, everything);
    ban_all_reqs(only_here, chosen);

    if (new_card) {
        chosen.cards[card_index] = new_card;
        chosen.names.delete(old_card.name);
        chosen.swiped_names.add(old_card.name);
        chosen.names.add(new_card.name);
        if (chosen.roles[old_card.name] == 'bane') {
            delete chosen.roles[old_card.name];
            chosen.roles[new_card.name] = 'bane';
        }
        paintCard(new_card, figure_index, chosen.roles);
    }
    return chosen;
}


function passes_swipe_tests(card, thisArg) {
    var old_role = this[4];
    var replac = this[3]; // index of replaced card
    var requirements = this[2];
    var user_input = this[1];
    var chosen = this[0];

    if (chosen.names.has(card.name)) {
        return false;
    }
    if (chosen.swiped_names.has(card.name)) {
        return false;
    }
    if (card_is_banned(card, chosen, user_input['newbies'])) {
        return false;
    }
    if (!has_all_requirements(card, requirements)) {
        return false;
    }
    if (old_role == 'bane') {
        if (card.cost != 2 && card.cost != 3) {
            return false;
        }
    }
    var cards = chosen.cards;
    var cards = cards.slice(0, replac).concat([card]).concat(cards.slice(replac  + 1));
    if (!conditionsPassed(cards, user_input)) {
        return false;
    }
    return true;
}


function has_all_requirements(card, requirements) {
    var sets_removed = sets_it_removes(card, user_input['sets']);
    if (chars_removed(requirements['sets'], sets_removed)) {
        return false;
    }
    var costs_removed = costs_it_removes(card, user_input['costs']);
    if (chars_removed(requirements['costs'], costs_removed)) {
        return false;
    }
    var types_removed = types_it_removes(card, 'N'.repeat(chosen.notcard_count));
    if (chars_removed(requirements['types'], types_removed)) {
        return false
    }
    return true;
}


function click_handler(evnt) {
    var clicked = evnt.currentTarget;
    if (clicked.id == 'btn-randomize') {
        chosen = show_kingdom(user_input);
        lastFocusedInput.focus();
    }
    else if (clicked.type == 'radio') {
        user_input[clicked.name] = clicked.id;
    }
    else if (clicked.type == 'checkbox') {
        user_input[clicked.id] = clicked.id;
    }
    else if (clicked.id.startsWith('card-')) {
        chosen = swipe(clicked, chosen, user_input);
        lastFocusedInput.focus();
    }
}


function normalTextInput(evnt) {
    var input_id = evnt.currentTarget.id;
    user_input[input_id] = document.getElementById(input_id).value;
    user_input.recalculate();
}


function swipeTextInput(evnt) {
    if (evnt.keyCode == 13) {
        var val = evnt.currentTarget.value;
        if (!isNaN(val)) {
            val = val - 1 >= 0 ? val -1 : 9;
        }
        else if (val == 'a') {
            val = 10;
        }
        else {
            val = 11;
        }
        var cards = document.querySelectorAll("figure[id^='card-']:not(.hidden)");
        val = Math.min(cards.length - 1, val);
        if (val > -1) {
            var to_swipe = document.getElementById('card-' + val);
            chosen = swipe(to_swipe, chosen, user_input);
        }
    }
}


function keyUpHandler(evnt) {
    if (evnt.keyCode == 13) {
        if (evnt.currentTarget.id == 'swipe') {
            swipeTextInput(evnt);
            return;
        }
        else {
            chosen = show_kingdom(user_input);
        }
    }
    if (evnt.currentTarget.type == 'text') {
        normalTextInput(evnt);
    }
}


function rememberFocus(evnt) {
    if (evnt.currentTarget.tagName == 'INPUT') {
        lastFocusedInput = evnt.currentTarget;
    }
}


// set global variables and attach event listeners:
var user_input = get_user_input();
var chosen;
var lastFocusedInput;

for (var input of document.querySelectorAll('input')) {
    input.addEventListener('keyup', keyUpHandler);
    input.addEventListener('blur', rememberFocus);
}

for (var clickable of document.querySelectorAll("input:not([type = text])")) {
    clickable.addEventListener('click', click_handler);
}

document.getElementById('btn-randomize').addEventListener('click',
        click_handler);

for (var fig of document.getElementsByTagName('figure')) {
    fig.addEventListener('click', click_handler);
}
