// note to self: this is module using 'global import' pattern
//
// Works multiple files as well as a single file, and I don't think ES2016
// 'export' and 'import' can do that.

(function (EXISTING_CARDS) {


    const LETTER_TO_SET = {
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


    const SET_TO_LETTER = {
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


    const PROMOS =  {
        'Envoy': 1,
        'Black Market': 2,
        'Stash': 3,
        'Walled Village': 4,
        'Governor': 5,
        'Prince': 6,
        'Summon': 7,
    }


    // TODO: camelCase
    // TODO: jslint

    // This object collects and stores data entered by user.
    function get_user_input() {

        user_input = {

            collect_inputs () {
                for (var input of document.getElementsByTagName('input')) {
                    if (input.type == 'text') {
                        this[input.id] = input.value;
                    }
                    else if (input.type == 'checkbox') {
                        this[input.id] = input.checked;
                    }
                    else if (input.type == 'radio' && input.checked) {
                        this[input.name] = input.id;
                    }
                }
            },

            // User input that requires a little extra work or is inferred
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

        user_input.collect_inputs();
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
            types += 'H';
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
        if (is_horizontal(card) && chosen.banned_types.has('h')) {
            return true;
        }
        // like in Roman numerals, there's no number for 'zero',
        // so events/landmarks have to be banned if zero is wanted.
        if (is_horizontal(card) && chosen.horizontal_count == 0) {
            return true;
        }
        return false;
    }


    // Dominion rules state the horizontal cards - Events and Landmarks - are not
    // affected by card text using the word "card".
    function is_horizontal(card) {
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

        var needed_types = 'H'.repeat(chosen.horizontal_count);

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
                chosen.roles[card.name] = 'normal';
                if (is_horizontal(card)) {
                    chosen.roles[card.name] = 'horizontal';
                }
            }
        }
        return chosen;
    }

        // time to pad the result with cards which weren't requested
        // but are okay to have.
    function up_to_ten(chosen, user_input) {
        for (var card of chosen.random_pool) {
            if (chosen.cards.length == 10 + chosen.horizontal_count) {
                chosen.success = true;
                break;
            }
            if (chosen.roles[card.name]) {
                continue;
            }
            if (card_is_banned(card, chosen, user_input['newbies'])) {
                continue;
            }
            chosen.cards.push(card);
            chosen.roles[card.name] = 'normal';
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
        if (source.name == 'Black Market') {
            var bm_stock = [];
            for (var bm of Object.keys(roles)) {
                if (roles[bm] == 'black market') {
                    bm_stock.push(bm);
                }
            }
            bm_stock = '\n\nStock: ' + bm_stock.join(', ');
            target.setAttribute('alt', target.getAttribute('alt') + bm_stock);
        }
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

        if (is_horizontal(source)) {
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
            switch (chosen.roles[x.name]) {
                case 'horizontal':
                    return 2;
                case 'bane':
                    return 1;
                case 'normal':
                    return 0;
                default:
                    return -1;
            }
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
        var tags = new Object()

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
        chosen.horizontal_count = get_horizontal_count(user_input['owned_cards'], user_input['horizontals']);

        hide_all_cards();
        if (user_input.is_bad()) {
            return chosen;
        }

        for (var attempt = 0; attempt < max_tries; attempt++) {
            chosen.cards = new Array();

            // A little help on roles:
            //
            // normal: a normally selected card,
            // horizontal: landmark/event, not affected by rules mentioning 'card',
            // black market: part of the Black Market stock,
            // swiped - player manually rejected this card,
            chosen.roles = new Object();
            chosen.success = false;
            chosen.banned_sets = new Set(); // user inputs uppercase set letters
            chosen.banned_costs = new Set(); // P/D; no uppercase digits (yet!)
            chosen.banned_types = new Set();

            var chosen = get_required_cards(chosen, user_input);
            if (!chosen.success) {
                continue;
            }
            var chosen = up_to_ten(chosen, user_input);

            may_add_colony_platinum(chosen.cards, user_input['prosperity']);
            may_add_shelters(chosen.cards, user_input['darkages']);
            chosen.roles = may_add_black_market_stock(chosen.roles, chosen.random_pool);
            if (chosen.roles['Young Witch'] == 'normal' ||
                    chosen.roles['Young Witch'] == 'black market') {
                var args = [chosen, user_input['newbies']];
                var bane = chosen.random_pool.find(passes_bane_tests, args);
                if (!bane) {
                    continue;
                }
                chosen.roles[bane.name] = 'bane';
                chosen.cards.push(bane);
            }

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


    function passes_bane_tests(card, thisArg) {
        var chosen = this[0];
        if (chosen.roles[card.name]) {
            return false;
        }
        if (card.cost != 2 && card.cost != 3) {
            return false;
        }
        if (is_horizontal(card)) {
            return false;
        }
        var newbies = this[1];
        if (card_is_banned(card, chosen, newbies)) {
            return false;
        }
        return true;
    }


    function may_add_black_market_stock(roles, cards) {
        if (roles['Black Market']) {
            var stock = cards.filter(c => !Boolean(roles[c.name]));
            stock = stock.slice(0, parseInt(user_input['black_market']));
            for (var s of stock) {
                roles[s.name] = 'black market';
            }
        }
        return roles;
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


    // get the number of horizontals that will be used in this
    // Dominion game. It may vary when 'random' is selected.
    function get_horizontal_count(owned_cards, horizontals) {
        var horizontal_count;
        var num_owned = owned_cards.filter(is_horizontal).length;
        if (num_owned == 0) {
            return 0;
        }
        horizontal_count = horizontals.slice(-1);
        if (isNaN(horizontal_count)) {
            horizontal_count = Math.floor(Math.random() * 3);
        }
        return parseInt(horizontal_count);
    }


    // For a card, get a map with sets/costs/types only the card satisfies.
    // The point - without this card, user-specified cost/set/type conditions
    // are no longer met. A replacement for that card will have to meet them all!
    function get_only_here(cards, card_index, user_input, horizontal_count) {
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

            only_here['types'] += types_it_removes(cards[i], 'H'.repeat(chosen.horizontal_count));
        }

        // Step 2: all_met_requirements - requirement_of_this_card

        only_here['sets'] = chars_removed(user_input['sets'], only_here['sets']);
        only_here['costs'] = chars_removed(user_input['costs'], only_here['costs']);
        only_here['types'] = chars_removed('H'.repeat(horizontal_count), only_here['types']);
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

        if (old_card.name == 'Black Market') {
            for (var k of Object.keys(chosen.roles)) {
                if (chosen.roles[k] == 'black market') {
                    delete chosen.roles[k];
                }
            }
        }

        only_here = get_only_here(chosen.cards, card_index, user_input, chosen.horizontal_count);

        unban_all_reqs(only_here, chosen);
        var old_role = (chosen.roles[card_name]);
        var everything = [chosen, user_input, only_here, card_index, old_role];
        new_card = chosen.random_pool.find(passes_swipe_tests, everything);
        ban_all_reqs(only_here, chosen);

        if (new_card) {
            chosen.cards[card_index] = new_card;
            chosen.roles[new_card.name] = 'normal';
            if (chosen.roles[old_card.name] == 'bane') {
                chosen.roles[new_card.name] = 'bane';
            }
            chosen.roles[old_card.name] = 'swiped';
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

        if (chosen.roles[card.name]) {
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
        var cards = cards.slice(0, replac).concat([card]).concat(cards.slice(replac + 1));
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
        var types_removed = types_it_removes(card, 'H'.repeat(chosen.horizontal_count));
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

    for (var clickable of document.querySelectorAll("input:not([type='text'])")) {
        clickable.addEventListener('click', click_handler);
    }

    for (var text of document.querySelectorAll("input[type='text']")) {
        text.addEventListener('input', normalTextInput);
    }

    document.getElementById('btn-randomize').addEventListener('click',
            click_handler);

    for (var fig of document.getElementsByTagName('figure')) {
        fig.addEventListener('click', click_handler);
    }


}(EXISTING_CARDS));
